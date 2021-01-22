<template>
  <div>
    <div class="parent">
      <div class="text-h4 text-primary text-center" style="margin-top: 5px;">
        Califica al Restaurant
      </div>
      <q-separator />
      <img
        class="image1"
        :src="urlImageNegocio + datosNegocio.element.id"
        style="margin-left:-10px; max-height:180px; min-height:180px; width: 101%"
      />
      <img
        class="image2"
        src="fondo.png"
        style="margin-left:-10px; max-height:180px; min-height:180px; width: 101%; margin-top: 41px"
      />
    </div>
    <div style="margin-left: 15px">
      <div>
        <div class="row" style="margin-top: -60px">
          <div
            class="col-8 text-bold text-white"
            style="font-size: 34px; z-index: 1000"
          >
            {{ datosNegocio.element.nombre }}
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
    </div>
    <q-card class="q-pa-sm q-ma-sm">
      <q-card-section>
        <div class="q-pa-md">
          <q-rating
            no-dimming
            v-model="rating"
            size="3.5em"
            max="5"
            icon="img:iconos_ESTRELLA__NEGRA-01.svg"
            icon-selected="img:iconos_ESTRELLA__ROJA-01.svg"
          />
        </div>
        <q-input
          class="q-pt-md"
          rounded
          standout="bg-red text-white"
          ref="text"
          @blur="focusInput(0)"
          @click="focusInput(1)"
          v-model="text"
          type="textarea"
          label="Dejanos tu comentario"
          lazy-rules
          no-error-icon
        >
        </q-input>
        <div style="text-align: center; margin-top: 30px;">
          <q-btn
            class="text-capitalize text-left"
            color="red-10"
            label="Calificar"
            rounded
            size="26px"
            style="width: 280px;"
            @click="calificar"
          >
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      rating: 2.5,
      urlImageNegocio:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/negocios/",
      form: {}
    };
  },
  computed: {
    datosNegocio() {
      return this.$store.state.global.negocioSelect;
    }
  },
  mounted() {
    this.$store.commit("global/setshowHeader", true);
    this.datosNegocio;
  },
  methods: {
    calificar() {
      const self = this;
      self.$router.push("/restaurant");
    }
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
