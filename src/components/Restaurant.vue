<template>
  <div>
    <div class="row" style="margin-top: -60px">
      <div
        class="col-8 text-bold text-white"
        style="font-size: 34px; z-index: 1000"
      >
        {{ datosNegocio.element.nombre }}
      </div>
      <div class="col-4">
        <q-rating
          style="margin-right: 10px; margin-top: 20px;"
          readonly
          no-dimming
          v-model="datosNegocio.rating"
          max="5"
          color-half="red-10"
          color-selected="red-10"
          color="black"
          size="16px"
          icon="fas fa-star"
          icon-selected="fas fa-star"
          icon-half="fad fa-star-half"
        />
      </div>
    </div>

    <div class="text-grey-10" style="font-size: 18px">
      {{ datosNegocio.element.descripcion }}
    </div>
    <div class="text-grey-7" style="font-size: 14px">
      Dirección: {{ datosNegocio.element.direccion }}
    </div>
    <div class="text-grey-7" style="font-size: 14px">
      Teléfono: {{ datosNegocio.element.telefono }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  mounted() {
    this.$store.commit("global/setshowHeader", true);
    this.datosNegocio;
  },
  props: {
    datosNegocio: null
  }
};
</script>

<style></style>
