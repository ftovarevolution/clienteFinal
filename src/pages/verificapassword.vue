<template>
  <q-page
    class="flex flex-center page-login justify-start items-start content-start"
  >
    <q-toolbar class="bg-white text-blue">
      <q-btn to="/login" flat round icon="fal fa-arrow-left" />
      <q-toolbar-title> </q-toolbar-title>
    </q-toolbar>
    <div class="title1">
      Código de Confirmación
    </div>
    <div class="subtitle1">
      Le hemos enviado un email con el código de confirmación.
    </div>
    <div class="subtitle1">
      Para completar la verificación introduzca el código de 6 digitos.
    </div>
    <PincodeInput v-model="code" placeholder="0" />

    <q-form @submit="onSubmit" @reset="onReset" class="form1">
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
      <q-input
        v-model="password2"
        :type="isPwd ? 'password' : 'text'"
        label="Confirmar Contraseña"
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
          <router-link to="/page1">Términos y Condiciones</router-link>
        </a>
      </div>
    </q-footer>
  </q-page>
</template>

<script>
import { PincodeInput } from "vue-pincode-input";
import { Quasar, Notify, QSpace, Dialog } from "quasar";

export default {
  data() {
    return {
      code: "",
      password: "123",
      password2: "123",
      isPwd: true
    };
  },
  methods: {
    enviaCodigo() {
      this.$q.notify({
        message: "Se ha enviado de nuevo el código."
      });
    },
    onSubmit() {
      this.$router.push("/login");
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
    margin-left: 50px
    margin-right: 50px

.my-card
  margin: 0 auto;
  width: 100%
  max-width: 350px
</style>
