<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card>
        <v-toolbar dark color="primary2">
          <v-toolbar-title>
            Acceso al Sistema
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon large target="_blank" v-on="on">
                <v-icon>home</v-icon>
              </v-btn>
            </template>
            <span>christian@hotmail.com</span>
            <span> / password</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="email"
            autofocus
            color="accent"
            label="Email"
            prepend-icon="person"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            color="accent"
            label="Password"
            prepend-icon="lock"
            required
          >
          </v-text-field>
          <v-flex class="red--text" v-if="error">
            {{ error }}
          </v-flex>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-flex text-xs-right>
            <v-btn @click="ingresar" color="primary">Ingresar</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    ingresar() {
      this.error = null;
      axios
        .post("api/Usuarios/Login", {
          email: this.email,
          password: this.password,
        })
        .then((respuesta) => {
          return respuesta.data;
        })
        .then((data) => {
          this.$store.dispatch("guardarToken", data.token);
          this.$router.push({ name: "inicio" });
        })
        .catch((err) => {
          if (err.response == undefined) {
            this.error = "Ocurrió un error de conexión con el servidor";
          } else {
            if (err.response.status == 400) {
              this.error = "No es un email válido";
            } else if (err.response.status == 404) {
              this.error = "No existe el usuario o sus datos son incorrectos";
            } else {
              this.error = "Ocurrió un error";
            }
          }
        });
    },
  },
};
</script>
