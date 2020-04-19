<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        color="secondary"
        app
      >
        <v-list flat dense shaped>
          <v-list-group prepend-icon="import_contacts" no-action color="indigo">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Registros</v-list-item-title>
                <v-list-item-title>Académicos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item router :to="{ name: 'carrera' }" >
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Carreras
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'curso' }" >
              <v-list-item-action>
                <v-icon>book</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Gráficos </v-list-item-title
                ><v-list-item-title>
                  Estadísticos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

 <v-list-group prepend-icon="import_contacts" no-action color="indigo">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Probando</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item router :to="{ name: 'carrera' }" >
              <v-list-item-action>
                <v-icon>assignment</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Carreras
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'carrera' }" >
              <v-list-item-action>
                <v-icon>insert_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Gráficos </v-list-item-title
                ><v-list-item-title>
                  Estadísticos
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
      </v-app-bar>

      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view />
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-footer color="primary2" light app>
        <span class="white--text">&copy; 2020</span>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "App",

  data() {
    return {
      drawer: null
    };
  }
};
</script>
<style scoped>
.border {
  border-left: 4px solid #3F51B5;
}
</style>
