<template>
  <q-layout view="lHh Lpr lFf">
    <div id="app">
      <transition name="slideUp" mode="out-in">
        <router-view />
      </transition>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: "OutLayout",
  components: {},
  data() {
    return {};
  },
  beforeCreate() {
    console.log("beforeCreate -> localStorage.register", localStorage.register);
    if (localStorage.valuelogin) {
      if (
        localStorage.valuelogin === "1" &&
        localStorage.email &&
        localStorage.register
      ) {
        if (localStorage.register === "true") {
          console.log("me cogio");
          this.$router.push("/home");
        }
      }
    }
  }
};
</script>

<style></style>
