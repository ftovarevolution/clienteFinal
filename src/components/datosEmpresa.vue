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
            >Registro de Empresa</span
          >
          <span v-if="this.dialogModificando == true" class="text-weight-bold"
            >Editando datos de Empresa</span
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
          ref="myFormEmpresas"
        >
          <q-input
            autofocus
            outlined
            filled
            v-model="nomEmpresa"
            @blur="validaMayuscula('nomEmpresa')"
            label="Nombre de la Empresa"
            clearable
            @clear="nomEmpresa = ''"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
          </q-input>

          <q-input
            outlined
            filled
            v-model="contacto"
            @blur="validaMayuscula('contacto')"
            label="Nombre de Contacto"
            clearable
            maxlength="50"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
          </q-input>
          <q-input
            outlined
            filled
            v-model="telefono"
            label="Teléfono #### - ####"
            clearable
            maxlength="50"
            mask="#### - ####"
            unmasked-value
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
          </q-input>

          <q-input
            outlined
            filled
            required
            validate
            bottom-slots
            v-model="email"
            label="Correo Electronico"
            type="email"
            clearable
            :rules="[
              $rules.required('Campo Obligatorio..'),
              $rules.email('No es un email..')
            ]"
          >
          </q-input>
        </q-form>
        <q-card-actions class="bg-white text-teal" style="margin-left: 60px;">
          <div class="row items-center">
            <div class="col-8">
              <q-btn
                color="primary"
                icon="far fa-save"
                label="Guardar"
                @click="onSubmit"
                style="width: 240px;"
              />
            </div>
            <div class="col-4">
              <q-btn
                color="green"
                icon="far fa-key"
                label="Cambiar Contraseña"
                @click="changepassword"
                style="width: 240px;"
              />
            </div>
          </div>
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
  name: "myFormEmpresas",
  data() {
    return {
      nomEmpresa: "",
      contacto: "",
      telefono: "",
      email: "",
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
      return this.$store.state.empresa.dialogModificando;
    },
    dialogVisible() {
      return this.$store.state.empresa.dialogVisible;
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
    async changepassword() {
      let data = this.email;
      const getUrl =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/mail/verifyMail/" +
        data;
      await axios
        .get(getUrl)
        .then(response => {
          this.enviaMail(data);
        })
        .catch(err => {
          console.log("#####", err);
        });
    },
    enviaMail(data) {
      // enviar email
      const getUrl =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/mail/sendMail/" +
        data;
      axios
        .get(getUrl)
        .then(response => {
          console.log("🚀 - forgotPassword - response", response);
          console.log("send email");
          this.$q.notify({
            position: "top-right",
            message: "Se ha enviado un email.",
            color: "green"
          });
          this.MostrarForgotPassword(data);
        })
        .catch(err => {
          console.log("#####", err);
          switch (err.response.status) {
            case 404:
              this.$q.notify({
                position: "top-right",
                message: "El email no esta registrado.",
                color: "negative"
              });
              break;

            default:
              break;
          }
        });
    },
    resetForm() {
      this.nomEmpresa = "";
      this.contacto = "";
      this.telefono = "";
      this.email = "";
      this.$store.commit("empresa/setdialogVisible", false);
    },
    onSubmit(data) {
      this.$refs.myFormEmpresas.validate().then(success => {
        if (success) {
          this.loading = true;
          if (!this.dialogModificando) {
            let xidsecret = 0;
            const xvariables = {
              nombre: this.nomEmpresa,
              contacto: this.contacto,
              telefono: this.telefono,
              email: this.email
            };
            let urlConsulta =
              "http://" +
              this.conectApi +
              ":" +
              this.portApi +
              "/api/generales/addEmpresa";
            axios
              .post(urlConsulta, xvariables)
              .then(response => {
                let rows = response.data;
                this.loading = false;
                this.resetForm();
              })
              .catch((err, response) => {
                console.log("#####", err);
              });
          } else {
            const xvariables = {
              id: this.datosActual.id,
              nombre: this.nomEmpresa,
              contacto: this.contacto,
              telefono: this.telefono,
              email: this.email
            };
            let urlConsulta =
              "http://" +
              this.conectApi +
              ":" +
              this.portApi +
              "/api/generales/upDateEmpresa";
            axios
              .post(urlConsulta, xvariables)
              .then(response => {
                let rows = response.data;
                this.loading = false;
                this.resetForm();
              })
              .catch((err, response) => {
                console.log("#####", err);
              });
          }
          this.resetForm();
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
        this.nomEmpresa = this.datosActual.nombre;
        this.contacto = this.datosActual.contacto;
        this.telefono = this.datosActual.telefono;
        this.email = this.datosActual.email;
      } else {
        this.nomEmpresa = "";
        this.contacto = "";
        this.telefono = "";
        this.email = "";
      }
    },
    validaMayuscula(valida) {
      switch (valida) {
        case "nomEmpresa":
          this.nomEmpresa = this.nomEmpresa.toUpperCase();
          break;
        case "contacto":
          this.contacto = this.contacto.toUpperCase();
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style></style>
