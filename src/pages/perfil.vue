<template>
  <div>
    <div
      class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-3 rounded-borders"
      style="margin-top: 0px; padding: auto;"
    >
      <q-icon
        class="q-ml-lg"
        size="lg"
        color="primary"
        name="fas fa-users-cog"
      />
      <div class="text-h6 q-ml-lg">PERFIL</div>

      <q-space />
    </div>
    <q-card loading="loading" style="height: 100% ;width: 100%;">
      <q-card-section class="q-ma-xs q-pa-xs">
        <q-form
          class="q-gutter-sm caja-form q-ma-xs q-px-xl"
          ref="myFormEmpresas"
        >
          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Id:</div>
            </div>
            <div class="col-6">
              <q-input
                borderless
                disable
                v-model="nEmpresa"
                input-style="font-size: 20px;"
              >
              </q-input>
            </div>
          </div>

          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Nombre de la Empresa:</div>
            </div>
            <div class="col-6">
              <q-input
                outlined
                filled
                disable
                v-model="nomEmpresa"
                :rules="[$rules.required('Campo Obligatorio..')]"
              >
                <template v-slot:after>
                  <q-btn
                    size="22px"
                    color="grey"
                    icon="fad fa-industry"
                    style="margin-left: -10px"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Nombre de Contacto:</div>
            </div>
            <div class="col-6">
              <q-input
                outlined
                filled
                v-model="contacto"
                maxlength="50"
                :rules="[$rules.required('Campo Obligatorio..')]"
              >
                <template v-slot:after>
                  <q-btn
                    size="22px"
                    color="grey"
                    icon="fas fa-address-book"
                    style="margin-left: -10px"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Teléfono:</div>
            </div>
            <div class="col-6">
              <q-input
                outlined
                filled
                v-model="telefono"
                maxlength="50"
                mask="#### - ####"
                unmasked-value
                :rules="[$rules.required('Campo Obligatorio..')]"
              >
                <template v-slot:after>
                  <q-btn
                    size="22px"
                    color="grey"
                    icon="fas fa-phone"
                    style="margin-left: -10px"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Correo Electronico:</div>
            </div>
            <div class="col-6">
              <q-input
                outlined
                filled
                required
                validate
                bottom-slots
                v-model="email"
                type="email"
                :rules="[
                  $rules.required('Campo Obligatorio..'),
                  $rules.email('No es un email..')
                ]"
              >
                <template v-slot:after>
                  <q-btn
                    size="22px"
                    color="grey"
                    icon="fas fa-envelope"
                    style="margin-left: -10px"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <br />
      <div class="row items-center">
        <div class="col-1"></div>
        <div class="col-3">
          <q-btn
            color="green"
            icon="far fa-save"
            label="Guardar"
            @click="onSubmit"
            style="width: 250px;"
          />
        </div>
        <div class="col-3">
          <q-btn
            color="primary"
            icon="far fa-key"
            label="Cambiar Contraseña"
            @click="changepassword"
            style="width: 250px;"
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <q-space />
    </q-card>
    <cambiarPassword :datosActual="this.email" />
  </div>
</template>

<script>
const cambiarPassword = () => import("./../components/cambiarPassword");
import axios from "axios";

export default {
  name: "Empresas",
  components: {
    cambiarPassword
  },
  data() {
    return {
      loading: false,
      filter: "",
      selected: [],
      nomEmpresa: "",
      contacto: "",
      telefono: "",
      email: ""
    };
  },
  mounted() {
    this.loading = true;
    this.$q.loading.show();
    setTimeout(() => {
      this.iniciar();
      this.loading = false;
      this.$q.loading.hide();
    }, 1000);
  },
  computed: {
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
  watch: {
    nEmpresa(old, newdata) {
      if (old == true && newdata == false) {
        this.iniciar();
      }
    }
  },
  methods: {
    iniciar() {
      this.findCompany();
    },
    findCompany() {
      const codigoEmpresa = this.nEmpresa;
      this.loading = true;
      let getUrl =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/empresa/'" +
        codigoEmpresa +
        "'";
      axios
        .get(getUrl)
        .then(response => {
          let rows = response.data[0];
          if (rows.status) {
            this.loading = false;
          } else {
            this.nomEmpresa = rows.nombre;
            this.contacto = rows.contacto;
            this.telefono = rows.telefono;
            this.email = rows.email;
            this.loading = false;
          }
        })
        .catch((err, response) => {
          this.loading = false;
          console.log("#####", err);
        });
    },
    changepassword() {
      this.$store.commit("perfil/setdialogVisible", true);
    },
    onSubmit() {
      const codigoEmpresa = this.nEmpresa;
      this.loading = true;
      const xvariables = {
        id: codigoEmpresa,
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
          this.$q.notify({
            position: "bottom-right",
            message: "Datos guardados con exito.",
            color: "green"
          });
        })
        .catch((err, response) => {
          console.log("#####", err);
        });
    }
  }
};
</script>

<style scoped>
.zip-input input {
  /* margin-top: 20px;
  height: 20px;
  font-size: 12px; */
}
</style>
