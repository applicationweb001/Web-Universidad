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
            :headers="headers"
            :items="secciones"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Cursos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      >New Item</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Dessert name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.calories"
                              label="Calories"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.fat"
                              label="Fat (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.carbs"
                              label="Carbs (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.protein"
                              label="Protein (g)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-data-table
            :headers="headers"
            :items="secciones"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Cursos matriculados</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      >New Item</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Dessert name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.calories"
                              label="Calories"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.fat"
                              label="Fat (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.carbs"
                              label="Carbs (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.protein"
                              label="Protein (g)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table></v-col
        >
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    secciones: [],
    seccionesSelect: [],

    dialog: false,
    headers1: [
      { text: "Opciones", value: "opcion", sortable: false },
      { text: "Curso", value: "nombre", sortable: true },
      { text: "Numero de Carreras", value: "carreras", sortable: true },
    ],
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false },
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

    secciones: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
      },
    ],
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
        .get("api/cursos")
        .then((response) => {
          me.cursos = response.data;
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
