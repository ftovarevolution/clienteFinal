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
      <!-- <q-card-section>
      </q-card-section> -->
      <q-card-section>
        <FoodList v-if="true" />
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
      form: {
        title: "Bliss Indian Restaurant",
        description: "Veg Only",
        rating: 4.6,
        vegOnly: false
      }
    };
  },
  computed: {
    negocioSelect() {
      return this.$store.state.global.negocioSelect;
    }
  },
  mounted() {
    //this.negocioSelect
    console.log("🚀 ----> this.negocioSelect", this.negocioSelect);
  }
};
</script>

<style></style>
