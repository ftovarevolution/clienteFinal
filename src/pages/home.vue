<template>
  <div>
    <div :class="getClassMap()">
      <GmapMap
        :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          animatedZoom: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: true,
          clickableIcons: false,
          disableDoubleClickZoom: true,
          minZoom: 9
        }"
        ref="mapa"
        :center="center"
        :zoom="zoom"
        map-type-id="roadmap"
        style="width: 100%; height: 400px;"
        @center_changed="update('reportedCenter', $event)"
        @position_changed="update('position', $event)"
        @dragend="update('listo', $event)"
        @resize="update('resize', $event)"
      >
        <div v-for="(m, index) in markers" :key="index">
          <gmap-custom-marker
            v-if="m.enable"
            :class="getClass(m)"
            :marker="m.position"
            :clickable="false"
            :draggable="false"
            :z-index="m.zIndex"
          >
            <q-img
              :class="{
                'animated slower infinite pulse': m.typeIcon
              }"
              v-if="m.typeIcon"
              :src="m.icon.url"
              style="width: 20px;"
            />
            <div class="full-width text-center" v-if="!m.typeIcon">
              <div style="height: 30px;">
                <q-spinner-facebook
                  v-if="m.enbusqueda"
                  :color="getColor()"
                  size="3em"
                  class="block"
                />
              </div>
              <q-img
                v-if="!m.typeIcon"
                :src="m.icon.url"
                style="width: 30px;"
                class="block"
              />
            </div>
          </gmap-custom-marker>
        </div>
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

const GmapCustomMarker = () =>
  import(/*webpackChunkName: "GmapCustomMarker" */ "vue2-gmap-custom-marker");

import { style } from "./../boot/google.style.js";

import { Plugins } from "@capacitor/core";

const { Geolocation } = Plugins;

export default {
  name: "PageIndex",
  components: {
    GmapCustomMarker
    //menuMapa
  },
  data() {
    return {
      markers: [],
      dialogBusca: false,
      dialogOperador: false,
      center: {
        lat: 10,
        lng: 10
      },
      zoom: 16,
      posicion_manual: {
        lat: 0,
        lng: 0
      },
      timer_public: null,
      centroInicial: {
        lat: 0,
        lng: 0
      }
    };
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    clearInterval(this.timer_public);
  },
  computed: {
    title() {
      return this.$store.state.global.title;
    },
    google: gmapApi
  },
  watch: {
    centroInicial(n, o) {
      this.markers[0].position = this.centroInicial;
      if (this.markers[1].position.lat === 0) {
        this.markers[1].enable = true;
        this.markers[1].zIndex = 999998;
        this.llevamealcentro();
      }
    }
  },
  beforeCreate() {
    this.campo = 1;
  },
  mounted() {
    const self = this;
    self.$store.commit("global/setTitle", "Dónde Estás?");
    this.getCurrentPosition();
    this.initMarkers();
    setTimeout(() => {
      // this.markers[1].enable = true;
      // this.markers[1].zIndex = 999998;
      self.initService();
      this.llevamealcentro();
    }, 2000);
  },
  methods: {
    getMarkerPosition(e) {
      console.log("***********", e);
    },
    getCurrentPosition() {
      const self = this;
      Geolocation.getCurrentPosition()
        .then(position => {
          console.log("pos----", position);
          self.centroInicial = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          self.markers[0].position = self.centroInicial;
          if (this.markers[1].position.lat === 0) {
            self.markers[1].enable = true;
            self.markers[1].zIndex = 999998;
          }
        })
        .catch(e => {
          console.log("------>", e);
          self.$q.dialog({
            title: "Error",
            message:
              "No podemos acceder a su ubicación, debe encender el GPS y reicniciar la aplicación",
            ok: {
              push: true,
              color: "negative"
            },
            persistent: true
          });
        });
    },
    initService() {
      const self = this;
      this.geocoder = new self.google.maps.Geocoder();
      this.directionsService = new self.google.maps.DirectionsService();
      this.$refs.mapa.$mapObject.setOptions({
        styles: style,
        draggable: true,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
      });
      var mDirectionsRendererOptions = {
        suppressMarkers: true,
        suppressInfoWindows: true,
        polylineOptions: {
          strokeColor: "#000",
          strokeOpacity: 0.5,
          strokeWeight: 4,
          zIndex: 9999
        }
      };
      this.directionsRenderer = new self.google.maps.DirectionsRenderer(
        mDirectionsRendererOptions
      );
      this.directionsRenderer.setMap(this.$refs.mapa.$mapObject);
    },
    initMarkers() {
      console.log("initMarkers");
      this.campo = 1;
      this.timer_public = setInterval(() => {
        this.getCurrentPosition();
      }, 5000);
      this.center = this.centroInicial;
      this.posicion_manual = this.centroInicial;
      this.markers = [];
      this.addMarker(this.centroInicial, 1, 1, true, ""); // el que se mueve
      this.addMarker(
        this.posicion_manual,
        "a",
        0,
        false,
        "Desde donde deseas partir?"
      ); // el que se mueve
      this.markers[0].position = this.centroInicial;
      this.markers[1].enable = true;
      this.markers[1].zIndex = 999998;
      this.llevamealcentro();
    },
    addMarker(LatLng, icon, zIndex, estado, nombre) {
      console.log("addMarker");
      this.markers.push({
        position: LatLng,
        activo: false,
        direccion: null,
        enbusqueda: false,
        fijado: false,
        nombre: nombre || "",
        icon: { url: this.getIcon(icon) },
        zIndex: zIndex,
        enable: estado,
        con_latlng: false,
        typeIcon: icon == 1 ? true : false
      });
    },
    buscaDireccion(posicion, campo) {
      if (posicion.lat !== 0 && posicion.lng !== 0) {
        const self = this;
        self.geocoder.geocode(
          {
            location: posicion
          },
          function(responses, status) {
            if (status === "OK") {
              self.markers[campo].direccion = responses[0].formatted_address;
              console.log("buscaDireccion -> ", responses[0].formatted_address);
            }
          }
        );
      } else {
        console.log("no se puede buscar la direccion");
      }
    },
    llevamealcentro() {
      const self = this;
      self.center = self.centroInicial;
      self.posicion_manual = self.centroInicial;
      self.markers[self.campo].position = self.centroInicial;
      self.markers[0].position = self.centroInicial;
      self.markers[self.campo].direccion = "";
      self.$refs.mapa.panTo(self.centroInicial);
      setTimeout(() => {
        self.buscaDireccion(self.posicion_manual, self.campo);
      }, 1000);
    },

    async renderMapa() {
      const self = this;
      const puntosParadas = [];
      await this.$refs.mapa.$mapObject.setOptions({
        draggable: false
      });
      await self.directionsService.route(
        {
          origin: self.markers[1].position,
          destination: self.markers[2].position,
          waypoints: puntosParadas,
          optimizeWaypoints: true,
          travelMode: "DRIVING",
          avoidTolls: true
        },
        async function(response, status) {
          if (status === "OK") {
            await self.directionsRenderer.setDirections(response);
            self.directionsRendererResponse = response;
          }
        }
      );
    },
    cambioFase(arg) {
      // this.$store.commit("user/setcampo", arg);
      this.campo = arg;
      if (arg === 5) {
        this.grabarDatos();
        this.solicitado = true;
        this.dialogBusca = true;
      }
    },
    onClickTool() {
      console.log("prueba el click");
    },
    getClassMap() {
      console.log("campo:", this.campo);
      if (!this.campo) {
        return "mapa1";
      }
      switch (this.campo) {
        case 1:
          return "mapa1";
          break;
        case 2:
          return "mapa2";
          break;
        case 3:
          return "mapa3";
          break;
        case 4:
          return "mapa5";
          break;
        case 5:
          return "mapa5";
          break;
        case 6:
          return "mapa5";
          break;
        default:
          return "mapa1";
          break;
      }
    },
    getClass(m) {
      return {
        "animated bounce": m.activo
      };
    },
    getColor() {
      switch (this.campo) {
        case 1:
          return "positive";
          break;
        case 2:
          return "negative";
          break;
      }
    },

    getIcon(icon) {
      let xIcon = "./pin.png";
      switch (icon) {
        case 1:
          xIcon = "./marker.png";
          break;
        case "a":
          xIcon = "./start.svg";
          break;
        case "b":
          xIcon = "./end.svg";
          break;
      }
      return xIcon;
    },
    update(field, event) {
      const self = this;
      if (self.fase1 === true) return;
      if (self.campo === 0) return;
      if (self.campo > 2) return;
      if (!self.markers[self.campo].enable) return;
      if (field === "reportedCenter") {
        this.posicion_manual = {
          lat: event.lat(),
          lng: event.lng()
        };
        self.markers[self.campo].position = self.posicion_manual;
        self.markers[self.campo].direccion = null;
        self.markers[self.campo].enbusqueda = true;
      } else if (field === "listo") {
        console.log("listo a buscar direccion ");
        self.buscaDireccion(self.posicion_manual, self.campo);
        self.markers[self.campo].activo = true;
        setTimeout(() => {
          if (self.markers[self.campo]) {
            self.markers[self.campo].activo = false;
            self.markers[self.campo].enbusqueda = false;
          }
        }, 1000);
      } else {
        self.$set(this, field, event);
      }
    }
  }
};
</script>
<style lang="sass" scoped>

.animated
  animation-duration: 0.9s;


.sincon
  margin-left: auto !important;

.q-btn-dropdown--simple
  .q-btn-dropdown__arrow
    margin-left: auto !important;

.my-page
  background: $primary;
</style>
