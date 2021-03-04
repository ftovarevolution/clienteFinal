<template>
  <div>
    <div
      class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-3 rounded-borders"
    >
      <q-icon
        class="q-ml-lg"
        size="lg"
        color="primary"
        name="fad fa-print-search"
      />
      <div class="text-h6 q-ml-lg">ULTIMAS BUSQUEDAS</div>

      <q-space />

      <!-- <div>
        <q-btn
          to="/newRegistro"
          color="primary"
          icon="fas fa-plus-circle"
          label="Nueva Busqueda"
        />
      </div> -->
    </div>
    <q-card class="my-card">
      <q-card-section>
        <q-table
          :data="data"
          :columns="columns"
          :filter="filter"
          :rows-per-page-options="[10]"
          :loading="loading"
        >
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
          <template v-slot:top-left>
            <q-btn
              color="green"
              icon-right="fas fa-file-excel"
              label="Exportar to csv"
              no-caps
              @click="exportTable"
            />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { exportFile } from "quasar";
import moment from "moment";
import axios from "axios";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}
export default {
  name: "Empresas",
  data() {
    return {
      filter: "",
      loading: false,
      columns: [
        {
          name: "create_at",
          label: "Fecha",
          align: "center",
          field: "fecha",
          sortable: true
        },
        {
          name: "usuario",
          label: "Usuario",
          align: "center",
          field: "usuario"
        },
        {
          name: "ci",
          label: "Cédula Chofer",
          align: "center",
          field: "cedula"
        },
        {
          name: "nomChofer",
          label: "Nombre Chofer",
          align: "left",
          field: "nombre"
        }
      ],
      data: [
        {
          create_at: "19-11-2020",
          usuario: "Edwin Gonzalez",
          ci: "8-254-998",
          nomChofer: "Cristopher Batista"
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
    // this.stringOptions = [];
    this.iniciar();
  },

  methods: {
    iniciar() {
      this.buscarConsultas();
    },
    buscarConsultas() {
      this.loading = true;
      this.data = [
        {
          status: false,
          id: "",
          name: ""
        }
      ];
      const apiGetText =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/registros/consultasEmpresa/" +
        this.nEmpresa;
      axios
        .get(apiGetText)
        .then(response => {
          let rows = response.data;
          rows.forEach(element => {
            let day = element.fecha.substr(8, 2);
            let month = element.fecha.substr(5, 2);
            let year = element.fecha.substr(0, 4);
            let hour = parseFloat(element.fecha.substr(11, 2)) - 5;
            let min = element.fecha.substr(14, 2);

            let datof = day + "-" + month + "-" + year + " " + hour + ":" + min;

            element.fecha = datof;
          });

          this.data = rows;
          this.loading = false;
        })
        .catch((err, response) => {
          this.loading = false;
          console.log("#####", err);
        });
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "El Navegador no permite descargar el archivo...",
          color: "negative",
          icon: "fas fa-exclamation-triangle"
        });
      }
    }
  }
};
</script>
