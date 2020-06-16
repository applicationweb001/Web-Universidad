<template>
  <v-layout aling-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="alumnos"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Alumnos</v-toolbar-title>
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
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="dni"
                          label="DNI"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
                    </v-row>
                    
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="direccion"
                          label="Direccion"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                        v-model="idcarrera"
                        :items="carreras"
                        label="Carrera ps causa"
                        ></v-select>
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
                  >¿Desea eliminar el Alumno?</v-card-title
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
    alumnos: [],
    carreras: [],
    dialog: false,
    headers: [
      { text: "Opcion", value: "opcion", sortable: false },
      { text: "Alumno", value: "nombre", sortable: true },
      { text: "Apellido", value: "apellido", sortable: true },
      { text: "Carreras", value: "nombreCarrera", sortable: true }, //el name es lo que tiene que ir igual al archivo JSON
      { text: "DNI", value: "dni", sortable: true },
      { text: "Fecha de Nacimiento", value: "fechanacimiento", sortable: true },
    ],
    search: "",
    editedIndex: -1,

    //objeto
    id: "",
    nombre: "",
    idcarrera: 0,

    date: new Date().toISOString().substr(0, 10),
    menu: false,
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
      return this.editedIndex === -1 ? "Nuevo Alumno" : "Actualizando Alumno";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
    this.ListCarreras();
    this.ListAlumnos();
  },

  methods: {
    remove(item) {
      let index = this.selectsCarreras.indexOf(item.idcarrera);
      if (index >= 0) this.selectsCarreras.splice(index, 1);
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
        .get("api/Alumnos")
        .then(function(response) {
          me.alumnos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    ListCarreras() {
      let me = this;
      let carrerasArray = [];

      axios
        .get("api/Carreras/select")
        .then(function(response) {
          //console.log(response);
          carrerasArray = response.data;
          carrerasArray.map(function(x) {
            me.carreras.push({ text: x.nombre, value: x.idcarrera });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

       editItem(item) {
      this.id = item.idalumno;
      this.selectsAlumnos = [];
      this.nombre = item.nombre;
      this.editedIndex = 1;
      this.selectAlumnos(() => {
        this.dialog = true;
      }, this.id);
    },

    dropItem(item) {
      this.dropId = item.idalumno;
      this.dropName = item.nombre;
      this.dropModal = true;
    },
    drop() {
      let me = this;

      axios
        .delete("api/Alumnos/" + me.dropId)
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
          .put("api/Alumnos", {
            idalumno: me.id,
            nombre: me.nombre,
            carreras: me.selectsCarreras,
            dni: me.dni,
            fechanacimiento: me.fechanacimiento,
            direccion: me.direccion
          })
          .then(function(response) {
            me.openSnack(
              "Registro " + me.nombre + " actualizado con éxito",
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
          .post("api/Alumnos", {
            nombre: me.nombre,
            carreras: me.selectsCarreras,
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
          "-El nombre debe tener más de 10 caracteres y menos de 50 caracteres"
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
