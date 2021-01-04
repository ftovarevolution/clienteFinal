<template>
  <q-page-container class="my-font">
    <!-- <q-icon
      v-if="splash"
      style="width: 100%; height: 100%; z-index: 10000000; position:absolute;"
      name="img:BACKPACKgif.gif"
    /> -->
    <q-page
      class="flex flex-center page-login justify-start items-start content-start"
    >
      <q-toolbar class="bg-white text-primary">
        <q-btn to="/" flat round icon="fal fa-arrow-left" />
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
      <q-avatar size="124px" color="red-10" text-color="white">
        <img style="margin-left: 8px" src="iconos_perfil_mi_cuenta-01.svg" />
      </q-avatar>
      <div class="title1">
        Ingrese:
      </div>
      <q-form @submit="signIn" @reset="onReset" class="form1" ref="formLogin">
        <q-card class="my-card shadow-9" style="margin-top: 10px;">
          <q-card-section>
            <q-input
              rounded
              standout="bg-red text-white"
              ref="email"
              @blur="focusInput(0)"
              @click="focusInput(1)"
              bottom-slots
              v-model="email"
              no-error-icon
              :rules="[
                $rules.required('Campo Obligatorio..'),
                $rules.email('No es un email..')
              ]"
              label="Correo:"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="fas fa-envelope" />
              </template>
              <!-- <template v-slot:append>
                <q-btn
                  flat
                  color="primary"
                  icon="fal fa-times"
                  class="cursor-pointer q-mr-sm"
                  @click="email = ''"
                  no-error-icon
                  style="width: 36px;"
                />
              </template> -->
            </q-input>
            <q-input
              rounded
              standout="bg-red text-white"
              ref="pass"
              @blur="focusInput(0)"
              @click="focusInput(1)"
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              lazy-rules
              no-error-icon
              :rules="[$rules.required('Campo Obligatorio..')]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="fas fa-lock" />
              </template>
              <template v-slot:append>
                <q-btn
                  color="primary"
                  v-show="!isPwd"
                  flat
                  icon="fal fa-eye"
                  class="cursor-pointer q-mr-sm"
                  @click="isPwd = true"
                  style="width: 36px;"
                />
                <q-btn
                  v-show="isPwd"
                  flat
                  color="primary"
                  icon="fal fa-eye-slash"
                  class="cursor-pointer q-mr-sm"
                  @click="isPwd = false"
                  style="width: 36px;"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
        <div style="text-align: center; margin-top: 30px;">
          <q-btn
            flat
            rounded
            style="width: 280px; height: 46px; margin-top: 20px"
            @click="signIn"
          >
            <img style="margin-top: -40px" src="iconos_iniciar.svg" />
          </q-btn>
        </div>
      </q-form>
      <div style="margin-top: 20px;">
        <q-checkbox
          class="text-primary"
          v-model="valuelogin"
          label="Recuerdame"
        />
        <q-btn
          class="text-weight-light text-center"
          flat
          size="md"
          text-color="primary"
          color="primary"
          no-caps
          @click="menuPass"
          label="Olvidaste tu contraseña"
        />
      </div>
      <MenuPass></MenuPass>

      <q-footer class="bg-white text-black">
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
const MenuPass = () =>
  import(/*webpackChunkName: "MenuPass" */ "./../components/menupass");
import { Loading, QSpinnerGears } from "quasar";

export default {
  components: {
    MenuPass
  },
  data() {
    return {
      splash: true,
      enablefooter: true,
      valuelogin: null,
      password: "",
      isPwd: true,
      name: "",
      email: "",
      pass: ""
    };
  },
  mounted() {
    const self = this;
    if (localStorage.valuelogin) {
      if (localStorage.valuelogin === "1") {
        self.valuelogin = true;
      } else {
        self.valuelogin = false;
        localStorage.email = "";
      }
    } else {
      if (!self.valuelogin) {
        self.valuelogin = false;
        localStorage.email = "";
      }
    }
    if (self.valuelogin) {
      if (localStorage.email) {
        this.email = localStorage.email;
        self.$store.commit("login/setSubID", localStorage.SubID);
        self.$store.commit("login/setUserVerify", this.email);
        self.$store.commit("login/setVerify", true);
        self.$store.commit("login/setRegister", true);
      }
    } else {
    }
    setTimeout(() => {
      self.splash = false;
    }, 2700);
  },
  watch: {
    email(newVal) {
      localStorage.email = newVal;
    },
    valuelogin(newValuelogin) {
      if (newValuelogin === true) {
        localStorage.valuelogin = "1";
      } else {
        localStorage.valuelogin = "0";
        this.email = "";
      }
    }
  },
  methods: {
    focusInput(e) {
      if (this.$refs.email.focused || this.$refs.pass.focused) {
        this.enablefooter = false;
      } else {
        this.enablefooter = true;
      }
      if (this.email.length > 0) {
        this.email = this.email.toLowerCase();
        this.email = this.email.trim();
        console.log("focusInput -> this.email", this.email);
      }
    },
    async signIn() {
      const self = this;
      if (!(await this.$refs.formLogin.validate())) {
        return;
      }
      await self.$q.loading.show({
        spinnerColor: "primary",
        messageColor: "primary",
        backgroundColor: "white",
        message: "Conectando"
      });
      self.$Auth
        .signIn({
          username: self.email,
          password: self.password
        })
        .then(user => {
          console.log("🚀 - signIn - user", user);
          self.$q.loading.hide();
          self.$store.commit("login/setSubID", user.attributes.sub);
          self.$store.commit("login/setUserVerify", self.email);
          self.$store.commit("login/setVerify", true);
          self.$store.commit("login/setRegister", true);
          localStorage.register = "true";
          localStorage.SubID = user.attributes.sub;
          this.$router.push("/home");
        })
        .catch(err => {
          self.$store.commit("login/setSubID", "");
          console.log("signIn -> err", err.code);
          self.$q.loading.hide();
          if (err.code === "NotAuthorizedException") {
            if (err.message === "User is disabled.") {
              localStorage.register = "false";
              return self.$q.dialog({
                title: "Alerta!",
                message: "Usuario Bloqueado",
                ok: {
                  push: true,
                  color: "negative"
                },
                persistent: true
              });
            } else {
              localStorage.register = "false";
              return self.$q.dialog({
                title: "Alerta!",
                message: "Usuario / Contraseña Invalidos",
                ok: {
                  push: true,
                  color: "negative"
                },
                persistent: true
              });
            }
          }
          if (err.code === "UserNotConfirmedException") {
            localStorage.register = "false";
            self.$store.commit("login/setUserVerify", self.email);
            self.$store.commit("login/setVerify", true);
            this.$router.push("/verificacion");
          }
          if (err.code === "UserNotFoundException") {
            localStorage.register = "false";
            self.$q.dialog({
              title: "Alerta!",
              message: "Usuario NO existe",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
            this.$router.push("/registro");
          }
        });
    },
    menuPass() {
      this.$store.commit("user/setdialogMenuPass", true);
    },
    onReset() {}
  }
};
</script>

<style lang="sass" scoped>
.bg-image
    background-image: url(https://i.pinimg.com/originals/c2/ea/c0/c2eac03478c2aa0fa8178b5f233690c6.jpg)
    background-repeat: no-repeat
    background-size: auto;

.title1
    color: #1d1d1b
    text-align: center
    font-size: 32px
    font-weight: 400
    position: relative
    margin-top: 20px
    width: 100%;
    height: 100%;

.form1
    // border: 1px solid #d0d0d0
    width: 100%;
    margin-left: 5px
    margin-right: 5px

.my-card
  margin: 0 auto;
  width: 100%
  max-width: 350px
</style>
