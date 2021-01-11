<template>
  <div class="full-width text-center my-font">
    <q-input
      @keypress="keypress"
      @input="keypress"
      standout="bg-red-2 text-white"
      rounded
      style="width: 90%; margin-top: 10px; margin-left: 20px; margin-right: 20px"
      dense
      v-model="textSearch"
      bottom-slots
      placeholder="Que quieres comer hoy?"
    >
      <template v-slot:prepend>
        <q-icon class="text-red" name="fas fa-search" />
      </template>
      <template v-slot:append>
        <q-btn
          color="primary"
          flat
          icon="fal fa-times"
          class="cursor-pointer q-mr-sm"
          @click="textSearch = ''"
          style="width: 36px;"
        />
      </template>
    </q-input>
    <SlideIcons v-if="false"> </SlideIcons>
    <Shop_list_home
      :idServicios="this.IdService"
      :search="this.textSearch"
      :buscar="this.buscar"
    ></Shop_list_home>
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";

const SlideIcons = () =>
  import(/*webpackChunkName: "SlideIcons" */ "./../components/SlideIcons");

const Shop_list_home = () =>
  import(
    /*webpackChunkName: "Shop_list_home" */ "./../components/Shop_list_home"
  );

export default {
  name: "Restaurant",
  data() {
    return {
      buscar: false,
      textSearch: ""
    };
  },
  components: {
    SlideIcons,
    Shop_list_home
  },
  computed: {
    estado() {
      return this.$store.state.carrito.estado;
    },
    userVerify() {
      return this.$store.state.login.userVerify;
    },
    IdService() {
      if (localStorage.IdService) {
        return localStorage.IdService;
      } else {
        return this.$store.state.global.IdService;
      }
    },
    NameService() {
      return this.$store.state.global.NameService;
    },
    directionNow() {
      return this.$store.state.global.directionNow;
    },
    directionNowLat() {
      return this.$store.state.global.directionNowLat;
    },
    directionNowLng() {
      return this.$store.state.global.directionNowLng;
    }
  },
  mounted() {
    const self = this;
    Auth.currentUserInfo()
      .then(async () => {
        self.$store.commit("global/setTitle", localStorage.directionNow);
        this.$store.commit("global/setshowHeader", true);
        if (this.estado == "Pedido") {
          this.$router.push("/seguimientoPedido");
        }
      })
      .catch(e => {
        console.log(e);
        try {
          localStorage.register = "false";
          this.$Auth.signOut();
          this.$router.push("/login");
        } catch (error) {
          console.log("error signing out: ", error);
          this.$router.push("/");
        }
      });
  },
  methods: {
    keypress(key) {
      if (this.textSearch.length > 0) {
        if (key.keyCode == 13) {
          this.buscar = this.textSearch;
        }
      } else {
        this.buscar = "*";
      }
    }
  }
};
</script>

<style></style>
