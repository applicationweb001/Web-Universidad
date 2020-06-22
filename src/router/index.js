import Vue from "vue";
import VueRouter from "vue-router";
import Carrera from "../components/ProgramacionAcademica/Carrera.vue";
import Curso from "../components/ProgramacionAcademica/Curso.vue";
import Curso1 from "../components/AdministracionAcademica/Carrera.vue";
import Login from "../components/Seguridad/Login.vue";
import store from "../store/index.js";
import Matricula from "../components/AdministracionAcademica/Matricula.vue";
import Alumno from "../components/AdministracionAcademica/Alumno.vue";
import Seccion from "../components/ProgramacionAcademica/Seccion.vue";
import Docente from "../components/AdministracionAcademica/Docente.vue";
import Rol from "../components/Seguridad/Rol.vue";
import Usuario from "../components/Seguridad/Usuario.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/carrera", //este es la ruta del navegador
    name: "carrera", //este nombre es el que se usa en el html
    component: Carrera,
  },
  {
    path: "/curso", //este es la ruta del navegador
    name: "curso", //este nombre es el que se usa en el html
    component: Curso,
  },
  {
    path: "/curso1", //este es la ruta del navegador
    name: "curso1", //este nombre es el que se usa en el html
    component: Curso1,
  },
  {

    path: "/alumno", //este es la ruta del navegador
    name: "alumno", //este nombre es el que se usa en el html
    component: Alumno,
  },
  {
    path: "/seccion", //este es la ruta del navegador
    name: "seccion", //este nombre es el que se usa en el html
    component: Seccion,

  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/matricula", //este es la ruta del navegador
    name: "matricula", //este nombre es el que se usa en el html
    component: Matricula,
  },
  {
    path: "/docente", //este es la ruta del navegador
    name: "docente", //este nombre es el que se usa en el html
    component: Docente,
  },
  {
    path: "/rol", //este es la ruta del navegador
    name: "rol", //este nombre es el que se usa en el html
    component: Rol,
  },
  {
    path: "/usuario", //este es la ruta del navegador
    name: "usuario", //este nombre es el que se usa en el html
    component: Usuario,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!store.state.usuario && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});
export default router;
