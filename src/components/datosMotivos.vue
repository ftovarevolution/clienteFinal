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
            >Registro de motivos</span
          >
          <span v-if="this.dialogModificando == true" class="text-weight-bold"
            >Editando datos de motivos</span
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
          ref="myFormmotivos"
        >
          <q-input
            ref="nommotivo"
            outlined
            filled
            v-model="nommotivo"
            label="Descripción del motivo"
            @blur="validaMayuscula('nommotivo')"
            @clear="nommotivo = ''"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
          </q-input>
          <!-- <q-select filled v-model="tipo" :options="options" label="Filled" /> -->
          <q-select
            filled
            v-model="tipo"
            :options="options"
            label="Tipo"
            color="teal"
            options-selected-class="text-deep-orange"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label dense v-html="scope.opt.label" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
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
      <q-inner-loading :showing="Loadingvisible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "myFormmotivos",
  data() {
    return {
      loading: false,
      options: [
        {
          label: '<span class="text-info">Regular</span>',
          value: "Regular",
          description: "Search engine",
          icon: "fas fa-hand-point-right"
        },
        {
          label: '<span class="text-warning">Mala</span>',
          value: "Mala",
          description: "Social media",
          icon: "fas fa-hand-point-right"
        },
        {
          label: '<span class="text-negative">Grave</span>',
          value: "Grave",
          description: "Quick updates",
          icon: "fas fa-hand-point-right"
        }
      ],
      nommotivo: "",
      tipo: "",
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
      return this.$store.state.motivo.dialogModificando;
    },
    dialogVisible() {
      return this.$store.state.motivo.dialogVisible;
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
    closeDialog() {
      if (!this.cancel) {
        this.$store.commit("motivo/setreloadTable", true);
        this.cancel = true;
      }
    },
    resetForm() {
      this.nommotivo = "";
      this.tipo = "";
      this.$store.commit("motivo/setdialogVisible", false);
    },
    onSubmit(data) {
      this.$refs.myFormmotivos.validate().then(success => {
        if (success) {
          this.loading = true;
          if (!this.dialogModificando) {
            const xvariables = {
              descripcion: this.nommotivo,
              tipo: this.tipo.value
            };
            let urlConsulta =
              "http://" +
              this.conectApi +
              ":" +
              this.portApi +
              "/api/generales/addMotivo";
            axios
              .post(urlConsulta, xvariables)
              .then(response => {
                setTimeout(() => {
                  this.loading = false;
                  this.$store.commit("motivo/setreloadTable", true);
                  this.resetForm();
                }, 1500);
              })
              .catch((err, response) => {
                console.log("#####", err);
              });
          } else {
            let tipoAux = "";
            if (this.tipo.value) {
              tipoAux = this.tipo.value;
            } else {
              tipoAux = this.tipo;
            }
            const xvariables = {
              id: this.datosActual.id,
              descripcion: this.nommotivo,
              tipo: tipoAux
            };
            let urlConsulta =
              "http://" +
              this.conectApi +
              ":" +
              this.portApi +
              "/api/generales/upDateMotivo";
            axios
              .post(urlConsulta, xvariables)
              .then(response => {
                let rows = response.data;
                setTimeout(() => {
                  this.loading = false;
                  this.$store.commit("motivo/setreloadTable", true);
                  this.resetForm();
                }, 1500);
              })
              .catch((err, response) => {
                console.log("#####", err);
                this.loading = false;
              });
          }
        }
      });
    },
    beforeOpen() {
      this.$store.commit("motivo/setreloadTable", false);
      if (this.dialogModificando) {
        this.nommotivo = this.datosActual.descrip;
        this.tipo = this.datosActual.tipo;
      }
    },
    validaMayuscula(valida) {
      switch (valida) {
        case "nommotivo":
          this.nommotivo = this.nommotivo.toUpperCase();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style></style>
