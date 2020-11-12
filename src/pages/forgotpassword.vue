<template>
  <q-page-container>
    <q-page
      class="flex flex-center page-login justify-start items-start content-start"
    >
      <q-toolbar class="bg-white text-blue">
        <q-btn to="/login" flat round icon="fal fa-arrow-left" />
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
      <div class="subtitle1">
        Ingresa el correo electrónico registrado y te ayudamos a recuperar tu
        contraseña.
      </div>

      <q-form
        @submit="forgotPassword"
        @reset="onReset"
        class="form1"
        ref="form1"
      >
        <q-input
          class="my-card"
          style="margin-top: 30px;"
          bottom-slots
          v-model="email"
          no-error-icon
          :rules="[
            $rules.required('Campo Obligatorio..'),
            $rules.email('Debe colocar un email valido.')
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
        <div style="text-align: center; margin-top: 30px;">
          <q-btn
            style="width: 260px; height: 36px"
            align="center"
            class="glossy"
            rounded
            color="blue"
            label="Continuar"
            type="submit"
          />
        </div>
      </q-form>
    </q-page>
  </q-page-container>
</template>

<script>
import { PincodeInput } from "vue-pincode-input";
import { Quasar, Notify, QSpace, Dialog } from "quasar";

export default {
  data() {
    return {
      //email: "ftovar.evolution@gmail.com"
      email: ""
    };
  },
  methods: {
    onSubmit() {
      this.$router.push("/verificapassword");
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
        self.$q.dialog({
          title: "Solicitud Enviada!",
          message:
            "A continuación se le enviara un codigo de verificación por SMS",
          ok: {
            push: true,
            color: "negative"
          },
          persistent: true
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
