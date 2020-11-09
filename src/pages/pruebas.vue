<!--<template>
  <q-page
    class="flex flex-center page-login justify-start items-start content-start"
  >
    <q-toolbar class="bg-white text-blue">
      <q-btn to="/registro" flat round icon="fal fa-arrow-left" />
      <q-toolbar-title> </q-toolbar-title>
    </q-toolbar>
    <div class="title1">
      Código de Confirmación
    </div>
    <div class="subtitle1">
      Le hemos enviado un email con el código de confrmación.
    </div>
    <div class="subtitle1">
      Para completar la verificación introduzca el código de 6 digitos.
    </div>

    <vue-input-code
      span-size="20px"
      type="number"
      :number="6"
      height="50px"
      span-color="#f35252"
      input-color="#3498db"
      input-size="24px"
      :code="code"
      :getinput="getInput"
      :success="success"
    ></vue-input-code>

    <div style="text-align: center; margin-top: 90px;">
      <q-btn
        style="width: 260px; height: 36px"
        align="center"
        class="glossy"
        rounded
        color="blue"
        label="Continuar"
        @click="onVerifyCode"
      />
    </div>

    <q-btn
      @click="enviaCodigo"
      flat
      style="color: blue; margin-top: 10px;"
      label="Enviar de nuevo el código"
    />

    <q-footer class="bg-white text-primary">
      <div style="text-align: center; margin-bottom: 16px;">
        <a style="color: grey;"
          >Nuestros
          <router-link to="/page1">Terminos y Condiciones</router-link>
        </a>
      </div>
    </q-footer>
  </q-page>
</template> -->

<script>
import VueInputCode from "vue-input-code";
import { Quasar, Notify, QSpace, Dialog } from "quasar";

export default {
  props: {
    code: {
      type: Array,
      default: () => [],
      required: true
    },
    success: {
      type: Function,
      default: () => {}
    },
    error: {
      type: Function,
      default: () => {}
    },
    customValidate: {
      type: Function,
      default: undefined
    },
    getInput: {
      type: Function,
      default: () => {}
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
      code: ""
    };
  },
  methods: {
    enviaCodigo() {
      this.$q.notify({
        message: "Se ha enviado de nuevo el código."
      });
    },
    onSubmit() {},
    onReset() {},
    onVerifyCode() {
      const self = this;
      if (!self.$refs.codigovalida.validate()) {
        return self.$q
          .dialog({
            title: "Error",
            message: "Datos Incorrectos..",
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
      self.$q.loading.show({
        spinnerColor: "white",
        messageColor: "white",
        backgroundColor: "primary",
        message: "Conectando"
      });
      self.$Auth
        .confirmSignUp(self.userVerify, self.codigo, {
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
              self.onClick();
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
    margin-right: 25px
    margin-left: 25px

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
