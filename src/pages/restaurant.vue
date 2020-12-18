<template>
  <div class="full-width text-center my-font">
    <q-input
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
    ></Shop_list_home>
  </div>
</template>

<script>
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
      textSearch: ""
    };
  },
  components: {
    SlideIcons,
    Shop_list_home
  },
  computed: {
    IdService() {
      return this.$store.state.global.IdService;
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
    self.$store.commit("global/setTitle", this.directionNow);
    this.$store.commit("global/setshowHeader", true);
  },
  methods: {}
};
</script>

<style></style>
