<template>
  <div>
    <q-list>
      <div v-if="search" class="q-pa-md text-grey">
        Searching for "{{ search }}""
      </div>
      <q-item
        clickable
        v-ripple
        v-for="(shop, index) in results"
        :key="index"
        @click="$router.push(shop.to)"
      >
        <q-item-section thumbnail v-if="shop.image" class="q-pl-sm">
          <img :src="shop.image" style="min-height:67px" />
        </q-item-section>

        <q-item-section>
          <div class="column items-start justify-center">
            <q-item-label class="text-bold"> {{ shop.prop1 }} </q-item-label>
            <q-item-label caption> {{ shop.prop2 }} </q-item-label>
            <q-item-label caption> {{ shop.prop3 }} </q-item-label>
            <q-item-label caption class="text-red">
              {{ shop.prop4 }}
            </q-item-label>
          </div>
          <q-badge
            color="primary"
            :label="shop.rating"
            class="absolute-top-right q-ma-sm"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ["search"],
  data() {
    return {
      data: [
        {
          image: "comida1.jpg",
          prop1: "Bliss Indian Restaurant",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "₹100 flat off use coupen off100",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida2.jpeg",
          prop1: "Every Day Fresh",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida3.jpeg",
          prop1: "S.K Dhaba Vegetarian",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          prop1: "ChatterBox",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida1.jpg",
          prop1: "Bliss Indian Restaurant",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "₹100 flat off use coupen off100",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida2.jpeg",
          prop1: "Every Day Fresh",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida3.jpeg",
          prop1: "S.K Dhaba Vegetarian",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          prop1: "ChatterBox",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida1.jpg",
          prop1: "Bliss Indian Restaurant",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "₹100 flat off use coupen off100",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida2.jpeg",
          prop1: "Every Day Fresh",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida3.jpeg",
          prop1: "S.K Dhaba Vegetarian",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          prop1: "ChatterBox",
          prop2: "veg only",
          prop3: "₹200-250 per person | 20-25 mins",
          prop4: "",
          rating: "4.5",
          to: "/item"
        }
      ]
    };
  },
  computed: {
    results() {
      const search = this.search ? this.search.toLowerCase() : "";
      return search !== ""
        ? this.data.filter(
            value =>
              value.prop1.toLowerCase().indexOf(search) > -1 ||
              value.prop2.toLowerCase().indexOf(search) > -1 ||
              value.prop3.toLowerCase().indexOf(search) > -1 ||
              value.prop4.toLowerCase().indexOf(search) > -1
          )
        : this.data;
    }
  }
};
</script>

<style>
.responsive {
  width: 100%;
  height: auto;
}
</style>
