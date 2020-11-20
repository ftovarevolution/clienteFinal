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
          prop1: "Mr Chen",
          prop2: "Comida China y Cantonesa",
          prop3: "10$ por Persona | 20-25 min.",
          prop4: "",
          rating: "4.2",
          to: "/item"
        },
        {
          image: "comida2.jpeg",
          prop1: "Pollo Graduado",
          prop2: "El Pollo que mas sabe",
          prop3: "8$ por persona | 30-45 min.",
          prop4: "",
          rating: "4.8",
          to: "/item"
        },
        {
          image: "comida3.jpeg",
          prop1: "Sushi Quito",
          prop2: "Copmida Japonesa",
          prop3: "13$ por persona | 15-30 min.",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida1.jpg",
          prop1: "Don Lee",
          prop2: "Comida China",
          prop3: "10$ por persona | 30-45 min.",
          rating: "5.0",
          to: "/item"
        },
        {
          image: "comida2.jpeg",
          prop1: "Pollito Criollito",
          prop2: "Pollo en Brasa y carnes a la parrila",
          prop3: "",
          prop4: "",
          rating: "4.9",
          to: "/item"
        },
        {
          image: "comida3.jpeg",
          prop1: "El Arabito",
          prop2: "Comida Arabe",
          prop3: "",
          prop4: "",
          rating: "3.9",
          to: "/item"
        },
        {
          image: "comida1.jpg",
          prop1: "El Comedor Economico",
          prop2: "Comida Criolla",
          prop3: "5$ por persona | 20-25 min.",
          prop4: "",
          rating: "4.5",
          to: "/item"
        },
        {
          image: "comida2.jpeg",
          prop1: "El Tomato",
          prop2: "Carne en Vara",
          prop3: "",
          prop4: "",
          rating: "3.5",
          to: "/item"
        },
        {
          image: "comida3.jpeg",
          prop1: "El Carrito del Sabor",
          prop2: "HotDog, Hamburguesas, Sandwich",
          prop3: "20-25 min.",
          prop4: "",
          rating: "4.9",
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
