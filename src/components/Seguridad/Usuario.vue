<template>
  <v-layout aling-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="usuarios"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Usuarios</v-toolbar-title>
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
            <v-dialog v-model="modalAlumno" max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline"></span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <template>
                      <v-data-table
                        :headers="headersAlumno"
                        :items="alumnosLibres"
                        :search="search1"
                        class="elevation-1"
                      >
                        <template v-slot:top>
                          <v-toolbar flat color="white">
                            <v-toolbar-title
                              >Alumnos sin Usuarios</v-toolbar-title
                            >
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-text-field
                              class="text-xs-center"
                              v-model="search1"
                              append-icon="search"
                              label="Búsqueda"
                              single-line
                              hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                        </template>
                        <template template v-slot:item.seleccionar="{ item }">
                          <td class="justify-center layout px-0">
                            <v-icon
                              small
                              class="mr-2"
                              @click="agregarAlumno(item)"
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
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="usuario.correo"
                          label="Nombre de Usuario"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          type="password"
                          v-model="usuario.contrasenia"
                          label="Contraseña"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-autocomplete
                          v-model="usuario.idrol"
                          :items="roles"
                          label="Rol"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row v-if="editedIndex">
                      <v-col cols="12" sm="6" md="6">
                        <v-checkbox
                          v-model="editedIndex"
                          label="¿Actualizar Contraseña?"
                        ></v-checkbox>
                      </v-col>
                    </v-row>

                    <v-row v-if="usuario.idrol == 1">
                      <v-col cols="12" sm="10" md="10">
                        <v-text-field
                          v-model="nombreAlumno"
                          label="Nombre del alumno"
                          filled
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="2" md="2">
                        <v-btn icon dark color="primary" @click="openAlumno()">
                          <v-icon>search</v-icon>
                        </v-btn>
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
            :timeout="7000"
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
    alumnosLibres: [],

    usuarios: [],
    roles: [],
    dialog: false,
    headers: [
      { text: "Opciones", value: "opcion", sortable: false },
      { text: "Nombre Usuario", value: "email", sortable: true },
      { text: "Rol", value: "rol", sortable: false },
    ],
    headersAlumno: [
      { text: "Seleccionar", value: "seleccionar", sortable: false },
      { text: "Alumno", value: "nombre", sortable: true },
      { text: "Apellido", value: "apellido", sortable: true },
      { text: "Carreras", value: "nombreCarrera", sortable: true }, //el name es lo que tiene que ir igual al archivo JSON
      { text: "DNI", value: "dni", sortable: true },
      { text: "Fecha de Nacimiento", value: "fechanacimiento", sortable: true },
    ],
    search: "",
    search1: "",
    nombreAlumno:"",
    
    editedIndex: 0,

    usuario: {
      id: "",
      idrol: 0,
      correo: "",
      contrasenia: "",
      idalumno: 0,
    },
    actPassword: false,

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
    modalAlumno: false,

    /*
    rules: {
      required: value => {
        return !!value||'Required.';
      },
      counter: value => {
        return value.length<=20||'Max 20 characters';
      },
      email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
      }

    } */
  }),

  computed: {
    formTitle() {
      return this.editedIndex === 0 ? "Nuevo Usuario" : "Actualizando Usuario";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
    this.selectRoles();
    this.listarAlumnos();
  },

  methods: {
    close() {
      this.dialog = false;
      this.clean();
    },
    openAlumno() {
      this.modalAlumno = true;
    },
    agregarAlumno(item) {
      this.modalAlumno = false;
      this.usuario.idalumno = item.idAlumno;
      this.nombreAlumno = item.nombre +" " +item.apellido;
    },

    cleanJson(jsonx) {
      for (var clave in jsonx) {
        if (typeof jsonx[clave] == "string") {
          jsonx[clave] = "";
        }
        if (typeof jsonx[clave] == "number") {
          console.log(typeof jsonx[clave]);
          jsonx[clave] = 0;
        }
      }
    },

    clean() {
      this.cleanJson(this.usuario);
      this.nombreAlumno ="";
      this.editedIndex = 0;
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
      this.clean();
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

    listar() {
      let me = this;
      //let header = {"Authorization" : "Bearer "+this.$store.state.token };
      //let configuracion ={headers : header};
      axios
        .get("api/Usuarios")
        .then((response) => {
          me.usuarios = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    listarAlumnos() {
      let me = this;
      //let header = {"Authorization" : "Bearer "+this.$store.state.token };
      //let configuracion ={headers : header};
      axios
        .get("api/Alumnos/libres")
        .then((response) => {
          me.alumnosLibres = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    selectRoles() {
      let me = this;
      var rolesArray = [];

      /*    let header = {"Authorization" : "Bearer "+this.$store.state.token };
      let configuracion ={headers : header}; */
      axios
        .get("api/Roles/Select")
        .then(function(response) {
          //console.log(response);
          rolesArray = response.data;
          rolesArray.map(function(x) {
            me.roles.push({ text: x.nombre, value: x.idrol });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.usuario.id = item.idusuario;
      this.usuario.idrol = item.idrol;
      this.usuario.correo = item.email;
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
          console.log(error.response.data);
        });
    },

    guardar() {
      if (this.validar()) {
        return;
      }

      if (this.editedIndex > 0) {
        //Código para editar
        let me = this;
        //let header = {"Authorization" : "Bearer "+this.$store.state.token };
        //let configuracion ={headers : header};
        axios
          .put("api/Alumnos", {
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
            console.log(error.response.data);
          });
      } else {
        //Código para guardar
        let me = this;
        //let header = {"Authorization" : "Bearer "+this.$store.state.token };
        //let configuracion ={headers : header};
        axios
          .post("api/Usuarios", {
            idrol: me.usuario.idrol,
            email: me.usuario.correo,
            password: me.usuario.contrasenia,
            idalumno: me.usuario.idalumno,
          })
          .then(function(response) {
            me.openSnack(
              response.data,
              "green"
            );
            me.close();
            me.listar();
          })
          .catch(function(error) {
            console.log(error.response.data);

            var errorback = error.response.data;
            if (errorback == "El nombre de usuario ya existe") {
              me.openSnack(
                "Mensaje de Sistema: El nombre de usuario ya existe, por favor ingrese otro",
                "red"
              );
            }
          });
      }
    },

    validar_clave(contrasenna) {
      if (contrasenna.length >= 9) {
        var mayuscula = false;
        var numero = false;

        for (var i = 0; i < contrasenna.length; i++) {
          if (
            contrasenna.charCodeAt(i) >= 65 &&
            contrasenna.charCodeAt(i) <= 90
          ) {
            mayuscula = true;
          } else if (
            contrasenna.charCodeAt(i) >= 48 &&
            contrasenna.charCodeAt(i) <= 57
          ) {
            numero = true;
          }
        }
        return mayuscula && numero;
      }
      return false;
    },

    validar() {
      this.valida = 0;
      this.validaMensaje = [];

      if (this.usuario.correo.length > 9 || this.usuario.correo.length === 0) {
        this.validaMensaje.push(
          "El nombre de usuario debe estar vacio y debe tener menos de 10 caracteres"
        );
      }

      if (this.usuario.idrol == "" || this.usuario.idrol == 0) {
        this.validaMensaje.push("Debe selecciona un rol");
      }

      if (!this.validar_clave(this.usuario.contrasenia)) {
        this.validaMensaje.push(
          "La contraseña debe tener como mínimo 9 caractéres, donde debe contener al menos una mayúscula y número"
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
