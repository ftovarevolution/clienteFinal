<template>
  <div class="flex  flex-center">
    <div class="full-width row justify-center items-start content-start">
      <div class="row" style="width:100%;">
        <div class="q-pa-md" style="max-width: 500px">
          <div class="q-gutter-md">
            <q-select
              style="width: 500px"
              rounded
              outlined
              v-model="empresa"
              :options="options"
              label="Empresa"
              @input="selectEmpresa"
            />
          </div>
        </div>
      </div>

      <div class="col self-center q-ma-xs ">
        <q-card
          bordered
          class="my-card bg-light-blue-1 shadow-24"
          style="width: 80%;"
        >
          <q-card-section>
            <div class="text-h6">Registros y Consultas x Año</div>
            <div>
              <apexchart
                ref="realtimeChart"
                width="80%"
                type="bar"
                :options="options2"
                :series="series2"
              ></apexchart>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import apexchart from "vue-apexcharts";
import axios from "axios";

export default {
  name: "PageIndex",
  components: {
    apexchart
  },
  data() {
    return {
      empresaActual: null,
      empresa: null,
      stringOptions: [],
      options: [],
      loading: false,
      options2: {
        plotOptions: {
          bar: {
            distributed: false
          }
        },
        dataLabels: {
          enabled: false
        },
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [
            "ENE",
            "FEB",
            "MAR",
            "ABR",
            "MAY",
            "JUN",
            "JUL",
            "AGO",
            "SEP",
            "OCT",
            "NOV",
            "DIC"
          ]
        }
      },
      series2: [
        {
          type: "column",
          name: "Consultas",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          type: "column",
          name: "Registros",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };
  },
  computed: {
    conectApi() {
      return this.$store.state.global.conectApi;
    },
    portApi() {
      return this.$store.state.global.Port;
    }
  },
  mounted() {
    this.generaEstadistica();
    this.activarEmpresas();
  },
  methods: {
    selectEmpresa(element) {
      this.empresaActual = element.value;
      this.generaEstadisticaEmpresa(this.empresaActual);
    },
    generaEstadisticaEmpresa(idBuscar) {
      this.loading = true;
      const apiGetText =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/generales/estadisticaEmpresa/'" +
        idBuscar +
        "'";
      axios
        .get(apiGetText)
        .then(response => {
          const prueba = this.series2;
          let rows = response.data;
          this.series2[0].data[0] = rows[0].ENE;
          this.series2[0].data[1] = rows[0].FEB;
          this.series2[0].data[2] = rows[0].MAR;
          this.series2[0].data[3] = rows[0].ABR;
          this.series2[0].data[4] = rows[0].MAY;
          this.series2[0].data[5] = rows[0].JUN;
          this.series2[0].data[6] = rows[0].JUL;
          this.series2[0].data[7] = rows[0].AGO;
          this.series2[0].data[8] = rows[0].SEP;
          this.series2[0].data[9] = rows[0].OCT;
          this.series2[0].data[10] = rows[0].NOV;
          this.series2[0].data[11] = rows[0].DIC;

          this.series2[1].data[0] = rows[1].ENE;
          this.series2[1].data[1] = rows[1].FEB;
          this.series2[1].data[2] = rows[1].MAR;
          this.series2[1].data[3] = rows[1].ABR;
          this.series2[1].data[4] = rows[1].MAY;
          this.series2[1].data[5] = rows[1].JUN;
          this.series2[1].data[6] = rows[1].JUL;
          this.series2[1].data[7] = rows[1].AGO;
          this.series2[1].data[8] = rows[1].SEP;
          this.series2[1].data[9] = rows[1].OCT;
          this.series2[1].data[10] = rows[1].NOV;
          this.series2[1].data[11] = rows[1].DIC;

          this.$refs.realtimeChart.updateSeries(
            [
              {
                data: this.series2[0].data
              },
              {
                data: this.series2[1].data
              }
            ],
            false,
            true
          );
          this.loading = false;
        })
        .catch((err, response) => {
          this.loading = false;
          console.log("#####", err);
        });
    },
    generaEstadistica() {
      this.loading = true;
      let apiGetText =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/generales/estadisticaGeneral/";
      axios
        .get(apiGetText)
        .then(response => {
          const prueba = this.series2;
          let rows = response.data;
          this.series2[0].data[0] = rows[0].ENE;
          this.series2[0].data[1] = rows[0].FEB;
          this.series2[0].data[2] = rows[0].MAR;
          this.series2[0].data[3] = rows[0].ABR;
          this.series2[0].data[4] = rows[0].MAY;
          this.series2[0].data[5] = rows[0].JUN;
          this.series2[0].data[6] = rows[0].JUL;
          this.series2[0].data[7] = rows[0].AGO;
          this.series2[0].data[8] = rows[0].SEP;
          this.series2[0].data[9] = rows[0].OCT;
          this.series2[0].data[10] = rows[0].NOV;
          this.series2[0].data[11] = rows[0].DIC;

          this.series2[1].data[0] = rows[1].ENE;
          this.series2[1].data[1] = rows[1].FEB;
          this.series2[1].data[2] = rows[1].MAR;
          this.series2[1].data[3] = rows[1].ABR;
          this.series2[1].data[4] = rows[1].MAY;
          this.series2[1].data[5] = rows[1].JUN;
          this.series2[1].data[6] = rows[1].JUL;
          this.series2[1].data[7] = rows[1].AGO;
          this.series2[1].data[8] = rows[1].SEP;
          this.series2[1].data[9] = rows[1].OCT;
          this.series2[1].data[10] = rows[1].NOV;
          this.series2[1].data[11] = rows[1].DIC;

          this.$refs.realtimeChart.updateSeries(
            [
              {
                data: this.series2[0].data
              },
              {
                data: this.series2[1].data
              }
            ],
            false,
            true
          );
          this.loading = false;
        })
        .catch((err, response) => {
          this.loading = false;
          console.log("#####", err);
        });
    },
    async activarEmpresas() {
      await axios
        .get(
          "http://" +
            this.conectApi +
            ":" +
            this.portApi +
            "/api/generales/empresasActivas"
        )
        .then(async response => {
          let rows = response.data;
          if (!rows.status) {
            this.data = rows;
            this.options = [];
            rows.forEach(element => {
              this.stringOptions.push(element.nombre);
              this.options.push({ label: element.nombre, value: element.id });
            });
            let nombreEmpresaActual = await this.obtenerjson(
              this.data,
              this.nEmpresa
            );
            this.model = nombreEmpresaActual;
          }
        })
        .catch((err, response) => {
          console.log("#####", err);
        });
    },
    obtenerjson(jsonUax, valor) {
      for (var i = 0; i < jsonUax.length; i++) {
        if (jsonUax[i].id == valor) {
          return jsonUax[i].nombre;
        }
      }
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  background-color: #0097a7
</style>
