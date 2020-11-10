<template>
  <q-page-container>
    <q-page
      class="flex flex-center page-login justify-start items-start content-start"
    >
      <q-toolbar class="bg-white text-primary">
        <q-btn to="/registro" flat round icon="fal fa-arrow-left" />
        <q-toolbar-title>Código de Confirmación</q-toolbar-title>
      </q-toolbar>

      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-ma-xs q-ma-xs">
          <div class="subtitle1">
            Le hemos enviado un email con el código de confirmación.
          </div>
          <div class="subtitle1">
            Para completar la verificación introduzca el código de 6 digitos.
          </div>
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
          <q-card-section style="text-align: center;">
            <q-btn
              color="primary"
              flat
              @click="requestCode"
              label="Reenviar código"
            />
          </q-card-section>
          <div style="text-align: center; margin-top: 10px;">
            <q-btn
              style="width: 260px; height: 36px"
              align="center"
              class="glossy"
              rounded
              color="primary"
              label="Continuar"
              @click="onVerifyCode"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { Quasar, Notify, QSpace, Dialog } from "quasar";
export default {
  name: "Verify",
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
      shape: 0,
      codigo: null
    };
  },
  computed: {
    verifyCode() {
      return this.$store.state.login.verifyCode;
    },
    userVerify() {
      return this.$store.state.login.userVerify;
    }
  },
  methods: {
    getInput() {},
    requestCode() {
      const self = this;
      self.$Auth
        .resendSignUp(self.userVerify)
        .then(() => {
          return self.$q
            .dialog({
              title: "Aviso",
              message: "Nuevo codigo solicitado",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            })
            .onOk(() => {
              self.$refs.codigovalida.resetValidation();
              self.codigo = "";
              self.onClick();
            });
        })
        .catch(e => {
          // console.log(e);
          return self.$q.dialog({
            title: "Error",
            message: "Hubo un error en la solicitud del codigo",
            ok: {
              push: true,
              color: "positive"
            },
            persistent: true
          });
        });
    },
    onVerifyCode() {
      const self = this;
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
      if (!this.userVerify) {
        this.$router.push("/login");
        return;
      }

      const codeUnico =
        self.code[0] +
        self.code[1] +
        self.code[2] +
        self.code[3] +
        self.code[4] +
        self.code[5];
      console.log("onVerifyCode -> userVerify", this.userVerify);
      self.$q.loading.show({
        spinnerColor: "primary",
        messageColor: "primary",
        backgroundColor: "white",
        message: "Conectando"
      });

      self.$Auth
        .confirmSignUp(self.userVerify, codeUnico, {
          forceAliasCreation: true
        })
        .then(data => {
          self.$q.loading.hide();
          self.$q
            .dialog({
              title: "Aviso",
              message: "Usuario Confirmado",
              ok: {
                push: true,
                color: "positive"
              },
              persistent: true
            })
            .onOk(() => {
              this.$store.commit("login/setRegister", true);
              this.$store.commit("login/setVerify", true);
              this.$router.push("/home");
            });
        })
        .catch(err => {
          // console.log(err);
          self.$q.loading.hide();
          if (err.code === "CodeMismatchException") {
            return self.$q
              .dialog({
                title: "Error",
                message: "Codigo de Verificación Invalido",
                ok: {
                  push: true,
                  color: "negative"
                },
                persistent: true
              })
              .onOk(() => {
                self.$refs.codigovalida.resetValidation();
                self.codigo = "";
                self.$refs.codigovalida.focus();
              });
          }
          if (err.code === "ExpiredCodeException") {
            return self.$q
              .dialog({
                title: "Error",
                message: "Codigo vencido, Debe solicitar uno nuevo",
                ok: {
                  push: true,
                  color: "positive",
                  label: "Solicitar"
                },
                cancel: {
                  push: true,
                  color: "negative"
                },
                persistent: true
              })
              .onOk(() => {
                self.requestCode();
              })
              .onCancel(() => {
                // console.log("le dio click a cancelar");
              });
          }
        });
    },
    onClick() {
      this.codigo = null;
      this.shape = 0;
      this.$store.commit("login/setVerify", false);
      this.$store.commit("login/setUserVerify", null);
    }
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
    font-size: 28px
    font-weight: 600
    position: relative
    margin-top: 0px
    width: 100%;
    height: 100%;

.subtitle1
    text-align: center
    font-size: 14px
    color: grey
    position: relative
    margin-top: 10px
    width: 100%;
    height: 100%;

.input1
    margin-left: 10px
    max-width: 40px
    position: static

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
