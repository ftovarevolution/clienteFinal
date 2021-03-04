<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card style="width: 700px; max-width: 80vw; ">
      <q-toolbar
        class="q-mt-sm q-mb-lg bg-dark text-white"
        style="margin-top: 0px"
      >
        <q-avatar square>
          <q-icon size="xl" name="fas fa-user-secret" />
        </q-avatar>
        <q-toolbar-title
          ><span class="text-weight-bold">Cambiar Contraseña</span>
        </q-toolbar-title>
        <q-btn
          color="negative"
          flat
          round
          dense
          icon="fas fa-times"
          @click="resetForm"
        />
      </q-toolbar>
      <q-card-section class="q-ma-xs q-pa-xs">
        <q-form
          class="q-gutter-sm caja-form q-ma-xs q-px-xl"
          ref="formCambioPassword"
        >
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
        </q-form>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            color="primary"
            icon="far fa-save"
            label="Guardar"
            @click="onSubmit"
          />
        </q-card-actions>
      </q-card-section>
      <q-inner-loading :showing="Loadingvisible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "formCambioPassword",
  data() {
    return {
      isPwd: true,
      password: "",
      password2: "",
      Loadingvisible: false,
      icon: false,
      bar: false,
      bar2: false,
      toolbar: true
    };
  },
  props: {
    datosActual: null
  },
  computed: {
    dialogModificando() {
      return this.$store.state.perfil.dialogModificando;
    },
    dialogVisible() {
      return this.$store.state.perfil.dialogVisible;
    },
    conectApi() {
      return this.$store.state.global.conectApi;
    },
    portApi() {
      return this.$store.state.global.Port;
    }
  },
  mounted() {
    const self = this;
  },
  methods: {
    resetForm() {
      this.password = "";
      this.password2 = "";
      this.$store.commit("perfil/setdialogVisible", false);
    },
    onSubmit(data) {
      this.$refs.formCambioPassword.validate().then(success => {
        if (success) {
          if (this.password != this.password2) {
            this.$q.notify({
              position: "bottom-right",
              message: "La contraseña no coincide con la verificación.",
              color: "negative"
            });
            return;
          } else {
            this.loading = true;
            const xvariables = {
              password: this.password,
              email: this.datosActual
            };
            let urlConsulta =
              "http://" +
              this.conectApi +
              ":" +
              this.portApi +
              "/api/empresa/upDateEmpresaPassword";
            axios
              .post(urlConsulta, xvariables)
              .then(response => {
                let rows = response.data;
                this.loading = false;
                this.$q.notify({
                  position: "bottom-right",
                  message: "Datos guardados con exito.",
                  color: "green"
                });
              })
              .catch((err, response) => {
                console.log("#####", err);
              });
            this.resetForm();
          }
        }
      });
    }
  }
};
</script>

<style></style>
