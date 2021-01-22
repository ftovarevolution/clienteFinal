<template>
  <q-dialog v-model="MyOrdenDialog" persistent :maximized="true">
    <q-card>
      <q-card-section class="shadow-2">
        <q-avatar>
          <img :src="urlImage + this.orden.idNegocio" />
        </q-avatar>

        <div class="row">
          <div class="col-9">
            <div class="text-h6 text-grey-8" style="font-size: 25px;">
              {{ this.orden.datosNegocio.nombre }}
            </div>
            <div class="text-h6 text-grey-8" style="font-size: 14px;">
              {{ this.orden.datosNegocio.direccion }}
            </div>
            <div class="text-h6 text-grey-8" style="font-size: 14px;">
              {{ orden.fecha }}
            </div>
          </div>
          <div class="col" style="float: right">
            <q-btn
              class="text-weight-light"
              flat
              size="medium"
              text-color="red-10"
              no-caps
              @click="irRestaurant"
            >
              <div class="text-red-8" style="font-size: 16px;">
                Regresar
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="shadow-2">
        <div class="q-pb-sm">
          <q-item
            v-for="(item, index) in orden.itemsPedidos.items"
            :key="index"
          >
            <q-item-section style="border: 0px solid">
              <div class="row">
                <div class="col-10" style="border: 0px solid red">
                  <b style="font-weight: 700; color: #666; font-size: 14px">{{
                    item.datosItem.nombre
                  }}</b>
                </div>
                <div class="col-2">
                  <b
                    style="font-weight: 700; color: #666; font-size: 20px; float: right"
                    >${{ item.precioTotal }}</b
                  >
                </div>
              </div>
              <div
                v-for="(aux, index) in item.itemsComponentesPedidos.items"
                :key="index"
              >
                <a
                  v-if="aux.precioTotal > 0"
                  style="color: #666; font-size: 16px"
                >
                  {{ aux.datosItem.nombre }} (${{ aux.precioTotal }})
                </a>
                <a v-else style="color: #666; font-size: 16px">
                  {{ aux.datosItem.nombre }}
                </a>
              </div>
              <div
                v-for="(aux, index) in item.itemsExtrasPedidos.items"
                :key="index"
              >
                <a
                  v-if="aux.precioTotal > 0"
                  style="color: #666; font-size: 16px"
                >
                  {{ aux.datosItem.nombre }} (${{ aux.precioTotal }})
                </a>
                <a v-else style="color: #666; font-size: 16px">
                  {{ aux.datosItem.nombre }}
                </a>
              </div>
              <q-separator class="q-mt-sm" />
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>
      <q-card-section class="shadow-2">
        <div class="q-pt-none row">
          <q-btn
            class="full-width q-mt-md"
            color="red-10"
            rounded
            label="Regresar"
            push
            @click="cancelaPedido"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { API, Auth } from "aws-amplify";
import { getConfiguraciones, listTipoPagos } from "./../graphql/queries.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { createPedidos } from "./../graphql/mutations";

//import Coupon from "components/Coupon";
export default {
  components: {
    //  Coupon
  },
  data() {
    return {
      urlImage:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/logos/",
      distancia: 0.0,
      tiposDePago: [],
      kmActual: "",
      negocio: "",
      MostrarformaPago: false,
      formaPago: "",
      textObserva: "",
      kmMinimo: 0.0,
      tarifaEnvioMinima: 0.0,
      costoKmAdicional: 0.0,
      subtotal: 0.0,
      impuesto: 0.0,
      efectivo: "",
      delivery: 0.0,
      total: 0.0,
      title: "Manage Cart Items",
      cartEmptyMessage: "Opps! Tu carrito está vacio",
      qty: 1,
      items: [
        {
          name: "Daal Makhni",
          price: 100,
          quantity: 2
        }
      ],
      showCoupon: false
    };
  },
  props: {
    orden: null
  },
  computed: {
    ...mapState("generals", ["carro"]),
    MyOrdenDialog() {
      return this.$store.state.home.MyOrdenDialog;
    },
    carrito() {
      return this.$store.state.carrito.carrito;
    },
    negocioSelect() {
      return this.$store.state.global.negocioSelect;
    },
    directionNow() {
      return this.$store.state.global.directionNow;
    },
    directionNowLat() {
      return this.$store.state.global.directionNowLat;
    },
    directionNowLng() {
      return this.$store.state.global.directionNowLng;
    },
    carritoLenght() {
      return this.$store.state.carrito.carritoLenght;
    },
    idCliente() {
      return this.$store.state.login.SubID;
    }
  },
  beforeDestroy() {
    this.$store.commit("global/setnavigateNow", "");
  },
  async mounted() {
    const self = this;
    console.log(
      "🚀 ~ file: CartDetail.vue ~ line 349 ~ mounted ~ this.carrito",
      this.carrito
    );
    const idItemPedido = uuidv4();
    let xvariableItem = [];
    self.carrito.forEach(element => {
      xvariableItem.push({
        estado: true,
        id: idItemPedido,
        idItems: element.id,
        idPedido: "self.variables.codigoPedido"
      });
    });
    console.log(
      "🚀 ~ file: CartDetail.vue ~ line 297 ~ mounted ~ xvariableItem",
      xvariableItem
    );
    const miToKm = 1.60934;
    this.$store.commit("global/setnavigateNow", "/cart");
    this.negocio = this.negocioSelect.element.nombre;
    let geolocalitation = this.negocioSelect.element.geolocacion;
    let destino = this.directionNowLat + ", " + this.directionNowLng;
    let origen = geolocalitation.lat + ", " + geolocalitation.lon;
    if (destino.length > 2 && origen.length > 2) {
      let controlDistancia = await this.fetchDistance(origen, destino);
      if (controlDistancia.rows[0].elements[0].status == "NOT_FOUND") {
      } else {
        let distanceTmp =
          parseFloat(controlDistancia.rows[0].elements[0].distance.text) *
          miToKm;
        let distance = (Math.round(distanceTmp * 100) / 100).toFixed(2);
        this.distancia = distance;
        this.calculaTotales();
      }
    }
    await self.$API
      .graphql(
        self.$API.graphqlOperation(listTipoPagos, {
          sort: {
            direction: "asc",
            field: "id"
          }
        })
      )
      .then(data => {
        let dataPagos = data.data.listTipoPagos.items;
        let objdata = [];
        dataPagos.forEach(element => {
          objdata = { label: element.nombre, value: element.id };
          this.tiposDePago.push(objdata);
        });
      })
      .catch(e => {
        console.log("TCL: error", e);
      });
  },

  methods: {
    eliminarItem(item) {
      for (let index = 0; index < this.carrito.length; index++) {
        const element = this.carrito[index];
        console.log(
          "🚀 ~ file: CartDetail.vue ~ line 363 ~ eliminarItem ~ element",
          element
        );
        if (element.id == item.id) {
          this.carrito.splice(index, 1);
          this.cuentaCarrito(this.carrito);
          this.calculaTotales();
          console.log("Eliminado");
        }
      }
    },
    async calculaTotales() {
      let auxSubTotal = 0.0;
      this.carrito.forEach(element => {
        auxSubTotal = auxSubTotal + element.precio * element.cantidad;
        element.adicionales.forEach(adicionales => {
          auxSubTotal = auxSubTotal + adicionales.precio;
        });
      });
      this.subtotal = (Math.round(auxSubTotal * 100) / 100).toFixed(2); //round(auxSubTotal);
      this.impuesto = (Math.round(this.subtotal * 0.0 * 100) / 100).toFixed(2);
      let auDelivery = await this.calculaDelivery(this.distancia);
      this.delivery = (Math.round(auDelivery * 100) / 100).toFixed(2);
      let auxTotal = 0.0;
      auxTotal =
        parseFloat(this.subtotal) +
        parseFloat(this.impuesto) +
        parseFloat(this.delivery);
      this.total = (Math.round(auxTotal * 100) / 100).toFixed(2);
    },
    irRestaurant() {
      this.$store.commit("home/setMyOrdenDialog", false);
    },
    modificar_cantidad(accion, item) {
      if (accion) {
        if (item.cantidad < 20) {
          item.cantidad++;
        }
      } else {
        if (item.cantidad > 1) {
          item.cantidad--;
        }
      }
      this.cuentaCarrito(this.carrito);
      this.calculaTotales();
    },
    procesaPedido() {
      const self = this;
      const idPedido = uuidv4();
      let dateTmp = new Date();
      let day = dateTmp.getDate();
      let month = dateTmp.getMonth();
      let year = dateTmp.getFullYear();
      const hora = dateTmp.getHours();
      const min = dateTmp.getMinutes();
      const seg = dateTmp.getSeconds();
      const fechahora = moment([year, month, day, hora, min, seg, 150]);
      const observa = self.textObserva;

      let variables = {
        codigoPedido: idPedido,
        confirmaNegocio: false,
        despachadorAsig: false,
        despachadorEnCamino: false,
        despachadorEnNegocio: false,
        despachadorEnSitio: false,
        estado: true,
        fechaHora: fechahora,
        id: idPedido,
        idCliente: this.idCliente,
        idNegocio: this.negocioSelect.element.id,
        idTipoEnvio: "",
        idTipoPago: this.formaPago,
        observacines: observa,
        observacinesCancelacion: "",
        observacinesChat: "",
        pedidoCancelado: false,
        pedidoEntregado: false,
        pedidoListo: false,
        total: this.total
      };
      this.$store.commit("carrito/setvariables", variables);
      this.$router.push("/seguimientoPedido");
    },
    cancelaPedido() {
      this.$store.commit("home/setMyOrdenDialog", false);
    },
    keypress(key) {
      if (key.keyCode < 48 || key.keyCode > 57) {
        if (key.keyCode != 46) {
          key.preventDefault();
        }
      }
    },
    async calculaDelivery(km) {
      const self = this;
      let pago = "";
      let id = "0000001";
      let variables = {
        id
      };
      self.kmActual = km;
      await self.$API
        .graphql(self.$API.graphqlOperation(getConfiguraciones, variables))
        .then(data => {
          console.log(data.data.getConfiguraciones);
          self.kmMinimo = data.data.getConfiguraciones.kmMinimo;
          self.tarifaEnvioMinima =
            data.data.getConfiguraciones.tarifaEnvioMinima;
          self.costoKmAdicional = data.data.getConfiguraciones.costoKmAdicional;
          if (km > self.kmMinimo) {
            let kmDiferencia = 0.0;
            kmDiferencia = km - self.kmMinimo;
            pago = kmDiferencia * self.costoKmAdicional;
          } else {
            pago = self.tarifaEnvioMinima;
          }
        })
        .catch(e => {
          console.log("TCL: e", e);
        });

      return pago;
    },
    cuentaCarrito(Valores) {
      let totalItem = 0;
      Valores.forEach(element => {
        totalItem = totalItem + element.cantidad;
      });
      this.$store.commit("carrito/setcarritoLenght", totalItem);
    },
    round(num, decimales = 2) {
      var signo = num >= 0 ? 1 : -1;
      num = num * signo;
      if (decimales === 0)
        //con 0 decimales
        return signo * Math.round(num);
      // round(x * 10 ^ decimales)
      num = num.toString().split("e");
      num = Math.round(
        +(num[0] + "e" + (num[1] ? +num[1] + decimales : decimales))
      );
      // x * 10 ^ (-decimales)
      num = num.toString().split("e");
      return (
        signo * (num[0] + "e" + (num[1] ? +num[1] - decimales : -decimales))
      );
    },
    ...mapMutations("generals", ["addshop", "addshop2"]),
    increment(index, record) {
      this.carro[index].quantity++;
      this.carro[index].subtotal =
        this.carro[index].price * this.carro[index].quantity;
      this.addshop2(this.carro);
      record.quantity = this.carro[index].quantity;
      record.subtotal = this.carro[index].subtotal;
      this.$set(this.carro, index, record);
    },
    decrement(index, record) {
      this.carro[index].quantity--;
      this.carro[index].subtotal =
        this.carro[index].price * this.carro[index].quantity;
      this.addshop2(this.carro);
      record.quantity = this.carro[index].quantity;
      record.subtotal = this.carro[index].subtotal;
      this.$set(this.carro, index, record);
    },
    async fetchDistance(origin, dest) {
      return new Promise((resolve, reject) => {
        let response;
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [dest],
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
          },
          function(resp, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
              response = reject(status);
            } else {
              response = resolve(resp);
            }
          }
        );
        return response;
      });
    }
  }
};
</script>
