<template>
  <q-dialog
    v-model="dialogVisible2"
    persistent
    @before-show="beforeOpen"
    @hide="closeDialog"
  >
    <q-card style="width: 100%; max-width: 50vw; ">
      <q-toolbar
        class="q-mt-sm q-mb-lg bg-dark text-white"
        style="margin-top: 0px"
      >
        <q-avatar square>
          <q-icon size="xl" name="fas fa-user-secret" />
        </q-avatar>
        <q-toolbar-title
          ><span class="text-weight-bold">Registrar Chofer</span>
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
          ref="formRegistro2"
        >
          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Cédula:</div>
            </div>
            <div class="col-9">
              <q-input
                disable
                ref="ciDriver"
                dense
                outlined
                filled
                v-model="ci"
                :rules="[$rules.required('Campo Obligatorio..')]"
              >
                <template v-slot:after>
                  <q-btn
                    padding="8px 5px"
                    color="grey"
                    icon="fas fa-signature"
                    style="margin-left: -8px"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Nombre:</div>
            </div>
            <div class="col-9">
              <q-input
                ref="nameDriver"
                @blur="validaMayuscula('name')"
                dense
                outlined
                filled
                v-model="name"
                :rules="[$rules.required('Campo Obligatorio..')]"
              >
                <template v-slot:after>
                  <q-btn
                    disable
                    padding="8px 5px"
                    color="grey"
                    icon="fas fa-signature"
                    style="margin-left: -8px"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Apellido:</div>
            </div>
            <div class="col-9">
              <q-input
                dense
                outlined
                filled
                @blur="validaMayuscula('lastname')"
                v-model="lastname"
                :rules="[$rules.required('Campo Obligatorio..')]"
              >
                <template v-slot:after>
                  <q-btn
                    disable
                    padding="8px 5px"
                    color="grey"
                    icon="fas fa-signature"
                    style="margin-left: -8px"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg">Teléfono:</div>
            </div>
            <div class="col-9">
              <q-input
                dense
                mask="#### - ####"
                label="#### - ####"
                outlined
                filled
                v-model="phone"
              >
                <template v-slot:after>
                  <q-btn
                    disable
                    padding="8px 5px"
                    color="grey"
                    icon="fad fa-phone"
                    style="margin-left: -8px"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-form>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            :loading="loading"
            color="primary"
            icon="far fa-save"
            label="Guardar"
            @click="onSubmit"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from "axios";

var stringOptions = null;
export default {
  name: "formRegistroChofer",
  data() {
    return {
      cancel: true,
      ci: "",
      name: "",
      lastname: "",
      phone: "",
      loading: false,
      Motivo: null,
      descripcion: "",
      loadingGuardar: false,
      options: stringOptions,
      stringOptions: null,
      data: []
    };
  },
  mounted() {
    this.stringOptions = [];
  },
  computed: {
    dialogModificando2() {
      return this.$store.state.consultaChofer.dialogModificando2;
    },
    dialogVisible2() {
      return this.$store.state.consultaChofer.dialogVisible2;
    },
    conectApi() {
      return this.$store.state.global.conectApi;
    },
    portApi() {
      return this.$store.state.global.Port;
    }
  },
  props: {
    cedulaActual: null
  },
  methods: {
    validaMayuscula(valida) {
      switch (valida) {
        case "name":
          this.name = this.name.toUpperCase();
          break;
        case "lastname":
          this.lastname = this.lastname.toUpperCase();
          break;

        default:
          break;
      }
    },

    closeDialog(e) {
      if (!this.cancel) {
        this.$store.commit("consultaChofer/setreloadTable", true);
        this.cancel = true;
      } else {
        this.$store.commit("consultaChofer/setreloadTable", true);
        //this.$store.commit("consultaChofer/setreloadTable", true);
      }
    },
    obtenerjson(jsonUax, valor) {
      for (var i = 0; i < jsonUax.length; i++) {
        if (jsonUax[i].descrip == valor) {
          return jsonUax[i].id;
        }
      }
    },
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    resetForm() {
      this.nombre = "";
      this.telefono = "";
      this.email = "";
      this.$store.commit("consultaChofer/setdialogVisible2", false);
    },
    beforeOpen() {
      this.name = "";
      this.lastname = "";
      this.phone = "";
      this.loading = false;
      this.ci = this.$store.state.consultaChofer.ciOperador;
      setTimeout(() => {
        this.$refs.nameDriver.focus();
        this.$refs.nameDriver.focus();
      }, 500);
    },
    async onSubmit() {
      //buscando motivo en arreglo formRegistro2
      this.$refs.formRegistro2.validate().then(success => {
        if (success) {
          this.loading = true;
          let xidsecret = 0;
          let cedulaUtilizar = this.ci;
          cedulaUtilizar = cedulaUtilizar.split("-").join("");
          cedulaUtilizar = cedulaUtilizar.split("n").join("");
          cedulaUtilizar = cedulaUtilizar.split("p").join("");
          cedulaUtilizar = cedulaUtilizar.split("e").join("");
          cedulaUtilizar = cedulaUtilizar.split("N").join("");
          cedulaUtilizar = cedulaUtilizar.split("P").join("");
          cedulaUtilizar = cedulaUtilizar.split("E").join("");
          const xvariables = {
            id: xidsecret,
            observa: "Registro Inicial de Chofer",
            user: "0",
            cedula: cedulaUtilizar,
            name: this.name,
            lastname: this.lastname,
            reportado: this.$store.state.global.IdEmpresa,
            telefono: this.phone,
            cedula2: this.ci
          };
          axios
            .post(
              "http://" +
                this.conectApi +
                ":" +
                this.portApi +
                "/api/registros/addsecret",
              xvariables
            )
            .then(response => {
              let rows = response.data;
              this.loading = false;
              this.cancel = false;
              this.resetForm();
            })
            .catch((err, response) => {
              console.log("#####", err);
            });
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 95%
  margin-left: 20px

.my-sticky-header-table
  //height or max-height is important
  height: 280px

  .q-table__top,
    thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
</style>
