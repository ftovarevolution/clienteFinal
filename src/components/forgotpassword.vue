<template>
  <q-dialog
    v-model="dialogVisible"
    persistent
    @before-show="beforeOpen"
    @hide="closeDialog"
  >
    <q-card style="width: 700px; max-width: 80vw; ">
      <q-toolbar
        class="q-mt-sm q-mb-lg bg-dark text-white"
        style="margin-top: 0px"
      >
        <q-avatar square>
          <q-icon size="xl" name="fas fa-user-secret" />
        </q-avatar>
        <q-toolbar-title
          ><span v-if="this.dialogModificando == false" class="text-weight-bold"
            >Recuperar contraseña</span
          >
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
          ref="myFormUsuarios"
        >
          <q-input
            outlined
            filled
            v-model="nombre"
            label="### - ###"
            mask="### - ###"
            clearable
            @clear="nombre = ''"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-envelope-open-text" />
            </template>
          </q-input>
          <q-input
            outlined
            filled
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Contraseña"
            lazy-rules
            no-error-icon
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-lock-alt" />
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
            outlined
            filled
            v-model="password2"
            :type="isPwd ? 'password' : 'text'"
            label="Confirmar Contraseña"
            lazy-rules
            no-error-icon
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-lock-alt" />
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
  name: "myFormUsuarios",
  data() {
    return {
      nombre: "",
      telefono: "",
      email: "",
      password: "",
      password2: "",
      isPwd: true,
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
      return this.$store.state.login.dialogModificando;
    },
    dialogVisible() {
      return this.$store.state.login.dialogVisible;
    },
    conectApi() {
      return this.$store.state.global.conectApi;
    },
    portApi() {
      return this.$store.state.global.Port;
    },
    nEmpresa() {
      return this.$store.state.global.IdEmpresa;
    }
  },
  mounted() {
    const self = this;
  },
  methods: {
    resetForm() {
      this.nombre = "";
      this.telefono = "";
      this.email = "";
      this.password = "";
      this.password2 = "";
      this.$store.commit("login/setdialogVisible", false);
    },
    onSubmit(data) {
      this.$refs.myFormUsuarios.validate().then(success => {
        if (success) {
          if (this.password != this.password2) {
            this.$q.notify({
              position: "bottom-right",
              message: "La contraseña no coincide con la verificación.",
              color: "negative"
            });
            this.password = "";
            this.password2 = "";
            this.$refs.myFormUsuarios.validate();
            return;
          } else {
            this.loading = true;
            const xvariables = {
              codigo: this.nombre,
              email: this.datosActual,
              password: this.password,
              password2: this.password2
            };
            let urlConsulta =
              "http://" +
              this.conectApi +
              ":" +
              this.portApi +
              "/api/auth/updatePassword";
            axios
              .post(urlConsulta, xvariables)
              .then(response => {
                let rows = response.data;
                this.loading = false;
                console.log(
                  "🚀 - this.$refs.myFormUsuarios.validate - rows",
                  rows
                );
                if (rows.message == "register Update") {
                  this.$q.notify({
                    position: "top-right",
                    message: "Se ha cambiado su password de forma correcta.",
                    color: "green"
                  });
                  this.resetForm();
                } else {
                  this.$q.notify({
                    position: "top-right",
                    message: "El código es incorrecto o ha vencido.",
                    color: "negative"
                  });
                  return;
                }
              })
              .catch((err, response) => {
                console.log("#####", err);
              });
          }
        }
      });
    },
    closeDialog() {
      if (!this.cancel) {
        this.$store.commit("empresa/setreloadTable", true);
        this.cancel = true;
      }
    },
    beforeOpen() {
      if (this.dialogModificando) {
        this.nombre = this.datosActual.nombre;
        this.telefono = this.datosActual.telefono;
        this.email = this.datosActual.email;
      }
    }
  }
};
</script>

<style></style>
