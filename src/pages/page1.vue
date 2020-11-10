<template>
  <q-page
    class="flex flex-center justify-start items-start content-start my-page-login q-ma-none q-pa-sm"
  >
    <q-card class="bg-white text-white">
      <q-bar>
        <q-space />
        <q-btn flat color="primary" icon="far fa-window-close" to="/home">
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6 text-primary">Registrar Usuario</div>
      </q-card-section>

      <q-card-section class="q-ma-none q-pt-none">
        <q-form @submit="enterfun('nombrecompleto')" autofocus ref="form1">
          <q-input
            ref="telefono"
            bottom-slots
            v-model="telefono"
            mask="############"
            type="tel"
            label-color="primary"
            unmasked-value
            color="white"
            label="Telefono"
            clearable
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-phone-alt" size="sm" color="primary" />
            </template>
          </q-input>
        </q-form>
        <q-form @submit="enterfun('pass1')" ref="form2">
          <q-input
            ref="nombrecompleto"
            bottom-slots
            v-model="nombrecompleto"
            color="white"
            label-color="primary"
            label="Nombre Completo"
            clearable
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-user" size="sm" color="primary" />
            </template>
          </q-input>
        </q-form>
        <q-form @submit="enterfun('pass2')" ref="form3">
          <q-input
            ref="pass1"
            v-model="password1"
            label-color="primary"
            label="Contraseña"
            clearable
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-lock" color="primary" size="sm" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"
                size="sm"
                class="cursor-pointer q-mr-sm"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-form>
        <q-form @submit="enterfun('')" ref="form4">
          <q-input
            label-color="primary"
            ref="pass2"
            v-model="password2"
            label="Verificación de Contraseña"
            clearable
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              $rules.required('Campo Obligatorio..'),
              $rules.compare(password1, 'Ambas contraseñas deben ser iguales')
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-lock" color="primary" size="sm" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"
                size="sm"
                class="cursor-pointer q-mr-sm"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-toggle
            class="text-primary q-mb-lg"
            v-model="accept"
            label="Acepto los términos y condiciones como usuario de la aplicación."
          />

          <div class="self-center" style="text-align: center;">
            <q-btn
              class="self-center"
              label="Registrarme"
              type="button"
              @click="signUp"
              :disable="!accept"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { SmsRetriever } from "@ionic-native/sms-retriever";

export default {
  name: "RegisterComponent",
  data() {
    return {
      telefono: null,
      nombrecompleto: null,
      password1: null,
      password2: null,
      isPwd: true,
      accept: false
    };
  },
  computed: {},
  watch: {
    dialogRegister(n, o) {
      console.log("cambio");
      if (n) {
        this.telefono = null;
        this.contrasena = null;
      }
    }
  },
  methods: {
    verifyError(arg) {
      this.activo = arg;
    },
    async closeRegister() {
      this.$store.commit("user/setdialogRegister", false);
    },
    async enterfun(arg) {
      if (this.$refs[arg] === null) {
        return;
      }
      if (!arg) {
        this.signUp();
        return;
      }
      this.$refs[arg].$el.focus();
    },
    async signUp() {
      const self = this;

      if (!(await this.$refs.form1.validate())) {
        return;
      }
      if (!(await this.$refs.form2.validate())) {
        return;
      }
      if (!(await this.$refs.form3.validate())) {
        return;
      }
      if (!(await this.$refs.form4.validate())) {
        return;
      }

      await self.$q.loading.show({
        spinnerColor: "primary",
        messageColor: "primary",
        backgroundColor: "white",
        message: "Registrando Usuario"
      });

      await SmsRetriever.getAppHash()
        .then(async result => {
          const user = await self.$Auth.signUp({
            username:
              self.datosPais.codigoTelefono + this.telefono.replace("-", ""),
            password: this.password1,
            attributes: {
              name: this.nombrecompleto,
              picture: result
            }
          });
          await self.$q.loading.hide();
          await self.$store.commit("user/setdialogRegister", false);
          await self.$store.commit(
            "user/setuserActive",
            this.telefono.replace("-", "")
          );
          self.$q.dialog({
            title: "Usuario Registrado",
            message:
              "A continuación inicie sesión, cuando se le solicite inserte el código que ha llegado por SMS",
            ok: {
              push: true,
              color: "positive"
            },
            persistent: true
          });
          self.$router.push("/verifyCode");
        })
        .catch(e => {
          self.$q.loading.hide();
          console.log(e);
          this.telefono = null;
          this.password1 = null;
          this.password2 = null;
          this.nombrecompleto = null;
          this.$refs.telefono.$el.focus();
          this.$refs.telefono.resetValidation();
          this.$refs.pass1.resetValidation();
          this.$refs.pass2.resetValidation();
          this.$refs.nombrecompleto.resetValidation();

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
        });
    }
  }
};
</script>

<style></style>
