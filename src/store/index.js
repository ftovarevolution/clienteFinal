import Vue from "vue";
import Vuex from "vuex";
import login from "./module-login";
import global from "./module-global";
import user from "./module-user";

// import empresa from "./module-empresa";
// import paquetes from "./module-paquetes";
// import empresasUser from "./module-empresa-user";
// import aulas from "./module-aulas";
Vue.use(Vuex);
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      login,
      global,
      user
    },
    strict: process.env.DEV
  });

  return Store;
}
