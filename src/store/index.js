import Vue from "vue";
import Vuex from "vuex";
import empresa from "./module-empresa";
import motivo from "./module-motivos";
import perfil from "./module-perfil";
import global from "./module-global";
import consultaChofer from "./module-consultaChofer";
import login from "./module-login";

Vue.use(Vuex);
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      empresa,
      motivo,
      perfil,
      global,
      consultaChofer,
      login
    },
    strict: process.env.DEV
  });

  return Store;
}
