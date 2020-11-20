<template>
  <q-card class="q-pa-sm q-ma-sm">
    <q-card-section>
      <restaurant-info />
    </q-card-section>
    <q-card-section>
      <FoodList />
    </q-card-section>
  </q-card>
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
  }
};
</script>

<style></style>
