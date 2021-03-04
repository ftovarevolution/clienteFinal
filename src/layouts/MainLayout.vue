<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated>
      <q-toolbar style="background-color: grey">
        <q-btn
          flat
          dense
          round
          icon="fas fa-bars"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          OP Consultas
        </q-toolbar-title>

        <div>
          <q-btn
            flat
            round
            label="Logout..."
            aria-label="Menu"
            @click="Singout"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered dark>
      <q-card
        class="my-card text-white"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      >
        <div style="text-align: center">
          <q-img
            width="100px"
            src="./../statics/logo_secret.png"
            transition="jump-up"
            spinner-color="white"
            :ratio="1"
            class="q-ma-lg"
          />
        </div>
        <q-card-section style="margin-top: -30px">
          <div class="text-h6">{{ nEmpresa }}</div>
          <div class="text-subtitle2">Ultima Verificación: {{ fUltima }}</div>
        </q-card-section>
      </q-card>

      <q-list bordered class="rounded-borders">
        <q-item clickable v-ripple @click="btnHome">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-home" />
          </q-item-section>
          <q-item-section>INICIO</q-item-section>
        </q-item>
        <q-expansion-item
          v-model="link.expand"
          :header-style="{ backgroundColor: link.colormenu }"
          @show="show(link)"
          @hide="hide(link)"
          expand-separator
          :icon="link.icon"
          :label="link.title"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        >
          <q-item
            clickable
            v-ripple
            v-for="content in link.content"
            :key="content.title"
            v-bind="content"
            @click="selector(link, content)"
          >
            <q-item-section class="q-ml-lg">
              {{ content.title }}</q-item-section
            >
            <div v-if="content.selected">
              <q-icon size="md" name="fas fa-caret-left" />
            </div>
          </q-item>
        </q-expansion-item>
        <!-- <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fas fa-cogs" />
          </q-item-section>
          <q-item-section>CONFIGURAR</q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/icons/icon-96x96.png" />
          </q-avatar>
          {{ nEmpresa }} - CopyRight 2020
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
//import EssentialLink from "components/EssentialLink.vue";
import axios from "axios";

export default {
  name: "MainLayout",
  //components: { EssentialLink },
  data() {
    return {
      fUltima: "17-11-2020",
      leftDrawerOpen: false,
      essentialLinks: [
        {
          roles: "USE",
          title: "CONSULTAS Y REGISTROS",
          icon: "fad fa-file-search",
          expand: true,
          colormenu: "#1e1e1e",
          content: [
            // {
            //   title: "Reportar Chofe",
            //   icon: "fas fa-arrow-right",
            //   selected: false,
            //   link: "/reportarChofer"
            // },
            {
              roles: "USE",
              title: "Consultar Chofer",
              icon: "fas fa-arrow-right",
              selected: true,
              link: "/consultarChofer"
            }
            // {
            //   title: "Importar mi Lista",
            //   icon: "fas fa-arrow-right",
            //   selected: false,
            //   link: "/importar"
            // }
          ]
        },
        {
          roles: "USE",
          title: "MI CUENTA",
          icon: "fas fa-user-friends",
          colormenu: "#1e1e1e",
          expand: false,
          content: [
            {
              roles: "SUP",
              title: "Perfil",
              icon: "fas fa-arrow-right",
              selected: false,
              link: "/perfil"
            },
            {
              roles: "USE",
              title: "Ultimas Busquedas",
              icon: "fas fa-arrow-right",
              selected: false,
              link: "/historialBusqueda"
            },
            {
              roles: "USE",
              title: "Mis Registros",
              icon: "fas fa-arrow-right",
              selected: false,
              link: "/historialRegistro"
            }
          ]
        },
        {
          roles: "ADM",
          title: "GENERALES",
          icon: "fas fa-cogs",
          //link: "https://chat.quasar.dev",
          expand: false,
          colormenu: "#1e1e1e",
          content: [
            {
              roles: "ADM",
              title: "Empresas",
              icon: "fas fa-arrow-right",
              selected: false,
              link: "/empresas"
            },
            {
              roles: "ADM",
              title: "Usuarios",
              icon: "fas fa-arrow-right",
              selected: false,
              link: "/usuarios"
            },
            {
              roles: "ADM",
              title: "Motivos",
              icon: "fas fa-arrow-right",
              selected: false,
              link: "/motivos"
            },
            {
              roles: "ADM",
              title: "Estadisticas",
              icon: "fas fa-arrow-right",
              selected: false,
              link: "/inicio"
            }
          ]
        }
      ],
      conectApi: "",
      portApi: ""
    };
  },
  computed: {
    nEmpresa() {
      return this.$store.state.global.IdEmpresa;
    }
  },
  async mounted() {
    this.conectApi = this.$store.state.global.conectApi;
    this.portApi = this.$store.state.global.Port;
    let token = null;
    if (localStorage.token) {
      token = localStorage.token;
    }
    const xvariables = {
      token
    };
    let rolesToken = null;
    let urlConsulta =
      "http://" + this.conectApi + ":" + this.portApi + "/api/auth/verifyAuth";
    await axios
      .post(urlConsulta, xvariables)
      .then(response => {
        rolesToken = response.data.roles;
        this.$store.commit("global/setIdEmpresa", response.data.idempresa);
      })
      .catch((err, response) => {
        rolesToken = null;
      });

    for (var i = 0; i < this.essentialLinks.length; i++) {
      for (var e = 0; e < this.essentialLinks[i].content.length; e++) {
        switch (this.essentialLinks[i].content[e].roles) {
          case "ADM":
            if (rolesToken == "USE" || rolesToken == "SUP") {
              this.essentialLinks[i].content.splice(e, 1);
            }
            break;
          case "SUP":
            if (rolesToken == "USE") {
              this.essentialLinks[i].content.splice(e, 1);
            }
            break;

          default:
            break;
        }
      }

      switch (this.essentialLinks[i].roles) {
        case "ADM":
          if (rolesToken == "USE" || rolesToken == "SUP") {
            this.essentialLinks.splice(i, 1);
          }
          break;
        case "SUP":
          if (rolesToken == "USE") {
            this.essentialLinks.splice(i, 1);
          }
          break;

        default:
          break;
      }
    }
  },
  methods: {
    Singout() {
      localStorage.token = null;
      this.$router.push("/login", () => {});
    },
    show(e) {
      const self = this;
      self.essentialLinks.forEach(element => {
        element.expand = false;
      });
      e.colormenu = "#3d3d3d";
      e.expand = true;
    },
    hide(e) {
      const self = this;
      e.colormenu = "#1e1e1e";
    },
    selector(eArray, elem) {
      const self = this;
      //elem.selected = true;
      eArray.content.forEach(element => {
        if (element.link == elem.link) {
          element.selected = true;
        } else {
          element.selected = false;
        }
      });
      self.$router.push(elem.link, () => {});
    },
    btnHome() {
      const self = this;
      //self.$router.push("inicio", () => {});
    }
  }
};
</script>

<style lang="sass" scoped>
.bg-especial-1
   background-color: $primary
</style>
