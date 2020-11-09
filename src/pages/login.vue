<template>
  <q-page-container>
    <q-page
      class="flex flex-center page-login justify-start items-start content-start"
    >
      <q-toolbar class="bg-white text-blue">
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
                <q-icon name="fal fa-envelope" />
              </template>
              <template v-slot:append>
                <q-btn
                  flat
                  icon="fal fa-times"
                  class="cursor-pointer q-mr-sm"
                  @click="email = ''"
                  no-error-icon
                  style="width: 36px;"
                />
              </template>
            </q-input>
            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              lazy-rules
              no-error-icon
              :rules="[$rules.required('Campo Obligatorio..')]"
            >
              <template v-slot:prepend>
                <q-icon name="fal fa-lock-alt" />
              </template>
              <template v-slot:append>
                <q-btn
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
          <router-link to="/forgotpassword"
            >Olvidaste tu contraseña?</router-link
          >
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <q-btn
            style="width: 260px; height: 36px"
            align="center"
            class="glossy"
            rounded
            color="blue"
            label="Iniciar"
            @click="signIn"
          />
        </div>
      </q-form>

      <q-footer class="bg-white text-primary">
        <div style="text-align: center; margin-bottom: 16px;">
          <a style="color: grey;"
            >Al continuar aceptas nuestros
            <router-link to="/page1">Terminos y Condiciones</router-link>
          </a>
        </div>
      </q-footer>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  data() {
    return {
      password: "123456789",
      isPwd: true,
      name: "Franklin",
      email: "ftovar.evolution@gmail.com",
      pass: ""
    };
  },
  methods: {
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
          this.$router.push("/home");
        })
        .catch(err => {
          console.log("signIn -> err", err.code);
          const self = this;
          self.$q.loading.hide();
          if (err.code === "NotAuthorizedException") {
            if (err.message === "User is disabled.") {
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
            self.$store.commit("login/setUserVerify", self.email);
            self.$store.commit("login/setVerify", true);
            this.$router.push("/verificacion");
          }
          if (err.code === "UserNotFoundException") {
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
