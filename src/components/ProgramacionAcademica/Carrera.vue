<template>
  <v-layout aling-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="carreras"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Carreras</v-toolbar-title>
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
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12 v-show="valida">
                        <div
                          class="red--text"
                          v-for="v in validaMensaje"
                          :key="v"
                          v-text="v"
                        ></div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn outlined color="primary2" @click.native="close"
                    >Cancelar</v-btn
                  >
                  <v-btn color="primary" dark @click.native="guardar"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- <v-dialog v-model="adModal" max-width="300">
              <v-card>
                <v-card-title class="headline" v-if="adAccion == 1"
                  >¿Activar Item?</v-card-title
                >
                <v-card-title class="headline" v-if="adAccion == 2"
                  >¿Desactivar Item?</v-card-title
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
                    >Activar</v-btn
                  >
                  
                  <v-btn
                    v-if="adAccion == 2"
                    color="orange darken-4"
                    flat="flat"
                    @click="desactivar()"
                    >Desactivar</v-btn
                  >
                 
                </v-card-actions>
              </v-card>
            </v-dialog> -->

            <v-dialog v-model="dropModal" max-width="400">
              <v-card>
                <v-card-title class="headline"
                  >¿Desea eliminar la Carrera?</v-card-title
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

          <!-- <template v-if="item.condicion">
            <v-icon small @click="statusItem(2, item)">
              block
            </v-icon>
          </template>
          <template v-else>
            <v-icon small @click="statusItem(1, item)">
              check
            </v-icon>
          </template>
           -->
        </template>

        <!--   <template v-slot:item.condicion="{ item }">
          <td>
            <div v-if="item.condicion">
              <span class="blue--text">Activo</span>
            </div>
            <div v-else>
              <span class="red--text">Inactivo</span> 
            </div>
          </td>
        </template> -->

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
    carreras: [],
    dialog: false,
    headers: [
      { text: "Opciones", value: "opcion", sortable: false },
      { text: "Carrera", value: "nombre", sortable: true },
    ],
    search: "",
    editedIndex: -1,
    id: "",
    nombre: "",
    valida: 0,
    validaMensaje: [],

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
        .get("api/Carreras")
        .then((response) => {
          me.carreras = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.id = item.idcarrera;
      this.nombre = item.nombre;
      this.editedIndex = 1;
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
      if (this.validar()) {
        return;
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
        axios
          .post("api/Carreras", {
            nombre: me.nombre,
          })
          .then(function(response) {
            me.openSnack(
              "Registro " + me.nombre + " creado con éxito",
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
