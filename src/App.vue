<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        v-if="logueado"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        color="secondary"
        app
      >
        <v-list flat dense shaped>
          <v-list-group prepend-icon="import_contacts" no-action color="indigo">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Programación</v-list-item-title>
                <v-list-item-title>Académica</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item router :to="{ name: 'carrera' }">
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Carreras
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'curso' }">
              <v-list-item-action>
                <v-icon>book</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Cursos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'seccion' }">
              <v-list-item-action>
                <v-icon>book</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Secciones
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group prepend-icon="import_contacts" no-action color="indigo">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Administración</v-list-item-title>
                <v-list-item-title>Académica</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item router :to="{ name: 'alumno' }">
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Alumnos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'docente' }">
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Docentes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'matricula' }">
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Matrícula
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group prepend-icon="import_contacts" no-action color="indigo">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Seguridad</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item router :to="{ name: 'usuario' }">
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'rol' }">
              <v-list-item-action>
                <v-icon>book</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Roles
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group prepend-icon="import_contacts" no-action color="indigo">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Consultas</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item router :to="{ name: 'login' }">
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Consulta de
                </v-list-item-title>
                <v-list-item-title>
                  Matricula
                </v-list-item-title>
                <v-list-item-title>
                  por Ciclo
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
        app
        dark
        color="primary2"
        :clipped-left="$vuetify.breakpoint.lgAndUp"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>System Uni</v-toolbar-title>
        <v-spacer/>
        <span v-if="logueado" >
          Bienvenido {{rol}}
        </span>
        
        <v-btn v-if="logueado" icon @click="salir">
          <v-icon>logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view />
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <!--  <v-footer color="primary2" light app>
        <span class="white--text">&copy; 2020</span>
      </v-footer> -->
    </v-app>
  </div>
</template>
<script>
export default {
  name: "App",

  data() {
    return {
      drawer: null,
      
  };
  },
  computed: {
    logueado() {
      return this.$store.state.usuario;
    },
    rol() {
      return this.$store.state.usuario.rol;
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  methods: {
    salir() {
      this.$store.dispatch("salir");
    },
  },
};
</script>
<style scoped>
.border {
  border-left: 4px solid #3f51b5;
}
</style>
