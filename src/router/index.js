import Vue from 'vue'
import VueRouter from 'vue-router'
import Carrera from '../components/Carrera.vue'
import Curso from '../components/Curso.vue'

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
    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
