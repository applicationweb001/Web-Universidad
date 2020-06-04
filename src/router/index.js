import Vue from 'vue'
import VueRouter from 'vue-router'
import Carrera from '../components/ProgramacionAcademica/Carrera.vue'
import Curso from '../components/ProgramacionAcademica/Curso.vue'
import Curso1 from '../components/AdministracionAcademica/Carrera.vue'
import Login from '../components/Seguridad/Login.vue'
import store from '../store/index.js';


Vue.use(VueRouter)

  const routes = [
    {
      path: '/carrera', //este es la ruta del navegador
      name: 'carrera', //este nombre es el que se usa en el html
      component: Carrera,
    },
    {
      path: '/curso', //este es la ruta del navegador
      name: 'curso', //este nombre es el que se usa en el html
      component: Curso,
    },
    {
      path: '/curso1', //este es la ruta del navegador
      name: 'curso1', //este nombre es el que se usa en el html
      component: Curso1,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  if (!store.state.usuario && to.path !== '/login') {
    next('/login');
  } 
  else {
    next();
  }
});
export default router
