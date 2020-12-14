<template>
  <div>
    <div class="row">
      <div style="font-size: 38px" class="text-bold text-black">
        {{ datosNegocio.nombre }}
      </div>
      <q-space />
      <q-rating
        readonly
        no-dimming
        v-model="datosNegocio.rating"
        max="5"
        color-half="red-10"
        color-selected="red-10"
        color="black"
        size="26px"
        icon="fas fa-star"
        icon-selected="fas fa-star"
        icon-half="fad fa-star-half"
      />
      <!-- <q-badge color="primary" :label="form.rating" class="q-ma-sm" /> -->
    </div>
    <div class="text-grey-7 q-mt-sm">{{ datosNegocio.descripcion }}</div>
    <!-- <q-toggle
      class="q-mt-md text-grey-7"
      v-model="form.vegOnly"
      color="secondary"
      label="Veg Only"
    /> -->
  </div>
</template>

<script>
export default {
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
  props: {
    datosNegocio: null
  }
};
</script>

<style></style>
