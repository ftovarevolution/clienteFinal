<template>
  <div>
    <div class="row">
      <div style="font-size: 38px" class="text-bold text-black">
        {{ datosNegocio.element.nombre }}
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
    </div>
    <div class="text-grey-10" style="font-size: 18px">
      {{ datosNegocio.element.descripcion }}
    </div>
    <div class="text-grey-7" style="font-size: 14px">
      Dirección: {{ datosNegocio.element.direccion }} Teléfono:
      {{ datosNegocio.element.telefono }}
    </div>
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
  mounted() {
    this.$store.commit("global/setshowHeader", true);
  },
  props: {
    datosNegocio: null
  }
};
</script>

<style></style>
