<template>
  <v-layout aling-start>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-text-field
            v-model="nombre"
            label="Info de la cantidad de cursos  Disponibles 3/4 algo así"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6"
          ><v-data-table
            :headers="headersCursos"
            :items="cursos"
            sort-by="calories"
            class="elevation-1" >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Cursos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <template>
                          <v-data-table
                            v-model="seccionesSelect"
                            :headers="headersSeccionesCursos"
                            :items="secciones" 
                
                            class="elevation-1"
                          >
                           <template template v-slot:item.seleccionar="{ item }">
                        <td class="justify-center layout px-0">
                          <v-icon
                            small
                            class="mr-2"
                            @click="agregarSeccion(item)"
                          >
                            add
                          </v-icon>
                        </td>
                      </template>

                          </v-data-table>
                        </template>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.opcion="{ item }">
              <v-icon small class="mr-2" @click="openseccion(item)">
                add
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-data-table
            :headers="headersSeccionesSelect"
            :items="seccionesSelect"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Cursos matriculados</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="guardar()">Guardar</v-btn>
              </v-toolbar>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" >Por favor Seleccione Cursos</v-btn>
            </template>

           
          </v-data-table>
          </v-col>
      </v-row>
      
    </v-container>
    <v-snackbar
            v-model="snackbar"
            :bottom="true"
            :color="colorSnack"
            :right="true"
            :timeout="5000"
          >
            {{ textSnack }}

            <v-btn dark text @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    secciones: [],
    cursos: [],
    seccionesSelect: [],
    singleSelect: true,

    dialog: false,
    dialog2: false,

    headersCursos: [
      { text: "Opciones", value: "opcion", sortable: false },
      { text: "Curso", value: "nombre", sortable: true }
    ],
    headersSeccionesCursos: [
      { text: "Seleccionar", value: "seleccionar", sortable: false },
      { text: "Curso", value: "nombreCurso", sortable: true },
      { text: "Seccion", value: "codigo_seccion", sortable: true }, 
      { text: "Profesor", value: "nombreDocente", sortable: true },
   
   ],
    headersSeccionesSelect: [
      { text: "Curso", value: "nombreCurso", sortable: true },
      { text: "Codigo Seccion", value: "codigo_seccion", sortable: true },
      { text: "Profesor", value: "nombreDocente", sortable: true },
    
    ],

    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },

    search: "",
    editedIndex: -1,

    //Objeto
    id: "",
    nombre: "",
    valida: 0,
    validaMensaje: [],

    //

    adModal: false,
    adAccion: 0,
    adNombre: "",
    adId: 0,

    dropModal: false,
    dropId: 0,
    dropName: "",

    //ControlSnack
    snackbar: false,
    textSnack: "",
    colorSnack: "",
    //
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Carrera" : "Actualizando Carrera";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
  },

  methods: {
    close() {
      this.dialog = false;
      this.clean();
    },

    clean() {
      this.id = "";
      this.nombre = "";
      this.editedIndex = -1;
      this.colorsnack = "";
      this.validaMensaje = [];
    },

    openSnack(text, color) {
      this.textSnack = text;
      this.colorSnack = color;
      this.snackbar = true;
    },

    closeDropModal() {
      this.dropModal = false;
    },

    closeAdModal() {
      this.adModal = false;
    },

    statusItem(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adId = item.idcarrera;

      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },

    agregarSeccion(data = []){
      if(this.encuentraCurso(data["idcurso"]))
      {
          //error 
      }
      else{
          this.seccionesSelect.push({
          idseccion : data["idseccion"], 
          idcurso: data["idcurso"],
          nombreCurso: data["nombreCurso"],
          nombreDocente: data["nombreDocente"],
          codigo_seccion : data["codigo_seccion"],
          
        });         
        }
    },
    encuentraCurso(id)
    {
      var valid = false;
      this.seccionesSelect.forEach(element =>{
          if(element.idcurso === id )
          {
              valid = true;
          }
      })
      return valid;
    },
    validCantidadMatriculado()
    {
      var valid=true;
      if(this.seccionesSelect.length>4)
      {
        valid= false;
      }
      return valid;
    },

    activar() {
      let me = this;
      //let header = {"Authorization" : "Bearer "+this.$store.state.token };
      //let configuracion ={headers : header};
      axios
        .put("api/Carreras/Activar/" + this.adId)
        .then(function(response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      //let header = {"Authorization" : "Bearer "+this.$store.state.token };
      //let configuracion ={headers : header};
      axios
        .put("api/Carreras/Desactivar/" + this.adId, {})
        .then(function(response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    listar() {
      let me = this;
      //let header = {"Authorization" : "Bearer "+this.$store.state.token };
      //let configuracion ={headers : header};
      axios
        .get("api/cursos")
        .then((response) => {
          me.cursos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    openseccion(item) {
      let me = this;
      axios
        .get("api/secciones/cursos/" + item.idcurso)
        .then((response) => {
          me.secciones = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.dialog = true;
    },

    dropItem(item) {
      this.dropModal = true;
      this.dropId = item.idcarrera;
      this.dropName = item.nombre;
    },

    drop() {
      let me = this;

      axios
        .delete("api/Carreras/" + me.dropId)
        .then(function(response) {
          me.openSnack(
            "Registro " + me.dropName + " eliminado con éxito",
            "red"
          );
          me.closeDropModal();
          me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    guardar() {
     /*  if (this.validar()) {
        return ;
      } */

      if (this.editedIndex > -1) {
        //Código para editar
        let me = this;
        //let header = {"Authorization" : "Bearer "+this.$store.state.token };
        //let configuracion ={headers : header};
        axios
          .put("api/Carreras", {
            idcarrera: me.id,
            nombre: me.nombre,
          })
          .then(function(response) {
            me.openSnack(
              "Registro " + me.nombre + " actualizado con éxito",
              "indigo"
            );
            me.close();
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //Código para guardar
        let me = this;
        //let header = {"Authorization" : "Bearer "+this.$store.state.token };
        //let configuracion ={headers : header};
        var seccionesArray = [];

        me.seccionesSelect.forEach(element => {
          seccionesArray.push(element.idseccion);
        });

        console.log(seccionesArray);

        axios
          .post("api/matriculas", {
            anioacademico: '2020-01',
            idalumno: 1,
            secciones: seccionesArray
          })
          .then(function(response) {
            me.openSnack(
              "Matricula creada con éxito",
              "green"
            );
            me.close();
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    validar() {
      this.valida = 0;
      this.validaMensaje = [];

      if (this.nombre.length < 10 || this.nombre.length > 100) {
        this.validaMensaje.push(
          "El nombre debe tener más de 10 caracteres y menos de 100 caracteres"
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
  },
};
</script>
