import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: '#D36A48', // #E53935 // Letras drawer
          secondary: '#EEEEEE', // #FFCDD2 // drawer
          primary2: '#3787A8', //
          accent: '#3F51B5', // #3F51B5
        },
      },
  },
  icons: {
    iconfont: 'md',
  },
});
