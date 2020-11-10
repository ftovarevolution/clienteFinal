<template>
  <!-- <div class="bg-image"> -->
  <q-page-container>
    <q-page
      class="flex flex-center page-login justify-start items-start content-start"
    >
      <q-card class="my-card shadow-9" style="margin-top: 160px;">
        <q-card-section style="text-align: center;">
          <a style="color: grey;">Continuar con</a>
          <q-card-section style="text-align: center;">
            <q-btn
              to="/page1"
              size="20px"
              class="botonSocialNet"
              color="blue"
              icon="fab fa-facebook-square"
              label="FACEBOOK"
            />
          </q-card-section>
          <q-card-section style="text-align: center;">
            <q-btn
              to="/page2"
              size="20px"
              class="botonSocialNet"
              color="red"
              icon="fab fa-google"
              label="Google"
            />
          </q-card-section>
          <q-card-section style="text-align: center;">
            <q-btn
              flat
              style="color: red"
              @click="registrarse"
              label="Regístrate"
            />
          </q-card-section>
          <a style="color: grey;"
            >¿Ya tienes una cuenta?
            <router-link to="/login">iniciar sesión</router-link>
          </a>
          <transition name="slide-fade" mode="out-in">
            <router-view />
          </transition>
        </q-card-section>
      </q-card>
      <q-footer class="bg-white text-primary">
        <div style="text-align: center; margin-bottom: 16px;">
          Al continuar aceptas nuestros
          <a href="">Términos y Condiciones.</a>
        </div>
      </q-footer>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  name: "PageLogin",
  data() {
    return {
      text: "",
      username: "",
      password: ""
    };
  },
  mounted() {
    this.muestraTérminos = true;
  },
  methods: {
    enterfun(e) {
      console.log(e);
      this.$refs.pass.$el.focus();
    },
    registrarse() {
      this.$router.push("/registro");
    },
    signIn() {}
  }
};
</script>

<style lang="sass" scoped>
// .page-login
//   background-color: #ff9393

.botonSocialNet
  width: 100%
  height: 50px

.my-card
  width: 100%
  max-width: 90%
  position: static

.bg-image
    background-image: url(https://i.pinimg.com/originals/c2/ea/c0/c2eac03478c2aa0fa8178b5f233690c6.jpg)
    background-repeat: no-repeat
    background-size: auto;
</style>
