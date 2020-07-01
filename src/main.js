import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://api-universidad.australiaeast.azurecontainer.io/";
//axios.defaults.baseURL = "https://localhost:5001";


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
