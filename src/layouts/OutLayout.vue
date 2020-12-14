<template>
  <q-layout view="lHh Lpr lFf">
    <div id="app">
      <transition v-if="loginew" name="slideUp" mode="out-in">
        <router-view />
      </transition>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: "OutLayout",
  components: {},
  computed: {
    loginew() {
      return this.$store.state.global.loginew;
    }
  },
  data() {
    return {};
  },

  beforeCreate() {
    console.log("beforeCreate -> localStorage", localStorage);
    if (localStorage.valuelogin) {
      if (
        localStorage.valuelogin === "1" &&
        localStorage.email &&
        localStorage.register
      ) {
        if (localStorage.register === "true") {
          this.$store.commit("global/setLoginew", false);
          this.$router.push("/home");
        } else {
          this.$store.commit("global/setLoginew", true);
        }
      } else {
        this.$store.commit("global/setLoginew", true);
      }
    } else {
      this.$store.commit("global/setLoginew", true);
    }
  }
};
</script>

<style></style>
