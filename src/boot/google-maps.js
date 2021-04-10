import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDkqBdPqV23GdHViH9O0MeeWLsWhmgVFFA",
    libraries: "places",
    region: "PA",
    language: "es",
    installComponents: false
  }
});
