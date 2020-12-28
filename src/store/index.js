import Vue from "vue";
import Vuex from "vuex";
import login from "./module-login";
import global from "./module-global";
import user from "./module-user";
import home from "./module-home";
import foodList from "./module-foodList";
import carrito from "./module-carrito";

Vue.use(Vuex);
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      login,
      global,
      user,
      home,
      foodList,
      carrito
    },
    strict: process.env.DEV
  });

  return Store;
}
