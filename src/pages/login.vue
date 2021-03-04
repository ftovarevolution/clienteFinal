<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>
    <loginComponent />
  </div>
</template>

<script>
import loginComponent from "components/loginComponent";
import Vue from "vue";
export default {
  name: "PageLogin",
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  components: {
    loginComponent
  },
  mounted() {},

  methods: {}
};
</script>
<style lang="sass" scoped>

.page-login
   //background-color: #31ccec

.my-card
  width: 100%
  max-width: 90%
  position: static

.bg-image
    //background-image: url('https://www.emprenderalia.com/wp-content/uploads/6_claves_primeras_ventas_online.jpg')
    background-image: url('https://plataformadiconsulta.com/background1.jpg')
    background-repeat: no-repeat
    background-size: auto
</style>
