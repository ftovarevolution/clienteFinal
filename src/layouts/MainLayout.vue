<template>
  <q-layout view="lHh Lpr lFf" class="my-font">
    <q-header reveal class="bg-white text-primary" v-if="showHeader">
      <q-toolbar>
        <q-icon name="fas fa-map-marker-alt" />
        <q-toolbar-title @click="irDireccion" style="font-size: 14px;">{{
          title
        }}</q-toolbar-title>
        <q-btn
          dense
          flat
          round
          icon="fal fa-ellipsis-v"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>
    <q-header reveal class="bg-white text-black" v-else>
      <div class="row items-center no-wrap" style="margin-bottom: -10px">
        <div class="col-3">
          <q-avatar size="100px">
            <img
              style="width: 100px; height: 100px"
              src="iconos_mis_direcciones-01.svg"
            />
          </q-avatar>
        </div>
        <div class="col-8">
          <q-item-label lines="2" caption style="font-size: 18px;">
            {{ this.title }}
          </q-item-label>
          <!-- <q-input
            borderless
            style="margin-top:20px; max-height: 100px; font-size: 18px;"
            type="textarea"
            v-model="title"
            disable
          /> -->
        </div>
        <div class="col-auto">
          <q-btn
            dense
            flat
            round
            icon="fal fa-ellipsis-v"
            @click="right = !right"
          />
        </div>
      </div>
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

    <q-footer elevated class="text-white">
      <q-toolbar style="background-color: black">
        <q-toolbar-title>
          <div class="row">
            <q-btn
              round
              flat
              color="white"
              stack
              no-caps
              size="16px"
              class="q-mt-sm col-xs-3"
              @click="home"
              style="visibility: inherit; box-sizing: border-box; -webkit-tap-highlight-color"
            >
              <q-avatar size="32px" style="position: relative;">
                <img style="width: 32px" src="iconos_INICIO-01.svg" />
              </q-avatar>
              <div class="footer-item">INICIO</div>
            </q-btn>
            <q-btn
              round
              flat
              color="white"
              stack
              no-caps
              @click="myDirection"
              size="16px"
              class="q-mt-sm col-xs-3"
              style="visibility: inherit; box-sizing: border-box; -webkit-tap-highlight-color"
            >
              <q-avatar size="32px" style="position: relative;">
                <img style="width: 32px" src="iconos_DIRECCION-01.svg" />
              </q-avatar>
              <div class="footer-item">DIRECCION</div>
            </q-btn>
            <q-btn
              round
              flat
              color="white"
              stack
              no-caps
              size="16px"
              class="q-mt-sm col-xs-3"
              style="visibility: inherit; box-sizing: border-box; -webkit-tap-highlight-color"
              @click="$router.push('/cart')"
            >
              <q-avatar size="32px" style="position: relative;">
                <img style="width: 32px" src="iconos_CARRITO-01.svg" />
              </q-avatar>
              <q-badge v-if="carritoLenght > 0" color="primary" floating>{{
                this.carritoLenght
              }}</q-badge>

              <div class="footer-item">CARRITO</div>
            </q-btn>
            <q-btn
              round
              flat
              color="white"
              stack
              no-caps
              size="16px"
              class="q-mt-sm col-xs-3"
              style="visibility: inherit; box-sizing: border-box; -webkit-tap-highlight-color"
            >
              <q-avatar size="32px" style="position: relative;">
                <img style="width: 32px" src="iconos_perfil_mi_cuenta-01.svg" />
              </q-avatar>
              <div class="footer-item">PERFIL</div>
            </q-btn>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <myDirection></myDirection>
  </q-layout>
</template>

<script>
const myDirection = () => import("./../components/myDirection");

export default {
  name: "MainLayout",
  components: {
    myDirection
  },
  computed: {
    carrito() {
      return this.$store.state.carrito.carrito;
    },
    carritoLenght() {
      return this.$store.state.carrito.carritoLenght;
    },
    Register() {
      return this.$store.state.login.register;
    },
    userVerify() {
      return this.$store.state.login.userVerify;
    },
    title() {
      return this.$store.state.global.title;
    },
    showHeader() {
      return this.$store.state.global.showHeader;
    }
  },
  mounted() {},
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
          caption: "Mis Direcciones",
          function: "myDirection"
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
          icon: "fad fa-sign-out-alt",
          caption: "Logout",
          function: "logout"
        },
        {
          icon: "fas fa-door-open",
          caption: "Salir",
          function: "exit"
        }
      ],
      tab: "tab1",
      link: "",
      leftDrawerOpen: false
    };
  },
  watch: {
    carrito(Valores, o) {
      let totalItem = 0;
      Valores.forEach(element => {
        totalItem = totalItem + element.cantidad;
      });
      this.$store.commit("carrito/setcarritoLenght", totalItem);
      console.log(
        "🚀 ~ file: MainLayout.vue ~ line 249 ~ carrito ~ Valores.length",
        Valores
      );
    }
  },
  methods: {
    irDireccion() {
      console.log("Entrando direccion");
      this.$router.push("/home");
    },
    home() {
      this.$router.push("/services");
    },
    myDirection() {
      this.$store.commit("home/setMyDirectionDialog", true);
    },
    selectItem(item) {
      if (item.menuRouter) {
        this.$router.push(item.menuRouter);
      } else {
        if (item.function) {
          eval("this." + item.function + "()");
        }
      }
    },
    exit() {},
    async logout() {
      this.$store.commit("login/setRegister", false);
      this.$store.commit("login/setUserVerify", "");
      this.$store.commit("login/setVerify", false);
      this.$store.commit("global/setLoginew", true);
      this.$store.commit("global/setdirectionNow", "");
      this.$store.commit("global/setdirectionNowLat", 0);
      this.$store.commit("global/setdirectionNowLng", 0);
      try {
        localStorage.register = "false";
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
<style lang="sass">
.footer-item
  font-size: 10px
</style>
