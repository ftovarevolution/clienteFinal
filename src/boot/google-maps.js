import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBcnCkRAXXrWhhYv8mW2MPEkcC5sxKVw9U",
    libraries: "places",
    region: "PA",
    language: "es",
    installComponents: false
  }
});
