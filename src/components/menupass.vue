<template>
  <q-dialog v-model="dialogMenuPass" persistent :maximized="true">
    <q-card class="bg-white text-white">
      <q-bar class="bg-primary text-white">
        <q-btn
          flat
          icon="fal fa-arrow-left"
          @click="closeRegister"
          v-close-popup
        >
          <q-tooltip content-class="bg-white text-secondary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h8 text-blue text-center">
          Ingresa el correo electrónico registrado y te ayudamos a recuperar tu
          contraseña
        </div>
      </q-card-section>
      <q-card class="my-card shadow-9" style="margin-top: 10px;">
        <q-card-section class="q-ma-none q-pt-none">
          <q-form @submit="enterfun('')" autofocus ref="form1">
            <q-input
              class="my-card"
              style="margin-top: 30px;"
              bottom-slots
              v-model="email"
              no-error-icon
              :rules="[
                $rules.required('Campo Obligatorio..'),
                $rules.email('Debe colocar un email valido..')
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
          </q-form>
          <div style="text-align: center; margin-top: 30px;">
            <q-btn
              style="width: 300px; height: 46px"
              align="center"
              class="glossy"
              rounded
              color="primary"
              label="Recuperar Contraseña"
              @click="forgotPassword"
            />
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <q-btn
              style="width: 300px; height: 46px"
              align="center"
              class="glossy"
              rounded
              color="primary"
              label="Ya tengo codigo de verificación"
              @click="yaTengo"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-card>
    <verifyPass />
  </q-dialog>
</template>

<script>
import verifyPass from "./verifyCodePass";

export default {
  name: "MenuPassComponent",
  components: {
    verifyPass
  },
  data() {
    return {
      email: "ftovar.evolution@gmail.com",
      verify: false
    };
  },
  computed: {
    dialogMenuPass() {
      return this.$store.state.user.dialogMenuPass;
    },
    datosPais() {
      return this.$store.state.user.datosPais;
    }
  },
  methods: {
    async closeRegister() {
      this.$store.commit("user/setdialogMenuPass", false);
    },
    async enterfun(arg) {
      console.log(arg);
      this.forgotPassword();
    },
    async yaTengo() {
      const self = this;
      if (!(await this.$refs.form1.validate())) {
        return;
      }
      console.log("paso");
      await self.$store.commit("user/setdialogVerify2", true);
      await self.$store.commit("user/setuserActive", null);
      await self.$store.commit("user/setuserActive", this.email);
      await self.$store.commit("user/settipoActive", true);
    },
    async forgotPassword() {
      const self = this;
      try {
        if (!(await this.$refs.form1.validate())) {
          return;
        }
        self.$q.loading.show({
          spinnerColor: "primary",
          messageColor: "primary",
          backgroundColor: "white",
          message: "Solicitando Datos"
        });

        const user = await self.$Auth.forgotPassword(self.email, {});
        await self.$q.loading.hide();
        //self.yaTengo();
        await self.$q
          .dialog({
            title: "Solicitud Enviada!",
            transitionShow: "slide-down",
            message:
              "A continuación se le enviara un codigo de verificación por email",
            ok: {
              push: true,
              color: "negative"
            },
            persistent: true
          })
          .onOk(() => {
            self.yaTengo();
          });
      } catch (e) {
        await self.$q.loading.hide();
        console.log(e);
        this.telefono = null;
        this.password1 = null;
        this.password2 = null;
        this.nombrecompleto = null;
        // await this.$refs.telefono.$el.focus();
        // await this.$refs.telefono.resetValidation();
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
          case "NotAuthorizedException":
            self.$q.dialog({
              title: "Alerta!",
              message: "El usuario ha sido deshabilitado.",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
            break;
          case "UsernameExistsException":
            self.$q.dialog({
              title: "Error",
              message: "Usuario ya existe",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });

            break;
          default:
            self.$q.dialog({
              title: e.code,
              message: e.message,
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
            break;
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  margin: 0 auto;
  width: 100%
  max-width: 350px
</style>
