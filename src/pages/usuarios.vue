<template>
  <div>
    <div
      class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-3 rounded-borders"
    >
      <q-icon class="q-ml-lg" size="lg" color="primary" name="fad fa-users" />
      <div class="text-h6 q-ml-lg">USUARIOS</div>

      <q-space />

      <div>
        <q-btn
          @click="addEmpresa"
          color="primary"
          icon="fas fa-plus-circle"
          label="Agregar Usuario"
        />
      </div>
    </div>
    <q-card class="my-card">
      <q-card-section>
        <q-table
          :grid="$q.screen.xs"
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :rows-per-page-options="[10]"
        >
          <template v-slot:top-left>
            <div class="q-pa-md" style="max-width: 500px">
              <div class="q-gutter-md">
                <q-select
                  style="width: 500px"
                  rounded
                  outlined
                  v-model="model"
                  :options="options"
                  label="Empresa"
                  @input="selectEmpresa"
                />
              </div>
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
              <q-btn
                color="green"
                icon-right="fas fa-edit"
                no-caps
                flat
                dense
                @click="editUsuario(props.row)"
              />
              <q-btn
                color="negative"
                icon-right="fas fa-trash-alt"
                no-caps
                flat
                dense
                @click="deleteUsuario(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <datosUsuarios
      :datosActual="this.dataActualiza"
      :idempresaActual="this.empresaActual"
    ></datosUsuarios>
  </div>
</template>

<script>
const datosUsuarios = () => import("./../components/datosUsuarios");
import axios from "axios";

export default {
  name: "Empresas",
  components: {
    datosUsuarios
  },
  data() {
    return {
      empresaActual: null,
      filter: "",
      selected2: true,
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
          name: "nombre",
          align: "left",
          label: "Nombre",
          field: "nombre",
          sortable: true
        },
        {
          name: "phone",
          align: "left",
          label: "Teléfono",
          field: "telefono"
        },
        { name: "email", align: "left", label: "eMail", field: "email" },
        { name: "action", label: "", field: "action" }
      ],
      data: [],
      model: null,
      stringOptions: [],
      options: []
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
  async mounted() {
    this.empresaActual = null;
    this.stringOptions = [];
    let rolesToken = null;
    let token = null;
    if (localStorage.token) {
      token = localStorage.token;
    }
    const xvariables = {
      token
    };
    let urlConsulta =
      "http://" + this.conectApi + ":" + this.portApi + "/api/auth/verifyAuth";
    await axios
      .post(urlConsulta, xvariables)
      .then(response => {
        rolesToken = response.data.roles;
        this.$store.commit("global/setIdEmpresa", response.data.idempresa);
        this.empresaActual = response.data.idempresa;
      })
      .catch((err, response) => {
        rolesToken = null;
      });
    if ((rolesToken = "ADM")) {
      this.activarEmpresas();
    }
    this.buscarUsuarios(this.empresaActual);
  },

  watch: {
    reloadTable(old, newdata) {
      if (old == true && newdata == false) {
        this.buscarUsuarios(this.empresaActual);
      }
    }
  },
  methods: {
    selectEmpresa(element) {
      this.empresaActual = element.value;
      this.buscarUsuarios(this.empresaActual);
    },
    async activarEmpresas() {
      await axios
        .get(
          "http://" +
            this.conectApi +
            ":" +
            this.portApi +
            "/api/generales/empresas"
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
    },
    buscarUsuarios(idBuscar) {
      if (idBuscar.length == 0) {
        this.data = [
          {
            status: true,
            id: "",
            nombre: "",
            phone: "",
            email: ""
          }
        ];
      } else {
        this.loading = true;
        this.data = [
          {
            status: true,
            id: "",
            nombre: "",
            phone: "",
            email: ""
          }
        ];
        const apiGetText =
          "http://" +
          this.conectApi +
          ":" +
          this.portApi +
          "/api/empresa/usuarios/'" +
          idBuscar +
          "'";
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
      }
    },
    addEmpresa() {
      this.$store.commit("perfil/setdialogModificando", false);
      this.$store.commit("perfil/setdialogVisible", true);
    },
    editUsuario(reg) {
      this.dataActualiza = reg;
      this.$store.commit("perfil/setdialogModificando", true);
      this.$store.commit("perfil/setdialogVisible", true);
    },
    deleteUsuario(reg) {
      this.$q
        .dialog({
          title: "Eliminar",
          message: "Desea Eliminar a este usuario?",
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
            "/api/empresa/deleteUsuario/" +
            reg.id;
          axios
            .delete(urlConsulta)
            .then(response => {
              let rows = response.data;
              this.buscarUsuarios(this.empresaActual);
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
