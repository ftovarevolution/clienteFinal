import Amplify from "@aws-amplify/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";
import AwsExports from "../aws-exports";
import { date } from "quasar";

//console.log(AwsExports);

Amplify.configure(AwsExports);

export default ({ router, Vue, store }) => {
  Vue.prototype.$date = date;
  Vue.prototype.$Auth = Auth;
  Vue.prototype.$API = API;
  Vue.prototype.$API.graphqlOperation = graphqlOperation;
  Vue.prototype.$Storage = Storage;

  router.beforeResolve(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      await Vue.prototype.$q.loading.show({
        spinnerColor: "primary",
        messageColor: "primary",
        backgroundColor: "white",
        message: "Verificando Usuario.."
      });
      await Vue.prototype.$Auth
        .currentAuthenticatedUser({
          bypassCache: true
        })
        .then(async data => {
          if (data.attributes.identities) {
            let provider = JSON.parse(data.attributes.identities);
            if (provider[0].providerName === "Google") {
              store.commit("user/setpictureProfile", data.attributes.picture);
            }
            if (provider[0].providerName === "Facebook") {
              let pict = JSON.parse(data.attributes.picture);
              store.commit(
                "user/setpictureProfile",
                "https://graph.facebook.com/" +
                  provider[0].userId +
                  "/picture?type=large&redirect=true&width=200&height=200"
              );
            }
          }
          await Vue.prototype.$q.loading.hide();
          next();
        })
        .catch(async e => {
          //console.log("error ", e);
          next({
            path: "/home"
          });
          await Vue.prototype.$q.loading.hide();
        });
    }
    next();
  });
};
