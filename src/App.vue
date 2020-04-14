<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        color ="secondary"
        app
      >
        <v-list dense>
        <v-list-group
          prepend-icon="home"
          no-action
          
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </template>
  
          <v-list-item
            :to="{ name: 'inicio' }"
          >
              <v-list-item-action>
                <v-icon>insert_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Gráficos 
                </v-list-item-title><v-list-item-title>
                 Estadísticos
                </v-list-item-title>
              </v-list-item-content>
          </v-list-item>

            <v-list-item
            :to="{ name: 'inicio' }"
          >
              <v-list-item-action>
                <v-icon>insert_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Gráficos 
                </v-list-item-title><v-list-item-title>
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
        <router-view></router-view>
      </v-content>
      <v-footer  color="primary2" light app>
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
  border-left: 4px solid #0ba518;
}
</style>
