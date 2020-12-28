<template>
  <div>
    <div class="parent">
      <img
        class="image1"
        :src="negocioSelect.image"
        style="margin-left:-10px; max-height:180px; min-height:180px; width: 101%"
      />
      <img
        class="image2"
        src="fondo.png"
        style="margin-left:-10px; max-height:180px; min-height:180px; width: 101%"
      />
    </div>
    <div style="margin-left: 15px">
      <restaurant-info :datosNegocio="this.negocioSelect" />
    </div>
    <q-card class="q-pa-sm q-ma-sm">
      <q-card-section>
        <FoodList :datosNegocio="this.negocioSelect" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import RestaurantInfo from "../components/Restaurant";
import FoodList from "../components/Food_list";
export default {
  components: {
    RestaurantInfo,
    FoodList
  },
  data() {
    return {
      form: {}
    };
  },
  computed: {
    negocioSelect() {
      return this.$store.state.global.negocioSelect;
    }
  },
  mounted() {
    this.$store.commit("foodList/setadd", false);
  }
};
</script>

<style>
.parent {
  position: relative;
  top: 0;
  left: 0;
}
.image1 {
  position: relative;
  top: 0;
  left: 0;
}
.image2 {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
