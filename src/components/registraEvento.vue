<template>
  <q-dialog
    v-model="dialogVisible"
    persistent
    @show="beforeOpen"
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
          ><span class="text-weight-bold">Registrar evento de chofer</span>
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
              <div class="text-subtitle1 q-ml-lg" style="margin-left: -15px;">
                Motivo:
              </div>
            </div>

            <div class="col-10">
              <q-select
                ref="motivoChofer"
                filled
                dense
                v-model="Motivo"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterFn"
                style="width: 100%; padding-bottom: 20px"
                :rules="[$rules.required('Campo Obligatorio..')]"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="row items-center">
            <div class="col-2">
              <div class="text-subtitle1 q-ml-lg" style="margin-left: -15px;">
                Comentario:
              </div>
            </div>
            <div class="col-10">
              <q-input
                v-model="descripcion"
                filled
                type="textarea"
                style="height: 100px"
              />
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
  name: "formRegistro",
  data() {
    return {
      loading: false,
      Motivo: null,
      descripcion: "",
      loadingGuardar: false,
      options: stringOptions,
      stringOptions: null,
      data: []
    };
  },
  props: {
    cedulaActual: null
  },
  mounted() {
    this.stringOptions = [];
    axios
      .get(
        "http://" +
          this.conectApi +
          ":" +
          this.portApi +
          "/api/generales/motivos"
      )
      .then(response => {
        let rows = response.data;
        if (!rows.status) {
          this.data = rows;
          rows.forEach(element => {
            this.stringOptions.push(element.descrip);
          });
        }
      })
      .catch((err, response) => {
        console.log("#####", err);
      });
  },
  computed: {
    dialogModificando() {
      return this.$store.state.consultaChofer.dialogModificando;
    },
    dialogVisible() {
      return this.$store.state.consultaChofer.dialogVisible;
    },
    conectApi() {
      return this.$store.state.global.conectApi;
    },
    portApi() {
      return this.$store.state.global.Port;
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("consultaChofer/setreloadTable", true);
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
      this.password = "";
      this.password2 = "";
      this.$store.commit("consultaChofer/setdialogVisible", false);
    },
    beforeOpen() {
      this.Motivo = "";
      this.descripcion = "";
    },
    async onSubmit() {
      this.loading = true;
      //buscando motivo en arreglo
      let xidsecret = await this.obtenerjson(this.data, this.Motivo);
      let cedulaUtilizar = this.$store.state.consultaChofer.ciOperador;
      cedulaUtilizar = cedulaUtilizar.split("-").join("");
      cedulaUtilizar = cedulaUtilizar.split("n").join("");
      cedulaUtilizar = cedulaUtilizar.split("p").join("");
      cedulaUtilizar = cedulaUtilizar.split("e").join("");
      cedulaUtilizar = cedulaUtilizar.split("N").join("");
      cedulaUtilizar = cedulaUtilizar.split("P").join("");
      cedulaUtilizar = cedulaUtilizar.split("E").join("");

      const xvariables = {
        id: xidsecret,
        observa: this.descripcion,
        user: this.$store.state.global.IdUsuario,
        cedula: cedulaUtilizar,
        name: this.$store.state.consultaChofer.nomOperador,
        lastname: this.$store.state.consultaChofer.apeOperador,
        reportado: this.$store.state.global.IdEmpresa,
        telefono: this.$store.state.consultaChofer.telOperador,
        cedula2: this.cedulaActual
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
          this.resetForm();
        })
        .catch((err, response) => {
          console.log("#####", err);
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
