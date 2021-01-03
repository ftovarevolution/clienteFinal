<template>
  <q-page-container class="my-font">
    <q-page
      class="flex flex-center page-login justify-start items-start content-start"
    >
      <q-toolbar class="bg-white text-primary">
        <q-btn to="/" flat round icon="fal fa-arrow-left" />
        <q-toolbar-title> </q-toolbar-title>
        <q-btn to="/login" stretch flat label="iniciar sesión" />
      </q-toolbar>
      <div class="title1">
        Regístrate
      </div>
      <q-form @submit="signUp" class="form1" ref="form1">
        <q-card class="my-card shadow-9" style="margin-top: 10px;">
          <q-card-section>
            <q-input
              rounded
              standout="bg-grey-4 text-white"
              bottom-slots
              v-model="name"
              label="Nombre"
              lazy-rules
              no-error-icon
              :rules="[$rules.required('Campo Obligatorio..')]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="fal fa-user" />
              </template>
              <template v-slot:append>
                <q-btn
                  color="primary"
                  flat
                  icon="fal fa-times"
                  class="cursor-pointer q-mr-sm"
                  @click="name = ''"
                  style="width: 36px;"
                />
              </template>
            </q-input>
            <q-input
              rounded
              standout="bg-grey-4 text-white"
              bottom-slots
              v-model="email"
              no-error-icon
              lazy-rules
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
                  color="primary"
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
              rounded
              standout="bg-grey-4 text-white"
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              lazy-rules
              no-error-icon
              :rules="[
                $rules.required('Campo Obligatorio..'),
                $rules.minLength(8, 'La contraseña debe ser mayor a 8 digitos')
              ]"
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
                  color="primary"
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
          <q-btn
            class="text-capitalize"
            style="width: 260px; height: 46px; font-size: 23px; "
            align="center"
            rounded
            color="red-10"
            type="submit"
          >
            <div style="margin-top: -12px;">
              Regístrate
            </div>
          </q-btn>
        </div>
      </q-form>

      <q-footer class="bg-white text-primary">
        <div style="text-align: center; margin-bottom: 16px;">
          <a style="color: grey;"
            >Nuestros
            <router-link to="/page1">Términos y Condiciones</router-link>
          </a>
        </div>
      </q-footer>
    </q-page>
  </q-page-container>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  data() {
    return {
      isPwd: true,
      password: "",
      name: "",
      email: "",
      // password: "123456789",
      // name: "Franklin",
      // email: "ftovar.evolution@gmail.com",
      pass: ""
    };
  },
  mounted() {
    this.$q.loading.hide();
  },
  methods: {
    async signUp() {
      const self = this;

      if (!(await this.$refs.form1.validate())) {
        return;
      }
      await self.$q.loading.show({
        spinnerColor: "primary",
        messageColor: "primary",
        backgroundColor: "white",
        message: "Registrando Usuario"
      });
      let username = this.email;
      let name = this.name;
      let family_name = "";
      let password = this.password;
      let email = this.email;
      let locale = "GRUPOCLIENTE";
      Auth.signUp({
        password,
        username,
        attributes: {
          name,
          email,
          family_name,
          locale
        },
        validationData: [] //optional
      })
        .then(data => {
          console.log(data);
          this.$q.loading.hide();
          this.$store.commit("login/setVerify", false);
          this.$store.commit("login/setUserVerify", this.email);
          this.$router.push("/verificacion");
          this.$q.notify({
            message: "Se ha enviado un eMail a su cuenta.",
            color: "secondary"
          });
        })
        .catch(err => {
          console.log("TCL: signUP -> err", err.code);
          if (err.code == "UsernameExistsException") {
            this.$q.notify({
              message: "Usuario ya registrado",
              color: "red"
            });
            this.$router.push("/login");
          }
          this.$q.loading.hide();
        });
    }
  }
};
</script>

<style lang="sass" scoped>
// .bg-image
//     background-image: url(https://i.pinimg.com/originals/c2/ea/c0/c2eac03478c2aa0fa8178b5f233690c6.jpg)
//     background-repeat: no-repeat
//     background-size: auto;

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
