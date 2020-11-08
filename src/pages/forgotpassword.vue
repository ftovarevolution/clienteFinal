<template>
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

    <q-form @submit="onSubmit" @reset="onReset" class="form1">
      <q-input
        class="my-card"
        style="margin-top: 30px;"
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
</template>

<script>
import { PincodeInput } from "vue-pincode-input";
import { Quasar, Notify, QSpace, Dialog } from "quasar";

export default {
  data() {
    return {
      email: "ftovar.evolution@gmail.com"
    };
  },
  methods: {
    onSubmit() {
      this.$router.push("/verificapassword");
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
