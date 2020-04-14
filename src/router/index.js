import Vue from 'vue'
import VueRouter from 'vue-router'
import Carrera from '../components/Carrera.vue'
Vue.use(VueRouter)

  const routes = [
    {
      path: '/carrera', //este es la ruta del navegador
      name: 'carrera', //este nombre es el que se usa en el html
      component: Carrera,
    },
    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
