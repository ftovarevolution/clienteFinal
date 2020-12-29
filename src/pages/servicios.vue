<template>
  <div class="full-width text-center my-font" style="margin-top: 0px;">
    <div
      class="bg-primary text-white"
      style="font-size: 30px; margin-top: 0px;"
    >
      Que deseas hoy?
    </div>
    <div
      style="margin-bottom: 15px; margin-top: 20px;"
      class="column inline"
      v-for="(item, index) in menu2"
      :key="index"
    >
      <q-btn
        class="bg-dark botonmenu text-white"
        unelevated
        rounded
        @click="callService(item)"
      >
        <div class="row">
          <div
            style="width: 100px; max-width: 100px;  float: left; margin-left: -50px; margin-top: -20px"
          >
            <q-avatar size="94px">
              <img style="width: 100px; height: 100px" :src="item.image" />
            </q-avatar>
          </div>
          <div style="width: 240px; max-width: 240px; margin-top: 15px;">
            <div
              class="text-capitalize text-left"
              style="font-size: 34px; margin-left: 10px;"
            >
              {{ item.nombre }}
            </div>
          </div>
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";
import { listCategoriass } from "./../graphql/queries.js";

export default {
  data() {
    return {
      btnOps: {
        type: "circle",
        easing: "easeOutQuart",
        size: 4,
        particlesAmountCoefficient: 4,
        oscillationCoefficient: 2,
        color: function() {
          return Math.random() < 0.5 ? "#000000" : "#ff3333";
        },
        onComplete: () => {
          console.log("complete");
        },
        onBegin: () => {
          console.log("begin");
        },
        visible: true,
        animating: false
      },
      right: false,
      textSearch: "",
      email: "",
      title: "",
      showSearch: false,
      image: "",
      menu: [],
      menu2: [
        {
          id: "0000001",
          nombre: "Restaurantes",
          image: "iconos_RESTAURANT.svg"
        },
        {
          id: "0000002",
          nombre: "Licorerias",
          image: "iconos_LICORERIA-01.svg"
        },
        {
          id: "0000004",
          nombre: "Carnicerias",
          image: "iconos_CARNICERIAS.svg"
        },
        {
          id: "0000005",
          nombre: "Farmacias",
          image: "iconos_FARMACIA-01.svg"
        },
        {
          id: "0000006",
          nombre: "Envios",
          image: "iconos_ENVIOS-01.svg"
        }
      ]
    };
  },
  components: {},
  computed: {
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
    self.$store.commit("global/setTitle", "");
    this.$store.commit("global/setshowHeader", false);
    self.$store.commit("global/setTitle", localStorage.directionNow);
    self.readData();
  },
  methods: {
    async readData() {
      const self = this;
      self.loading = true;
      // await self.$API
      //   .graphql(
      //     self.$API.graphqlOperation(listCategoriass, {
      //       sort: {
      //         direction: "asc",
      //         field: "nombre"
      //       }
      //     })
      //   )
      //   .then(data => {
      //     console.log(data.data.listCategoriass.items);
      //     self.menu = data.data.listCategoriass.items;
      //     self.loading = false;
      //   })
      //   .catch(e => {
      //     self.loading = false;
      //     console.log("TCL: e", e);
      //   });
    },
    callService(item) {
      let self = this;
      self.$store.commit("global/setIdService", item.id);
      self.$store.commit("global/setNameService", item.nombre);
      localStorage.IdService = item.id;
      localStorage.NameService = item.nombre;
      this.$router.push("/restaurant");
    }
  }
};
</script>

<style lang="sass">
.buttonSevice
  margin-left: 40px
  margin-right: 40px
  margin-bottom: 30px

.botonmenu
  width: 330px
  height: 70px
</style>
