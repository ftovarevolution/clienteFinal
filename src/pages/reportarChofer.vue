<template>
  <div>
    <div
      class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-3 rounded-borders"
    >
      <q-icon
        class="q-ml-lg"
        size="lg"
        color="primary"
        name="fad fa-users-slash"
      />
      <div class="text-h6 q-ml-lg">REPORTAR CHOFER</div>
      <q-space />
    </div>
    <q-form class="q-gutter-sm caja-form q-ma-xs q-px-xl" ref="formRegistro">
      <div class="row items-center">
        <div class="col-1">
          <div class="text-subtitle1 q-ml-lg">Cédula:</div>
        </div>
        <div class="col-4">
          <q-input
            ref="idcedula"
            @keydown.enter.prevent="findDriver"
            :disable="!desabilitado"
            @keypress="keypress"
            dense
            outlined
            filled
            v-model="ci"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:after>
              <q-btn
                @click="findDriver"
                size="15px"
                color="grey"
                icon="fad fa-search"
                style="margin-left: 0px"
              />
            </template>
          </q-input>
        </div>
      </div>
    </q-form>
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Datos del Chofer</div>
      </q-card-section>
      <q-separator />
      <q-form class="q-gutter-sm caja-form q-ma-xs q-px-xl" ref="formRegistro2">
        <div class="row items-center">
          <div class="col-1">
            <div class="text-subtitle1 q-ml-lg">Nombre:</div>
          </div>
          <div class="col-4">
            <q-input
              :disable="desabilitado || driverReady"
              ref="nameDriver"
              dense
              outlined
              filled
              v-model="name"
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
          <div class="col-1">
            <div class="text-subtitle1 q-ml-lg">Apellido:</div>
          </div>
          <div class="col-4">
            <q-input
              :disable="desabilitado || driverReady"
              dense
              outlined
              filled
              v-model="lastname"
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
          <div class="col-1">
            <div class="text-subtitle1 q-ml-lg">Teléfono:</div>
          </div>
          <div class="col-4">
            <q-input
              :disable="desabilitado || driverReady"
              dense
              mask="#### - ####"
              label="#### - ####"
              outlined
              filled
              v-model="phone"
              :rules="[$rules.required('Campo Obligatorio..')]"
            >
              <template v-slot:after>
                <q-btn
                  padding="8px 5px"
                  color="grey"
                  icon="fad fa-phone"
                  style="margin-left: -8px"
                />
              </template>
            </q-input>
          </div>
          <div class="col-1">
            <div class="text-subtitle1 q-ml-lg">Motivo:</div>
          </div>
          <div class="col-4">
            <q-select
              ref="motivoChofer"
              :disable="desabilitado"
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
          <div class="col-1">
            <div class="text-subtitle1 q-ml-lg">Comentario:</div>
          </div>
          <div class="col-9">
            <q-input
              :disable="desabilitado"
              v-model="descripcion"
              filled
              type="textarea"
              style="height: 100px"
            />
          </div>
        </div>
      </q-form>
      <br />
      <q-separator />
      <q-table
        title="Registros del Chofer"
        class="my-sticky-header-table"
        :loading="loading"
        dense
        flat
        bordered
        :data="data"
        :columns="columns"
        row-key="iditem"
        :rows-per-page-options="[4]"
        @request="request"
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div>
              <q-badge color="purple" :label="props.value" />
            </div>
            <div class="my-table-details">
              {{ props.row.details }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="green"
              icon-right="fal fa-eye"
              no-caps
              flat
              dense
              @click="editEmpresa(props.row)"
            />
          </q-td>
        </template>
      </q-table>
      <q-separator />
      <br />
      <div class="row items-center">
        <div class="col-1" style="margin-left: 15px">
          <q-btn
            :disable="desabilitado"
            color="green"
            icon="far fa-save"
            :loading="loadingGuardar"
            label="Guardar"
            @click="sendData"
            style="width: 150px;"
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Enviando...
            </template></q-btn
          >
        </div>
        <div class="col-1" style="margin-left: 50px">
          <q-btn
            :disable="desabilitado"
            color="negative"
            icon="fad fa-window-close"
            label="Cancelar"
            @click="resetForm"
            style="width: 150px;"
          />
        </div>
      </div>
      <br />
    </q-card>
  </div>
</template>

<script>
var stringOptions = null;
export default {
  name: "formRegistro",
  data() {
    return {
      serverPagination: {
        page: 2,
        rowsNumber: 10
      },
      loading: false,
      desabilitado: true,
      driverReady: false,
      name: "",
      lastname: "",
      phone: "",
      ci: "",
      Motivo: "",
      descripcion: "",
      model: null,
      loadingGuardar: false,
      options: stringOptions,
      stringOptions: null,
      options2: [],
      columns: [
        {
          name: "fecha",
          align: "center",
          label: "Fecha",
          field: "createAt",
          sortable: true
        },
        { name: "empresa", label: "Empresa", field: "id", sortable: true },
        { name: "motivo", label: "Motivo", field: "name", align: "center" },
        {
          name: "descripcion",
          required: true,
          label: "Comentario",
          align: "left",
          field: "details",
          format: val => `${val}`,
          sortable: true
        },
        { name: "action", label: "", field: "action" }
      ],
      data: [],
      data2: []
    };
  },
  mounted() {
    this.stringOptions = [];
    this.options2.forEach(element => {
      this.stringOptions.push(element.descrip);
    });
    this.$refs.idcedula.focus();
  },
  beforeCreate() {},
  methods: {
    keypress(key) {
      if (key.keyCode < 48 || key.keyCode > 57) {
        if (key.keyCode != 45) {
          key.preventDefault();
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
    findDriver() {
      this.loading = true;
      this.driverReady = false;
      this.$refs.formRegistro.validate().then(success => {
        if (success) {
          if (this.ci != 2) {
            setTimeout(() => {
              this.loading = false;
            }, 1500);
          } else {
            this.desabilitado = false;
            this.name = "Pedro Gabriel";
            this.lastname = "Torres Casius";
            this.phone = "50768951122";
            this.driverReady = true;
            this.data = this.data2;
            // this.data = [];
            setTimeout(() => {
              // this.request({
              //   pagination: this.serverPagination,
              //   filter: this.filter
              // });
              this.loading = false;
            }, 2500);
          }
        }
      });
    },
    request({ pagination, filter }) {
      this.loading = true;
      this.data = this.data2;
      this.serverPagination = pagination;
      this.serverPagination.rowsNumber = 20;
      this.loading = false;
    },
    sendData() {
      this.loadingGuardar = true;
      setTimeout(() => {
        this.$q.notify({
          position: "bottom-right",
          message: "Datos guardados con exito.",
          color: "green"
        });
        this.resetForm();
        this.loadingGuardar = false;
      }, 2500);
    },
    resetForm() {
      this.name = "";
      this.lastname = "";
      this.phone = "";
      this.Motivo = "";
      this.descripcion = "";
      this.ci = "";
      this.$refs.formRegistro2.reset();
      this.$refs.formRegistro.reset();
      this.desabilitado = true;
      this.driverReady = false;
      setTimeout(() => {
        this.$refs.idcedula.focus();
        this.$refs.idcedula.focus();
      }, 500);
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
