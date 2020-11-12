<template>
  <div class="full-width text-center">
    <SlideIcons></SlideIcons>
    <Shop_list_home></Shop_list_home>
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
    console.log("mounted -> this.NameService", this.directionNow);
  },
  methods: {}
};
</script>

<style></style>
