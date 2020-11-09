<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal class="bg-red">
      <q-toolbar>
        <q-icon name="fas fa-map-marker-alt" />
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn dense flat round icon="fas fa-bars" @click="right = !right" />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="right" side="right" behavior="mobile" bordered>
      <div class="bg-primary">
        <div class="q-pa-lg">
          <!-- <q-img
            style="width: 70%; margin-left: 10%; padding: 10px;"
            src="http://209.208.110.222/assets/welcome.svg"
          /> -->
        </div>
      </div>
      <div class="q-pa-md">
        <q-list>
          <q-item
            @click="selectItem(item)"
            clickable
            v-ripple
            v-for="(item, index) in menu"
            :key="index"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.caption }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-grey">
      <q-toolbar style="background-color: white">
        <q-toolbar-title>
          <div class="row">
            <q-btn
              round
              flat
              color="grey-9"
              stack
              no-caps
              size="16px"
              class="q-mt-sm col-xs-3"
              style="visibility: inherit; box-sizing: border-box; -webkit-tap-highlight-color"
            >
              <q-icon size="22px" name="fas fa-home" color="grey-7" />
              <div class="footer-item">Inicio</div>
            </q-btn>
            <q-btn
              round
              flat
              color="grey-9"
              stack
              no-caps
              size="16px"
              class="q-mt-sm col-xs-3"
              style="visibility: inherit; box-sizing: border-box; -webkit-tap-highlight-color"
            >
              <q-icon size="22px" name="fas fa-map-marked-alt" color="grey-7" />
              <div class="footer-item">Direccion</div>
            </q-btn>
            <q-btn
              round
              flat
              color="grey-9"
              stack
              no-caps
              size="16px"
              class="q-mt-sm col-xs-3"
              style="visibility: inherit; box-sizing: border-box; -webkit-tap-highlight-color"
            >
              <q-icon size="22px" name="fas fa-shopping-cart" color="grey-7" />
              <q-badge v-if="1 > 0" color="primary" floating>2</q-badge>

              <div class="footer-item">Pedido</div>
            </q-btn>
            <q-btn
              round
              flat
              color="grey-9"
              stack
              no-caps
              size="16px"
              class="q-mt-sm col-xs-3"
              style="visibility: inherit; box-sizing: border-box; -webkit-tap-highlight-color"
            >
              <q-icon size="22px" name="fas fa-user" color="grey-7" />
              <div class="footer-item">Perfil</div>
            </q-btn>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  computed: {
    Register() {
      return this.$store.state.login.register;
    },
    userVerify() {
      return this.$store.state.login.userVerify;
    },
    title() {
      return this.$store.state.global.title;
    }
  },
  mounted() {
    if (!this.Register) {
      this.$router.push("/login");
    } else {
      //this.$store.commit("global/setTitle", "Dónde Estás?");
    }
  },
  data() {
    return {
      right: false,
      menu: [
        {
          icon: "fas fa-home",
          caption: "Inicio",
          menuRouter: "/home"
        },
        {
          icon: "fas fa-map-marker-alt",
          caption: "Mis Direcciones"
        },
        {
          icon: "fas fa-clipboard-list",
          caption: "Mis Pedidos"
        },
        {
          icon: "fas fa-user",
          caption: "Mi Cuenta"
        },
        {
          icon: "fas fa-balance-scale",
          caption: "Información Legal",
          function: ""
        },
        {
          icon: "fas fa-door-open",
          caption: "Salir",
          function: "logout"
        }
      ],
      tab: "tab1",
      link: "",
      leftDrawerOpen: false
    };
  },
  methods: {
    selectItem(item) {
      if (item.menuRouter) {
        this.$router.push(item.menuRouter);
      } else {
        if (item.function) {
          eval("this." + item.function + "()");
        }
      }
    },
    async logout() {
      this.$store.commit("login/setRegister", false);
      this.$store.commit("login/setUserVerify", "");
      this.$store.commit("login/setVerify", false);
      try {
        await this.$Auth.signOut();
        this.$router.push("/login");
      } catch (error) {
        console.log("error signing out: ", error);
        this.$router.push("/");
      }
    }
  }
};
</script>
<style lang="sass"></style>
