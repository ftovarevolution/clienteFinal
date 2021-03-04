import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import axios from "axios";

Vue.use(VueRouter);

export default function({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach(async (to, from, next) => {
    if (to.meta) {
      if (to.meta.requiresAuth) {
        let conectApi = await store.getters["global/getconectApi"];
        let portApi = await store.getters["global/getPort"];
        let token = null;
        if (localStorage.token) {
          token = localStorage.token;
        }
        if (token) {
          let auth = await authenticate(
            token,
            conectApi,
            portApi,
            to.meta.group[0]
          );
          if (!auth) {
            next({ path: "/" });
            // next({ name: "login" });
          } else {
            next();
          }
        } else {
          if (to.fullPath != "/") {
            next({ name: "" });
          } else {
            next();
          }
        }
      } else {
        next();
      }
    } else {
      next();
    }
  });
  return Router;
}

async function authenticate(token, conectApi, portApi, roles) {
  const xvariables = {
    token
  };
  let resultado = false;
  let urlConsulta =
    "http://" + conectApi + ":" + portApi + "/api/auth/verifyAuth";
  await axios
    .post(urlConsulta, xvariables)
    .then(response => {
      const rolesToken = response.data.roles;
      if (rolesToken) {
        switch (roles) {
          case "ADM":
            if (rolesToken == "ADM") {
              resultado = true;
            } else {
              resultado = false;
            }
            break;

          case "SUP":
            if (rolesToken == "ADM" || rolesToken == "SUP") {
              resultado = true;
            } else {
              resultado = false;
            }
            break;

          case "USE":
            if (
              rolesToken == "ADM" ||
              rolesToken == "SUP" ||
              rolesToken == "USE"
            ) {
              resultado = true;
            } else {
              resultado = false;
            }
            break;

          default:
            resultado = false;
            break;
        }
      } else {
        resultado = null;
      }
    })
    .catch((err, response) => {
      console.log("#####", err);
      resultado = false;
    });
  return resultado;
}
