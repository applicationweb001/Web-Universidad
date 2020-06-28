<template>
  <v-layout aling-start>
    <v-container>
      <v-row>
       <v-col cols="12" sm="4">
          <v-text-field
            value="Ciclo Academico: 2020-01"
            label=""
            solo
            readonly
          ></v-text-field>
          </v-col>

       <v-col cols="12" sm="4"> 
            <v-text-field
            value="Máxima cantidad de cursos: 4"
            label=""
            solo
            readonly
          ></v-text-field>
        </v-col>

         <v-col cols="12" sm="4"> 
            <v-text-field
            v-model="carreraAlumno"
            solo
            readonly
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
                      <span class="headline"></span>
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

            <template v-slot:item.borrar="{ item }">
                <v-icon
                  small color="red" class="mr-2"
                  @click="eliminarSeccion(seccionesSelect, item)"
                >
                  delete
                </v-icon>
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
      { text: "Borrar", value: "borrar", sortable: true },
      { text: "Curso", value: "nombreCurso", sortable: true },
      { text: "Codigo Seccion", value: "codigo_seccion", sortable: true },
      { text: "Profesor", value: "nombreDocente", sortable: true },
    ],

    //Objeto
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
    carreraAlumno :""
  }),

 
  
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
    this.carreraAlumno = "Carrera de " + this.$store.state.usuario.nombreCarrera;
  },

  methods: {
    close() {
      this.dialog = false;
      this.clean();
    },

    clean() {

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
      if(this.seccionesSelect.length>4 || this.seccionesSelect.length<1)
      {
        valid= false;
      }
      return valid;
    },

    listar() {
      let me = this;
      //let header = {"Authorization" : "Bearer "+this.$store.state.token };
      //let configuracion ={headers : header};
      axios
        .get("api/cursos/"+this.$store.state.usuario.idcarrera)
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
eliminarSeccion(arr, item) {
      var i = arr.indexOf(item);
      if (i !== -1) {
        arr.splice(i, 1);
      }
    },
    guardar() {
       if (this.validar()) {
        return ;
       }
       
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

      if (!this.validCantidadMatriculado()) {
         this.openSnack("No puede matricularse en más de 4 cursos","red");
          valida = 1;
      }
      return this.valida;
    },
  },
};
</script>
