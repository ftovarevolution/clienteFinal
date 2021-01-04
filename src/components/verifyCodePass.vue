<template>
  <q-dialog
    v-model="dialogVerify2"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-white text-white">
      <q-bar class="bg-primary text-white">
        <q-btn flat icon="fal fa-arrow-left" v-close-popup @click="closeLogin">
          <q-tooltip content-class="bg-white text-secondary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h5 text-primary text-center">
          Código de Confirmación
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h8 text-primary text-center">
          Le hemos enviado un email con el código de confirmación.
        </div>
        <div class="text-h8 text-primary text-center">
          Para completar la verifcación introduzca el código de 6 digitos.
        </div>
      </q-card-section>
      <q-card class="my-card shadow-9" style="margin-top: 10px;">
        <q-card-section class="q-ma-none q-pt-none">
          <q-form @submit="verifyCode" ref="form1">
            <vue-input-code
              span-size="20px"
              type="number"
              :number="6"
              height="50px"
              span-color="#3498db"
              input-color="#3498db"
              input-size="24px"
              :code="code"
            ></vue-input-code>
            <br />
            <q-input
              rounded
              standout="bg-grey-4 text-white"
              ref="pass1"
              v-model="password1"
              label="Nueva de Contraseña"
              no-error-icon
              lazy-rules
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                $rules.required('Campo Obligatorio..'),
                $rules.minLength(8, 'La contraseña debe ser mayor a 8 digitos')
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" size="sm" name="fal fa-lock-alt" />
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
            <q-input
              rounded
              standout="bg-grey-4 text-white"
              ref="pass2"
              v-model="password2"
              label="Verificación de Contraseña"
              no-error-icon
              lazy-rules
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                $rules.required('Campo Obligatorio..'),
                $rules.compare(password1, 'Ambas contraseñas deben ser iguales')
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" size="sm" name="fal fa-lock-alt" />
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
            <div style="text-align: center; margin-top: 30px;">
              <q-btn
                class="text-capitalize"
                style="width: 260px; height: 46px; font-size: 20px; "
                align="center"
                rounded
                color="red-10"
                @click="verifyCode"
              >
                <div style="margin-top: -7px;">
                  Continuar
                </div>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script>
import { SmsRetriever } from "@ionic-native/sms-retriever";

export default {
  name: "LoginComponent",
  props: {
    code: {
      type: Array,
      default: () => [],
      required: true
    },
    error: {
      type: Function,
      default: () => {}
    },
    customValidate: {
      type: Function,
      default: undefined
    },
    spanSize: {
      type: String,
      default: "20px"
    },
    spanColor: {
      type: String,
      default: "#f35252"
    },
    inputSize: {
      type: String,
      default: "20px"
    },
    inputColor: {
      type: String,
      default: "#000"
    },
    height: {
      type: String,
      default: "40px"
    },
    number: {
      type: Number,
      default: 6
    },
    type: {
      type: String,
      default: "number",
      validator: value => {
        return ["number", "text"].indexOf(value) > -1;
      }
    },
    upperCase: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      email: "",
      contrasena: "",
      password1: null,
      password2: null,
      isPwd: true
    };
  },
  computed: {
    dialogVerify2() {
      return this.$store.state.user.dialogVerify2;
    },
    userActive() {
      return this.$store.state.user.userActive;
    }
  },
  watch: {
    dialogVerify2(n, o) {
      if (n) {
        this.contrasena = null;
        this.password1 = null;
        this.password2 = null;
        SmsRetriever.startWatching()
          .then(res => {
            console.log(res);
            // var lastSix = res.Message.substr(res.Message.length - 6);
            this.contrasena = res.Message.substr(res.Message.length - 6);
            console.log("TCL: mounted -> this.contrasena", this.contrasena);
          })
          .catch(error => console.error(error));
      }
    },
    userActive(n, o) {
      if (n) {
        this.email = n;
      }
    }
  },
  methods: {
    async closeLogin() {
      console.log(this.$refs);
      this.$store.commit("user/setdialogVerify2", false);
    },
    async enterfun(e) {
      console.log(this.email);
      if (!this.email) {
        return;
      }
      console.log(e);
      this.$refs.contrasena.$el.focus();
    },
    async signOut() {
      try {
        await this.$Auth.signOut();
        this.$router.push("/login");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    },
    async verifyCode() {
      const self = this;
      try {
        if (!(await this.$refs.form1.validate())) {
          return;
        }
        if (self.code.length < 6) {
          self.$q.dialog({
            title: "Alerta!",
            message: "Debe completar el codigo de 6 digitos",
            ok: {
              push: true,
              color: "negative"
            },
            persistent: true
          });
          return;
        }
        self.contrasena =
          self.code[0] +
          self.code[1] +
          self.code[2] +
          self.code[3] +
          self.code[4] +
          self.code[5];

        await self.$q.loading.show({
          spinnerColor: "primary",
          messageColor: "primary",
          backgroundColor: "white",
          message: "Cambiando la Contraseña"
        });
        console.log("verifyCode -> self.email", self.email);
        await self.$Auth.forgotPasswordSubmit(
          self.email,
          self.contrasena,
          self.password1
        );
        await self.$q.loading.hide();
        this.$q.notify({
          message: "Tu contraseña fue cambiada con exito.",
          color: "success"
        });

        await this.$store.commit("user/setdialogVerify2", false);
        await this.$store.commit("user/setdialogVerify", false);
        await this.$store.commit("user/setdialogMenuPass", false);
        await self.$store.commit("user/setuserActive", null);
        await self.signOut();
        location.reload();
      } catch (e) {
        console.log("Error ---->", e);
        await self.$q.loading.hide();
        switch (e.code) {
          case "LimitExceededException":
            await self.$q.dialog({
              title: "Alerta!",
              message:
                "Se superó el límite de intentos. Inténtelo después de un tiempo.",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
            this.password = null;
            self.code = [];
            self.closeLogin();
            break;
          case "ExpiredCodeException":
            await self.$q.dialog({
              title: "Alerta!",
              message:
                "El código ha expirado, por favor solicite un código nuevo.",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
            this.password = null;
            self.code = [];
            self.closeLogin();
            break;
          case "CodeMismatchException":
            await self.$q.dialog({
              title: "Alerta!",
              message: "Código Invalido",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
            this.password = null;
            self.closeLogin();
            break;
          default:
            await self.$q.dialog({
              title: e.code,
              message: e.message,
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
            self.closeLogin();
            break;
        }
      }
    }
  }
};
</script>
<style lang="sass" scoped>
.swal2-container.swal2-center
  align-items: center
  z-index: 99999999

.my-special-class2
  font-size: 30px
  text-align: center
  font-weight: bold

.my-card
  margin: 0 auto
  width: 100%
  max-width: 350px
</style>
