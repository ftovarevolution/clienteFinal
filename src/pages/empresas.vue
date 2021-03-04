<template>
  <div>
    <div
      class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-3 rounded-borders"
    >
      <q-icon class="q-ml-lg" size="lg" color="primary" name="fad fa-city" />
      <div class="text-h6 q-ml-lg">EMPRESAS</div>
      <q-space />
      <q-btn
        round
        @click="aplicaFiltro(activos)"
        color="green"
        icon="fad fa-sync"
        style="margin-right: 30px"
      />

      <div>
        <q-btn
          @click="addEmpresa"
          color="primary"
          icon="fas fa-plus-circle"
          label="Agregar Nueva Empresa"
        />
      </div>
    </div>
    <q-card class="my-card">
      <q-card-section>
        <q-table
          class="my-sticky-header-table"
          style="height: 75vh;"
          :loading="loading"
          :grid="$q.screen.xs"
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :rows-per-page-options="[10]"
        >
          <template v-slot:top-left>
            <div class="q-gutter-sm">
              <q-checkbox
                @input="aplicaFiltro"
                v-model="activos"
                label="Solo Activos"
              />
            </div>
          </template>
          <template v-slot:top-right>
            <q-input
              style="width: 400px;"
              rounded
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="fas fa-search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-toggle
                @input="cambiaEstatusEmpresa(props.row)"
                v-model="props.row.estado"
              />
              <q-btn
                color="green"
                icon-right="fas fa-edit"
                no-caps
                flat
                dense
                @click="editEmpresa(props.row)"
              />
              <q-btn
                color="negative"
                icon-right="fas fa-trash-alt"
                no-caps
                flat
                dense
                @click="deleteEmpresa(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <datosEmpresa :datosActual="this.dataActualiza"></datosEmpresa>
  </div>
</template>

<script>
const datosEmpresa = () => import("./../components/datosEmpresa");
import axios from "axios";

export default {
  name: "Empresas",
  components: {
    datosEmpresa
  },
  data() {
    return {
      activos: false,
      loading: false,
      filter: "",
      dataActualiza: [],
      columns: [
        {
          name: "id",
          label: "Código",
          align: "left",
          field: "id",
          sortable: true
        },
        {
          name: "nombre",
          align: "left",
          label: "Nombre",
          field: "nombre",
          sortable: true
        },
        {
          name: "representante",
          align: "left",
          label: "Representante",
          field: "contacto",
          sortable: true
        },
        { name: "phone", align: "left", label: "Teléfono", field: "telefono" },
        { name: "email", align: "left", label: "eMail", field: "email" },
        {
          name: "registros",
          align: "left",
          label: "Registros",
          field: "registros"
        },
        {
          name: "consultas",
          align: "left",
          label: "Consultas",
          field: "consultas"
        },
        { name: "action", label: "", field: "action" }
      ],
      data: [
        {
          estado: false,
          status: 0,
          id: "",
          nombre: "",
          contacto: "",
          telefono: "",
          email: ""
        }
      ]
    };
  },
  computed: {
    reloadTable() {
      return this.$store.state.empresa.reloadTable;
    },
    conectApi() {
      return this.$store.state.global.conectApi;
    },
    portApi() {
      return this.$store.state.global.Port;
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
    this.iniciar();
  },
  methods: {
    aplicaFiltro(value) {
      if (value) {
        this.buscarEmpresa(true);
      } else {
        this.buscarEmpresa(false);
      }
    },
    cambiaEstatusEmpresa(row) {
      let valor = 0;
      if (row.estado) {
        valor = 1;
      }
      const xvariables = {
        id: row.id,
        estatus: valor
      };
      let urlConsulta =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/generales/updateStatusEmpresa";
      axios
        .post(urlConsulta, xvariables)
        .then(response => {
          let rows = response.data;
        })
        .catch((err, response) => {
          console.log("#####", err);
        });
    },
    iniciar() {
      this.buscarEmpresa(false);
    },
    buscarEmpresa(aplicaFiltros) {
      this.loading = true;
      this.data = [
        {
          estado: false,
          status: false,
          id: "",
          name: "",
          representante: "",
          phone: "",
          email: ""
        }
      ];
      let apiGetText = "";
      if (aplicaFiltros) {
        apiGetText =
          "http://" +
          this.conectApi +
          ":" +
          this.portApi +
          "/api/generales/empresasActivas/";
      } else {
        apiGetText =
          "http://" +
          this.conectApi +
          ":" +
          this.portApi +
          "/api/generales/empresas/";
      }
      axios
        .get(apiGetText)
        .then(response => {
          let rows = response.data;
          rows.forEach(element => {
            if (element.estatus == 1) {
              element.estado = true;
            } else {
              element.estado = false;
            }
          });
          this.data = rows;
          this.loading = false;
        })
        .catch((err, response) => {
          this.loading = false;
          console.log("#####", err);
        });
    },
    addEmpresa() {
      this.$store.commit("empresa/setdialogModificando", false);
      this.$store.commit("empresa/setdialogVisible", true);
    },
    editEmpresa(reg) {
      this.dataActualiza = reg;
      this.$store.commit("empresa/setdialogModificando", true);
      this.$store.commit("empresa/setdialogVisible", true);
    },
    deleteEmpresa(reg) {
      this.$q
        .dialog({
          title: "Eliminar",
          message: "Desea Eliminar a esta empresa?",
          persistent: true,
          ok: {
            push: true
          },
          cancel: {
            push: true,
            color: "negative"
          }
        })
        .onOk(() => {
          let urlConsulta =
            "http://" +
            this.conectApi +
            ":" +
            this.portApi +
            "/api/generales/deleteEmpresa/" +
            reg.id;
          axios
            .delete(urlConsulta)
            .then(response => {
              let rows = response.data;
              this.iniciar();
            })
            .catch((err, response) => {
              console.log("#####", err);
            });
        })
        .onCancel(() => {
          //console.log(">>>> Cancel");
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
