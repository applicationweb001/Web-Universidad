<template>
  <v-layout aling-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="secciones"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Secciones</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="text-xs-center"
              v-model="search"
              append-icon="search"
              label="Búsqueda"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="10" md="10">
                          <v-autocomplete
                          v-model="objseccion.curso.idcurso"
                          :items="cursos"
                          label="Curso"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="10" md="10">
                        <v-autocomplete                 
                          v-model="objseccion.docente.iddocente"
                          :items="docentes"
                          label="Docente"                        
                       ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="10" md="10">
                        <v-text-field
                          readonly
                          filled
                          v-model="objseccion.cantidad"
                          label="Límite de alumnos"                        
                        ></v-text-field>
                      </v-col>                      
                    </v-row>
                                       
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <div
                          class="red--text"
                          v-for="v in validaMensaje"
                          :key="v"
                          v-text="v"
                        ></div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn outlined color="primary2" @click.native="close"
                    >Cancelar</v-btn
                  >
                  <v-btn color="primary" dark @click.native="guardar()"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- <v-dialog v-model="adModal" max-width="300">
              <v-card>
                <v-card-title class="headline" v-if="adAccion == 1"
                  >¿Eliminar Item?</v-card-title
                >
                <v-card-title class="headline" v-if="adAccion == 2"
                  >¿Eliminar Item?</v-card-title
                >
                <v-card-text>
                  Estás a punto de
                  <span v-if="adAccion == 1">Activar</span>
                  <span v-if="adAccion == 2">Desactivar</span>
                  el ítem {{ adNombre }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click="statusCerrar()">Cancelar</v-btn>

                  <v-btn
                    v-if="adAccion == 1"
                    color="orange darken-4"
                    flat="flat"
                    @click="activar()"
                    >¿Eliminar</v-btn
                  >
                  
                  <v-btn
                    v-if="adAccion == 2"
                    color="orange darken-4"
                    flat="flat"
                    @click="desactivar()"
                    >¿Eliminar</v-btn
                  >
                 
                </v-card-actions>
              </v-card>
            </v-dialog>-->
            <v-dialog v-model="dropModal" max-width="400">
              <v-card>
                <v-card-title class="headline"
                  >¿Desea eliminar la Seccion?</v-card-title
                >
                <v-card-text>
                  Estás a punto de eliminar el ítem: {{ dropName }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" @click="closeDropModal()"
                    >Cancelar</v-btn
                  >

                  <v-btn color="orange darken-4" @click="drop()"
                    >Eliminar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>

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
        </template>

        <template v-slot:item.opcion="{ item }">
          <v-icon small color="blue" class="mr-2" @click="editItem(item)">
            edit
          </v-icon>

          <v-icon small color="red" class="mr-2" @click="dropItem(item)">
            delete
          </v-icon>
        </template>

        <!-- 
        <template v-slot:item.condicion="{ item }">
          <td>
            <div v-if="item.condicion">
              <span class="blue--text">Activo</span>
            </div>
            <div v-else>
              <span class="red--text">Inactivo</span>
            </div>
          </td>
        </template>
 -->
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    docentes: [],
    cursos: [],
    secciones: [],
    dialog: false,
    headers: [
      { text: "Opciones", value: "opcion", sortable: false },
      { text: "Curso", value: "idcurso", sortable: true },      
      { text: "Nombre curso", value: "nombrecurso", sortable: true },
      { text: "Docente", value: "iddocente", sortable: true },      
      { text: "Nombre docente", value: "nombredocente", sortable: true },
      { text: "Código sección", value: "codigo_seccion", sortable: true},
      { text: "Ciclo académico", value: "ciclo_academico", sortable: true},
       ],
    search: "",
    editedIndex: -1,

    //objeto
    objseccion:{
      id :"",
      curso :{
          idcurso:"",
          nombre :"",
          codigo :""
      },
      docente :{
        iddocente:"",
        nombre :""
      },
      cantidad :10
    },
    //

    valida: 0,
    validaMensaje: [],

    adModal: 0,
    adAccion: 0,
    adNombre: 0,
    adId: 0,

    //Drop
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
      return this.editedIndex === -1 ? "Nueva Sección" : "Actualizando Sección";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
    this.listardocentes();
    this.listarcursos();
  },

  methods: {
    remove(item) {
      let index = this.selectsSecciones.indexOf(item.idseccion);
      if (index >= 0) this.selectsSecciones.splice(index, 1);
    },

    statusCerrar() {
      this.adModal = 0;
    },

    openSnack(text, color) {
      this.textSnack = text;
      this.colorSnack = color;
      this.snackbar = true;
    },

    closeDropModal() {
      this.dropModal = false;
    },

    statusItem(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adId = item.idcategoria;

      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },
    activar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("api/Categorias/Activar/" + this.adId, {}, configuracion)
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
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put("api/Categorias/Desactivar/" + this.adId, {}, configuracion)
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
      axios
        .get("api/Secciones")
        .then(function(response) {
          me.secciones = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    listardocentes() {
      let me = this;
        let docentesArray = [];
      axios
        .get("api/docentes")
        .then(function(response) {
          docentesArray = response.data;
          docentesArray.map(function(x) {
            me.docentes.push({ text: x.nombre, value: x.iddocente });
          })
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    listarcursos() {
      let me = this;
      let cursosArray = [];
      axios
        .get("api/cursos")
        .then(function(response) {
          cursosArray = response.data;
          cursosArray.map(function(x) {
            me.cursos.push({ text: x.nombre, value: x.idcurso });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

  

    selectCarreras(_dialog, id) {
      let me = this;
      let carrerasArray = [];

      axios
        .get("api/Cursos/Carreras/" + id)
        .then(function(response) {
          carrerasArray = response.data;
          carrerasArray.map(function(x) {
            me.selectsCarreras.push(x.idcarrera);
          });
          _dialog();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.id = item.idseccion;
      this.selectsSecciones = [];
      this.nombre = item.nombre;
      this.editedIndex = 1;
      this.selectCarreras(() => {
        this.dialog = true;
      }, this.id);
    },

    dropItem(item) {
      this.dropId = item.idseccion;
      this.dropName = item.nombre;
      this.dropModal = true;
    },
    drop() {
      let me = this;

      axios
        .delete("api/Secciones/" + me.dropId)
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

    close() {
      this.dialog = false;
      this.clean();
    },

    //limpiar principalmente los atributos del objeto
    clean() {
      this.id = "";
      this.nombre = "";
      this.selectsCarreras = [];
      this.editedIndex = -1;
      this.validaMensaje = [];
    },

    guardar() {
      if (this.validar()) {
        return;
      }

      if (this.editedIndex > -1) {
        //Código para editar
        let me = this;

        axios
          .put("api/Secciones", {
            idseccion: me.objseccion.id,
            idcurso: me.objseccion.curso.idcurso,
            iddocente: me.objseccion.docente.iddocente,
            cantidad: me.objseccion.cantidad,
            codigo_curso: me.objseccion.curso.codigo_curso
          })
          .then(function(response) {
            me.openSnack(
              "Registro " + response.codigo_seccion + " actualizado con éxito",
              "blue"
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

        axios
          .post("api/Secciones", {
            iddocente: me.objseccion.docente.iddocente,
            idcurso: me.objseccion.curso.idcurso,
            cantidad: me.objseccion.cantidad,
          })
          .then(function(response) {
            me.openSnack(
              "Registro " + response.codigo_seccion + " creado con éxito",
              "green"
            );
            me.close();
            me.listar();
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    
    validar() {
      this.valida = 0;
      this.validaMensaje = [];

      //if (this.nombre.length < 10 || this.nombre.length > 100) {
       // this.validaMensaje.push(
       //   "-El nombre debe tener más de 10 caracteres y menos de 50 caracteres"
        //);
      //}

      if (this.objseccion.curso.idcurso <= 0) {
        this.validaMensaje.push("Debe seleccionar un curso");
      }
      if (this.objseccion.docente.iddocente <= 0) {
        this.validaMensaje.push("Debe seleccionar un docente");
      }

      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
  },
};
</script>
