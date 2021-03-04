<template>
  <div>
    <div
      class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-3 rounded-borders"
    >
      <q-icon class="q-ml-lg" size="lg" color="primary" name="fas fa-list" />
      <div class="text-h6 q-ml-lg">MOTIVOS</div>

      <q-space />

      <div>
        <q-btn
          @click="addmotivo"
          color="primary"
          icon="fas fa-plus-circle"
          label="Agregar Nuevo Motivo"
        />
      </div>
    </div>
    <q-card class="my-card">
      <q-card-section>
        <q-table
          :loading="loading"
          :grid="$q.screen.xs"
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :rows-per-page-options="[10]"
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
          <template v-slot:body-cell-action="props">
            <q-td key="tipo" :props="props" auto-width>
              <q-badge v-if="props.row.tipo == 'Grave'" color="negative">
                {{ props.row.tipo }}
              </q-badge>
              <q-badge v-if="props.row.tipo == 'Mala'" color="warning">
                {{ props.row.tipo }}
              </q-badge>
              <q-badge v-if="props.row.tipo == 'Regular'" color="info">
                {{ props.row.tipo }}
              </q-badge>
            </q-td>
            <q-td :props="props">
              <q-btn
                color="green"
                icon-right="fas fa-edit"
                no-caps
                flat
                dense
                @click="editmotivo(props.row)"
              />
              <q-btn
                color="negative"
                icon-right="fas fa-trash-alt"
                no-caps
                flat
                dense
                @click="deletemotivo(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <datosMotivos :datosActual="this.dataActualiza"></datosMotivos>
  </div>
</template>

<script>
const datosMotivos = () => import("./../components/datosMotivos");
import axios from "axios";

export default {
  name: "Motivos",
  components: {
    datosMotivos
  },
  data() {
    return {
      loading: false,
      filter: "",
      selected: [],
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
          name: "descripcion",
          align: "left",
          label: "Descripcion",
          field: "descrip",
          sortable: true
        },
        {
          name: "tipo",
          label: "Tipo",
          field: "action"
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
  computed: {
    reloadTable() {
      return this.$store.state.motivo.reloadTable;
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
  methods: {
    iniciar() {
      this.buscarmotivos();
    },
    buscarmotivos() {
      this.loading = true;
      this.data = [
        {
          id: "",
          descrip: "",
          tipo: ""
        }
      ];
      const apiGetText =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/generales/motivos/";
      axios
        .get(apiGetText)
        .then(response => {
          this.data = response.data;
          this.loading = false;
        })
        .catch((err, response) => {
          this.loading = false;
          console.log("#####", err);
        });
    },
    addmotivo() {
      this.$store.commit("motivo/setdialogModificando", false);
      this.$store.commit("motivo/setdialogVisible", true);
    },
    editmotivo(reg) {
      this.dataActualiza = reg;
      this.$store.commit("motivo/setdialogModificando", true);
      this.$store.commit("motivo/setdialogVisible", true);
    },
    deletemotivo(reg) {
      this.$q
        .dialog({
          title: "Eliminar",
          message: "Desea Eliminar este motivo?",
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
            "/api/generales/deleteMotivo/" +
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
