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
      <div class="text-h6 q-ml-lg">CONSULTAR CHOFER</div>
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
                @click="iniciar"
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
    <q-card class="my-card" style="height: 70vh;">
      <q-card-section
        class="bg-primary text-white"
        style="height: 35px; margin-top: 0px; padding-top:2px"
      >
        <div class="text-h6">Datos del Chofer</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form
          class="q-gutter-sm caja-form q-ma-xs q-px-xl"
          ref="formRegistro2"
        >
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
                outlined
                filled
                v-model="phone"
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
          </div>
        </q-form>
      </q-card-section>
      <q-card-section
        class="bg-light-blue-10 text-white"
        style="height: 35px; margin-top: 0px; padding-top:2px"
      >
        <div class="text-h6">Reportes del Chofer</div>
      </q-card-section>
      <br />
      <q-separator />
      <q-table
        class="my-sticky-header-table"
        style="height: 320px;"
        :loading="loading"
        dense
        flat
        bordered
        :data="data"
        :columns="columns"
        row-key="iditem"
        :pagination.sync="pagination"
        @request="onRequest"
      >
        <!-- <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="green"
              icon-right="fal fa-eye"
              no-caps
              flat
              dense
              @click="verObservacion(props.row)"
            />
          </q-td>
        </template> -->
      </q-table>
      <q-separator />
      <br />
      <div class="row items-center">
        <div class="col-2" style="margin-left: 15px">
          <q-btn
            :disable="desabilitado"
            color="primary"
            icon="fad fa-undo-alt"
            :loading="loadingGuardar"
            label="Nueva Busqueda"
            @click="resetForm"
            style="width: 250px;"
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
            color="green"
            icon="fad fa-users-slash"
            label="Reportar Evento"
            @click="reportarChofer"
            style="width: 250px;"
          />
        </div>
      </div>
      <br />
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "formRegistro",
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 6
        // rowsNumber: xx if getting data from a server
      },
      loading: false,
      desabilitado: true,
      driverReady: false,
      name: "",
      lastname: "",
      phone: "",
      ci: "85161171",
      model: null,
      loadingGuardar: false,
      columns: [
        {
          name: "fecha",
          align: "center",
          label: "Fecha",
          field: "fecha",
          sortable: true
        },
        {
          name: "empresa",
          label: "Empresa",
          field: "reportado_por",
          sortable: true
        },
        {
          name: "motivo",
          label: "Motivo",
          field: "descripcion",
          align: "center"
        },
        {
          name: "descripcion",
          required: true,
          label: "Descripción",
          align: "left",
          field: "observacion",
          format: val => `${val}`,
          sortable: true
        },
        { name: "action", label: "", field: "action" }
      ],
      data: []
    };
  },
  mounted() {
    // this.stringOptions = [];
    this.iniciar();
  },
  beforeCreate() {},
  methods: {
    iniciar() {
      this.$refs.idcedula.focus();
      this.findDriver();
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      });
    },
    verObservacion(row) {
      this.$q
        .dialog({
          title: "Observación",
          message: row.observacion
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    keypress(key) {
      if (key.keyCode < 48 || key.keyCode > 57) {
        if (key.keyCode != 45) {
          key.preventDefault();
        }
      }
    },
    onRequest(propsi) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      // const filter = props.filter
      // this.loading = true
      // // emulate server
      //   // update rowsCount with appropriate value
      //   this.pagination.rowsNumber = this.data.length
      //   // get all rows if "All" (0) is selected
      //   const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage
      //   // calculate starting row of data
      //   const startRow = (page - 1) * rowsPerPage
      //   // // fetch data from "server"
      //   // const returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)
      //   // // clear out existing data and add new
      //   // this.data.splice(0, this.data.length, ...returnedData)
      //   // don't forget to update local pagination object
      //   this.pagination.page = page
      //   this.pagination.rowsPerPage = rowsPerPage
      //   this.pagination.sortBy = sortBy
      //   this.pagination.descending = descending
      //   // ...and turn of loading indicator
    },
    // request(props) {
    //   const { page, rowsPerPage, sortBy, descending } = props.pagination;
    //   this.pagination.page = page;
    //   this.pagination.rowsPerPage = rowsPerPage;
    //   this.pagination.sortBy = sortBy;
    //   this.pagination.descending = descending;
    // },

    // filterFn(val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase();
    //     this.options = this.stringOptions.filter(
    //       v => v.toLowerCase().indexOf(needle) > -1
    //     );
    //   });
    // },

    setModel(val) {
      this.model = val;
    },
    findDriver() {
      this.$refs.formRegistro.validate().then(success => {
        if (success) {
          this.driverReady = false;
          this.loading = true;
          this.data = [];
          axios
            .get("http://localhost:3088/api/registros/" + this.ci)
            .then(response => {
              if (response.data.error) {
                this.loading = false;
              } else {
                let rows = response.data;
                rows.forEach(element => {
                  let day = element.fecha.substr(8, 2);
                  let month = element.fecha.substr(5, 2);
                  let year = element.fecha.substr(0, 4);
                  let datof = day + "-" + month + "-" + year;
                  element.fecha = datof;
                });
                this.desabilitado = false;
                this.name = rows[0].nombre;
                this.lastname = rows[0].apellido;
                this.phone = rows[0].telefono;
                this.driverReady = true;
                this.data = rows;
                this.loading = false;
              }
            })

            .catch(err => console.log(err));
        }
      });
    },
    reportarChofer() {
      this.$router.push("/reportarChofer", () => {});
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
      this.data = [];
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
