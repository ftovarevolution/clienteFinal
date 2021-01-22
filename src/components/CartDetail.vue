<template>
  <div>
    <q-card style="border: 0px solid; padding-bottom: 200px;">
      <q-card-section v-if="carritoLenght > 0" class="shadow-2">
        <div class="row">
          <div class="col">
            <div class="text-h6 text-grey-8" style="font-size: 25px;">
              {{ this.negocio }}
            </div>
            <div class="text-h6 text-grey-8" style="font-size: 14px;">
              {{ this.kmActual }} Km
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
                Volver al Negocio
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section v-if="carritoLenght > 0" class="shadow-2">
        <div class="q-pb-sm">
          <q-item v-for="(item, index) in carrito" :key="index">
            <q-item-section style="border: 0px solid">
              <div class="row">
                <div class="col-10" style="border: 0px solid red">
                  <b style="font-weight: 700; color: #666; font-size: 14px">{{
                    item.nombre
                  }}</b>
                </div>
                <div class="col-2">
                  <b
                    style="font-weight: 700; color: #666; font-size: 20px; float: right"
                    >${{ item.precio }}</b
                  >
                </div>
              </div>
              <!-- <a style="color: #666">
                Cantidad :
                {{ item.cantidad }}
              </a> -->
              <div v-for="(aux, index) in item.adicionales" :key="index">
                <a v-if="aux.precio > 0" style="color: #666; font-size: 16px">
                  {{ aux.nombre }} (${{ aux.precio }})
                </a>
                <a v-else style="color: #666; font-size: 16px">
                  {{ aux.nombre }}
                </a>
              </div>
              <div class="row">
                <div class="col-8">
                  <q-btn
                    class="q-mt-sm"
                    flat
                    round
                    color="gret"
                    icon="fal fa-trash-alt"
                    @click="eliminarItem(item)"
                  />
                </div>
                <div class="col-4">
                  <div class="row justify-center items-center q-mt-lg">
                    <div class="col-4">
                      <q-btn
                        color="negative"
                        icon="fas fa-minus"
                        style="border-radius: 6px; height:23px; width:29px; font-size:8px; float: right;"
                        @click="modificar_cantidad(false, item)"
                      />
                    </div>
                    <div class="col q-ml-xs row justify-center">
                      {{ item.cantidad }}
                    </div>
                    <div class="col">
                      <q-btn
                        color="positive"
                        icon="fas fa-plus"
                        style="border-radius: 6px; height:23px; width:29px; font-size:8px; float: left;"
                        @click="modificar_cantidad(true, item)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <q-separator class="q-mt-sm" />
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section v-if="carritoLenght > 0" class="shadow-2">
        <div class="q-pt-none row">
          <div class="col-xs-9  q-pl-sm">
            <p>Sub Total</p>
          </div>
          <div class="col-xs-3 text-right q-pr-sm">
            <p>$ {{ this.subtotal }}</p>
          </div>
          <q-separator />
          <div class="col-xs-9 q-pl-sm">
            <p>Impuesto</p>
          </div>
          <div class="col-xs-3 text-right q-pr-sm">
            <p>$ {{ this.impuesto }}</p>
          </div>
          <q-separator />
          <div class="col-xs-9 q-pl-sm">
            <p>Delivery</p>
          </div>
          <div class="col-xs-3 text-right q-pr-sm">
            <p>$ {{ this.delivery }}</p>
          </div>
          <q-separator />
          <div class="col-xs-9 q-pl-sm">
            <strong style="font-size: 18px;">Total del Pedido</strong>
          </div>
          <div class="col-xs-3 text-right q-pr-sm">
            <strong style="font-size: 18px;"> $ {{ this.total }} </strong>
          </div>
          <div class="col-xs-12 text-center	 q-pt-sm ">
            <a style="font-size: 14px;"> Enviar a: {{ this.directionNow }} </a>
          </div>
          <div class="q-pa-sm" style="width: 100%">
            <q-input
              v-model="textObserva"
              type="textarea"
              label="Nota Adicional"
              autogrow
            />
          </div>
          <q-btn
            :disable="this.total == 0.0"
            class="full-width q-mt-md"
            color="red-10"
            rounded
            label="Procesar el Pedido"
            push
            @click="MostrarformaPago = true"
          />
          <q-btn
            class="full-width q-mt-md"
            color="red-10"
            rounded
            label="Cancelar el Pedido"
            push
            @click="cancelaPedido"
          />
        </div>
      </q-card-section>
      <q-card-section v-else class="shadow-2">
        <div
          class="q-pa-sm text-h6 text-grey-8 text-center"
          style="font-size: 22px; white-space: nowrap"
        >
          {{ cartEmptyMessage }}
        </div>
        <div class="row" style="border: 0px solid;">
          <q-img
            class="q-ml-none q-pl-none offset-xs-4 col-xs-4"
            style="width: 35%;"
            src="https://image.flaticon.com/icons/svg/2038/2038854.svg"
          ></q-img>
        </div>
        <div class="q-pa-lg row">
          <q-btn
            style="width: 330px; height: 46px"
            align="center"
            rounded
            color="red-10"
            label="Comienza un Pedido"
            to="/services"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="MostrarformaPago" persistent class="q-mb-xl">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-red">Forma de Pago</div>
        </q-card-section>

        <q-card-section class="q-pt-none ">
          <q-option-group
            :options="tiposDePago"
            type="radio"
            v-model="formaPago"
          />
          <q-input
            v-if="formaPago == '0000001'"
            dense
            square
            outlined
            v-model="efectivo"
            label="Monto Efectivo"
            maxlength="6"
            @keypress="keypress"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            flat
            label="Procesar el Pedido"
            v-close-popup
            @click="procesaPedido"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- <q-dialog v-model="showCoupon" position="bottom" class="height:5000px">
      <coupon />
    </q-dialog> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { API, Auth } from "aws-amplify";
import { getConfiguraciones, listTipoPagos } from "./../graphql/queries.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

//import Coupon from "components/Coupon";
export default {
  components: {
    //  Coupon
  },
  data() {
    return {
      distancia: 1.0,
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
      urlImage:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/items/",
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
  computed: {
    ...mapState("generals", ["carro"]),
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
        let distanceTmp = 0;
        const elementoDistancia = controlDistancia.rows[0].elements[0].distance;
        if (typeof elementoDistancia !== "undefined") {
          distanceTmp =
            parseFloat(controlDistancia.rows[0].elements[0].distance.text) *
            miToKm;
        } else {
          distanceTmp = 1;
        }
        console.log("Pasando por aqui ------>");
        let distance = (Math.round(distanceTmp * 100) / 100).toFixed(2);
        this.distancia = distance;
        this.calculaTotales();
      }
    } else {
      this.distancia = 1;
      this.calculaTotales();
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
        console.log(
          "🚀 ~ file: CartDetail.vue ~ line 379 ~ calculaTotales ~ element",
          element
        );
        auxSubTotal = auxSubTotal + element.precio * element.cantidad;
        element.adicionales.forEach(adicionales => {
          auxSubTotal = auxSubTotal + adicionales.precio * element.cantidad;
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
      this.$router.push("/item");
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
      this.$store.commit("carrito/setcarritoLenght", 0);
      this.$store.commit("carrito/setcarrito", []);
      this.$store.commit("carrito/setEstado", "Pedido");
      this.$router.push("/restaurant");
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
      if (self.kmActual === 0) {
        self.kmActual = 1;
      }
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
