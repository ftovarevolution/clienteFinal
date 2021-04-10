<template>
  <!-- <div class="bg-image"> -->
  <q-page-container>
    <q-page
      class="flex flex-center page-login justify-start items-start content-start my-font"
    >
      <div class="row">
        <div class="col-9">
          <img
            style="width: 120%; margin-top: 0px; margin-bottom: 0px;"
            src="logo1.png"
            class="logo q-pb-none"
          />
        </div>
        <div
          class="col-12 text-center"
          style="border: 0px solid; position: relative; margin-top: -30px;"
        >
          <span style="margin-top: 0px; color: #A22917; font-size: 46px; "
            >Inicia
          </span>
        </div>
      </div>
      <q-card class="my-card shadow-9" style="margin-top: 0px;">
        <q-card-section style="text-align: center;">
          <q-card-section style="text-align: center;">
            <q-btn
              style="border-radius: 50px;"
              size="20px"
              class="botonSocialNet"
            >
              <img class="iconoboton" src="iconos_REGISTRO_FACEBOOK-01.svg" />
              <span
                class="text-capitalize"
                style="margin-top: -40px; margin-left: -30px; color: blue;"
                >Usando Facebook</span
              >
            </q-btn>
          </q-card-section>
          <q-card-section style="text-align: center;">
            <q-btn
              style="border-radius: 50px;"
              size="20px"
              class="botonSocialNet"
            >
              <img class="iconoboton2" src="iconos_REGISTRO_GOOGLE-01.svg" />
              <span
                class="text-capitalize"
                style="margin-top: -38px; margin-left: -20px; color: red;"
              >
                Usando Google</span
              >
            </q-btn>
          </q-card-section>
          <q-card-section style="text-align: center;">
            <q-btn
              color="red-10"
              style="border-radius: 50px;"
              size="20px"
              class="botonSocialNet"
              @click="registrarse"
            >
              <img class="iconoboton3" src="iconos_REGISTRO-02.svg" />
              <span
                class="text-capitalize"
                style="margin-top: -38px; margin-left: -20px; color: white;"
              >
                Registrate</span
              >
            </q-btn>
          </q-card-section>
          <transition name="slide-fade" mode="out-in">
            <router-view />
          </transition>
        </q-card-section>
      </q-card>
      <a style="color: #A22917; margin-top: 50px; font-size: 20px"
        >¿Ya tienes una cuenta?
        <router-link style="color: #A22917;" to="/login"
          >inicia sesión</router-link
        >
      </a>

      <q-footer reveal class="bg-white text-black">
        <div style="text-align: center; margin-bottom: 16px; font-size: 20px">
          Al continuar aceptas nuestros
          <q-space />
          <a href="" style="color: black; font-size: 18px"
            >Términos y Condiciones.</a
          >
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

.iconoboton
  width: 200px
  height: 119px
  margin-left: -100px
  margin-top: -38px

.iconoboton2
  width: 180px
  height: 119px
  margin-left: -111px
  margin-top: -40px

.iconoboton3
  width: 180px
  height: 117px
  margin-left: -150px
  margin-top: -40px

.logo
  width: 80%
  margin-top: 30px
  position: relative
</style>
