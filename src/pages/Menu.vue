<template>
  <div>
    <img
      :src="negocioSelect.image"
      style="margin-left:-10px; max-height:180px; min-height:180px; width: 101%"
    />
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
    //this.negocioSelect
  }
};
</script>

<style></style>
