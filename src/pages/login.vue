<template>
  <q-page-container>
    <q-page
      class="flex flex-center page-login justify-start items-start content-start"
    >
      <q-toolbar class="bg-white text-primary">
        <q-btn to="/" flat round icon="fal fa-arrow-left" />
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
      <div class="title1">
        Iniciar Sesión
      </div>
      <q-form @submit="signIn" @reset="onReset" class="form1" ref="formLogin">
        <q-card class="my-card shadow-9" style="margin-top: 10px;">
          <q-card-section>
            <q-input
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
              label="Correo electrónico"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="fal fa-envelope" />
              </template>
              <template v-slot:append>
                <q-btn
                  flat
                  color="primary"
                  icon="fal fa-times"
                  class="cursor-pointer q-mr-sm"
                  @click="email = ''"
                  no-error-icon
                  style="width: 36px;"
                />
              </template>
            </q-input>
            <q-input
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
                <q-icon color="primary" name="fal fa-lock-alt" />
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
            <q-toggle
              v-model="valuelogin"
              color="green"
              label="Mantenerme conectado"
            />
          </q-card-section>
          <q-card-section style="text-align: center;">
            <q-btn
              class="text-weight-light text-center"
              flat
              size="md"
              text-color="primary"
              color="primary"
              no-caps
              @click="menuPass"
              label="He olvidado mi contraseña"
            />
          </q-card-section>
        </q-card>
        <div style="text-align: center; margin-top: 30px;">
          <q-btn
            style="width: 260px; height: 36px"
            align="center"
            class="glossy"
            rounded
            color="primary"
            label="Iniciar"
            @click="signIn"
          />
        </div>
      </q-form>
      <MenuPass></MenuPass>
      <q-footer v-if="enablefooter" reveal class="bg-white text-primary">
        <div style="text-align: center; margin-bottom: 16px;">
          <a style="color: grey;"
            >Al continuar aceptas nuestros
            <router-link to="">Términos y Condiciones</router-link>
          </a>
        </div>
      </q-footer>
    </q-page>
  </q-page-container>
</template>

<script>
const MenuPass = () =>
  import(/*webpackChunkName: "MenuPass" */ "./../components/menupass");
export default {
  components: {
    MenuPass
  },
  data() {
    return {
      enablefooter: true,
      valuelogin: null,
      password: "",
      isPwd: true,
      name: "",
      email: "",
      // password: "123456789",
      // name: "Franklin",
      // email: "ftovar.evolution@gmail.com",
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
      }
    } else {
    }
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
          self.$q.loading.hide();
          self.$store.commit("login/setUserVerify", self.email);
          self.$store.commit("login/setVerify", true);
          self.$store.commit("login/setRegister", true);
          localStorage.register = "true";
          this.$router.push("/home");
        })
        .catch(err => {
          console.log("signIn -> err", err.code);
          const self = this;
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
    text-align: center
    font-size: 32px
    font-weight: 600
    position: relative
    margin-top: 0px
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
