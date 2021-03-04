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
        name="fad fa-users-slash"
      />
      <div class="text-h6 q-ml-lg">CONSULTAR CHOFER</div>
      <q-space />
    </div>
    <q-form class="q-gutter-sm caja-form q-ma-xs q-px-xl" ref="formRegistro">
      <div class="row items-center">
        <div class="col-1" style="margin-left: 25px">
          <div class="text-subtitle1 q-ml-lg" style="margin-left: 30px">
            Cédula:
          </div>
        </div>
        <div class="col-4 q-pr-md">
          <q-input
            ref="idcedula"
            @keydown.enter.prevent="iniciar"
            :disable="!desabilitado"
            @keypress="keypress"
            @blur="validaMayuscula('ci')"
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
        <div class="col-2">
          <q-btn
            :disable="desabilitado"
            color="primary"
            icon="fad fa-undo-alt"
            label="Nueva Busqueda"
            @click="resetForm"
            style="width: 200px; margin-top: -20px;"
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Enviando...
            </template></q-btn
          >
        </div>
        <div class="col-1">
          <q-btn
            :disable="desabilitado"
            color="green"
            icon="fad fa-users-slash"
            label="Reportar Evento"
            @click="addEvento"
            style="width: 200px; ; margin-top: -20px;"
          />
        </div>
      </div>
    </q-form>
    <q-card class="my-card" style="height: 72vh;">
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
                    disable
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
                    disable
                    padding="8px 5px"
                    color="grey"
                    icon="fad fa-phone"
                    style="margin-left: -8px; width: 40px;"
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
      <div class="q-gutter-sm" style="margin-top: -10px; padding: auto;">
        <q-radio
          @input="findDriver"
          :disable="desabilitado"
          keep-color
          v-model="tipoConsulta"
          val="rep"
          label="Registros"
          color="primary"
        />
        <q-radio
          @input="findDriver"
          :disable="desabilitado"
          keep-color
          v-model="tipoConsulta"
          val="con"
          label="Consultas"
          color="primary"
        />
      </div>
      <q-table
        class="my-sticky-header-table"
        style="height: 320px;"
        :loading="loading"
        dense
        flat
        bordered
        :data="data"
        :pagination.sync="pagination"
        :columns="columns"
        row-key="iditem"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              v-if="dataYes"
              color="primary"
              icon-right="fad fa-search"
              no-caps
              flat
              dense
              @click="verObservacion(props.row)"
            />
          </q-td>
        </template>
      </q-table>
      <q-separator />
      <br />
      <div class="row items-center">
        <div class="col-2" style="margin-left: 15px">
          <q-btn
            :disable="desabilitado"
            color="primary"
            icon="fad fa-undo-alt"
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
            @click="addEvento"
            style="width: 250px;"
          />
        </div>
      </div>
      <br />
    </q-card>
    <registraEvento :cedulaActual="this.ci" />
    <registraChofer :cedulaActual="this.ci" />
  </div>
</template>

<script>
const registraEvento = () => import("./../components/registraEvento");
const registraChofer = () => import("./../components/registraChofer");
import axios from "axios";
import moment from "moment";

export default {
  name: "frmConsultas",
  components: {
    registraEvento,
    registraChofer
  },
  data() {
    return {
      tipoConsulta: "rep",
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 6
      },
      dataYes: false,
      loading: false,
      desabilitado: true,
      driverReady: false,
      name: "",
      lastname: "",
      phone: "",
      ci: "",
      model: null,
      columns: [
        {
          style: "max-width: 50px",
          name: "fecha",
          align: "center",
          label: "Fecha",
          field: "fecha",
          sortable: true
        },
        {
          style: "max-width: 50px",
          name: "empresa",
          label: "Empresa",
          field: "reportado_por"
        },
        {
          style: "max-width: 200px",
          name: "motivo",
          label: "Motivo",
          field: "descripcion",
          align: "center"
        },
        {
          style: "max-width: 200px",
          name: "descripcion",
          required: true,
          label: "Descripción",
          align: "left",
          field: "observacion",
          format: val => `${val}`
        },
        { name: "action", label: "", field: "action" }
      ],
      data: [{ fecha: "", reportado_por: "", descripcion: "", observacion: "" }]
    };
  },
  computed: {
    reloadTable() {
      return this.$store.state.consultaChofer.reloadTable;
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
  watch: {
    reloadTable(old, newdata) {
      if (old == true && newdata == false) {
        this.iniciar();
      }
    }
  },
  mounted() {
    const self = this;
    this.$refs.idcedula.focus();
  },
  methods: {
    validaMayuscula(valida) {
      switch (valida) {
        case "ci":
          this.ci = this.ci.toUpperCase();
          break;

        default:
          break;
      }
    },
    iniciar() {
      this.$refs.idcedula.focus();
      this.findDriver();
    },
    verObservacion(row) {
      this.$q
        .dialog({
          title: "Observación",
          message: row.observacionCompleta
        })
        .onOk(() => {
          // console.log('OK')
        });
    },
    keypress(key) {
      if (key.keyCode < 48 || key.keyCode > 57) {
        if (
          key.keyCode != 45 &&
          key.keyCode != 78 &&
          key.keyCode != 80 &&
          key.keyCode != 69 &&
          key.keyCode != 110 &&
          key.keyCode != 112 &&
          key.keyCode != 101
        ) {
          key.preventDefault();
        }
      }
    },
    findDriver() {
      this.$store.commit("consultaChofer/setreloadTable", false);
      this.$refs.formRegistro.validate().then(success => {
        if (success) {
          const codigoEmpresa = this.nEmpresa;
          let cedulaUtilizar = this.ci;
          // cedulaUtilizar = cedulaUtilizar.split("-").join("");
          this.driverReady = false;
          this.loading = true;
          this.data = [
            { fecha: "", reportado_por: "", descripcion: "", observacion: "" }
          ];
          let getUrl = "";
          if (this.tipoConsulta == "rep") {
            getUrl =
              "http://" +
              this.conectApi +
              ":" +
              this.portApi +
              "/api/registros/" +
              this.$store.state.global.IdUsuario +
              "/" +
              cedulaUtilizar +
              "/" +
              codigoEmpresa;
            axios
              .get(getUrl)
              .then(response => {
                let rows = response.data[0];
                if (rows.status) {
                  this.dataYes = false;
                  this.loading = false;
                  this.buscaOperador(cedulaUtilizar);
                } else {
                  rows.forEach(element => {
                    let day = element.fecha.substr(8, 2);
                    let month = element.fecha.substr(5, 2);
                    let year = element.fecha.substr(0, 4);
                    let datof = day + "-" + month + "-" + year;
                    element.fecha = datof;
                    element.observacionCompleta = element.observacion.toUpperCase();
                    element.observacion = element.observacion
                      .substr(0, 50)
                      .toUpperCase();
                  });
                  this.desabilitado = false;
                  this.name = rows[0].nombre;
                  this.lastname = rows[0].apellido;
                  this.phone = rows[0].telefono;
                  this.driverReady = true;
                  this.data = rows;
                  this.dataYes = true;
                  this.loading = false;
                }
              })
              .catch((err, response) => {
                this.loading = false;
                console.log("#####", err);
                this.buscaOperador(cedulaUtilizar);
              });
          } else {
            this.dataYes = false;
            getUrl =
              "http://" +
              this.conectApi +
              ":" +
              this.portApi +
              "/api/consultas/" +
              cedulaUtilizar;
            axios
              .get(getUrl)
              .then(response => {
                let rows = response.data[0];
                rows.forEach(element => {
                  let day = element.fecha.substr(8, 2);
                  let month = element.fecha.substr(5, 2);
                  let year = element.fecha.substr(0, 4);
                  let hour = parseFloat(element.fecha.substr(11, 2)) - 5;
                  let min = element.fecha.substr(14, 2);

                  let datof =
                    day + "-" + month + "-" + year + " " + hour + ":" + min;

                  element.fecha = datof;
                });
                this.data = rows;
                this.loading = false;
              })
              .catch((err, response) => {
                this.loading = false;
                console.log("#####", err);
                this.buscaOperador(cedulaUtilizar);
              });
          }
          //
        }
      });
    },
    buscaOperador(ciLocal) {
      let cedulaUtilizar = ciLocal;
      cedulaUtilizar = cedulaUtilizar.split("-").join("");
      axios
        .get(
          "http://" +
            this.conectApi +
            ":" +
            this.portApi +
            "/api/opera/" +
            ciLocal
        )
        .then(response => {
          let rowsOpera = response.data;
          if (!rowsOpera.status) {
            this.desabilitado = false;
            this.name = rowsOpera[0].nombre;
            this.lastname = rowsOpera[0].apellido;
            this.phone = rowsOpera[0].tel_celular;
            this.driverReady = true;
          } else {
            this.$q
              .dialog({
                title: "No existe el Registro",
                message:
                  "El chofer no se encuentra registrado. ¿Desea Registrarlo?",
                cancel: true,
                persistent: true
              })
              .onOk(() => {
                let cedulaUtilizar = this.ci;
                cedulaUtilizar = cedulaUtilizar.split("-").join("");
                this.$store.commit("consultaChofer/setciOperador", ciLocal);
                this.$store.commit("consultaChofer/setdialogVisible2", true);
              })
              .onCancel(() => {
                this.resetForm();
              });
          }
        });
    },
    reportarChofer() {
      this.$router.push("/reportarChofer", () => {});
    },
    resetForm() {
      this.dataYes = false;
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
      this.tipoConsulta = "rep";
      this.data = [
        { fecha: "", reportado_por: "", descripcion: "", observacion: "" }
      ];
      setTimeout(() => {
        this.$refs.idcedula.focus();
        this.$refs.idcedula.focus();
      }, 500);
    },
    addEvento() {
      let cedulaUtilizar = this.ci;
      cedulaUtilizar = cedulaUtilizar.split("-").join("");
      this.$store.commit("consultaChofer/setdialogModificando", false);
      this.$store.commit("consultaChofer/setdialogVisible", true);
      this.$store.commit("consultaChofer/setciOperador", cedulaUtilizar);
      this.$store.commit("consultaChofer/setnomOperador", this.name);
      this.$store.commit("consultaChofer/setapeOperador", this.lastname);
      this.$store.commit("consultaChofer/settelOperador", this.phone);
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
