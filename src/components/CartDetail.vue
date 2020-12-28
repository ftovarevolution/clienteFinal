<template>
  <div>
    <q-card>
      <q-card-section v-if="carritoLenght > 0" class="shadow-2">
        <div class="text-h6 text-grey-8" style="font-size: 25px;">
          Mi Pedido
        </div>
        <br />
        <div class="q-pb-sm">
          <q-item v-for="(item, index) in carrito" :key="index">
            <q-item-section top thumbnail class="q-ml-none">
              <img style="width: auto" :src="urlImage + item.id + '.jpg'" />
            </q-item-section>
            <q-item-section style="border: 0px solid">
              <div class="row">
                <div class="col-8">
                  <b style="font-weight: 700; color: #666">{{ item.nombre }}</b>
                  <a style="color: #666"
                    >Precio: ${{ item.precio }} | Cantidad : {{ item.cantidad }}
                  </a>
                  <div v-for="(aux, index) in item.adicionales" :key="index">
                    <a v-if="aux.precio > 0" style="color: #666">
                      {{ aux.nombre }} $ {{ aux.precio }}
                    </a>
                    <a v-else style="color: #666">
                      {{ aux.nombre }}
                    </a>
                  </div>
                </div>
                <!-- <div class="col-4">
                  <div class="row">
                    <q-icon
                      v-if="item.cantidad > 0"
                      class="q-mr-md"
                      color="primary"
                      size="sm"
                      name="fal fa-minus-circle"
                      @click="decrement(index, item)"
                    />
                    <q-icon
                      size="sm"
                      name="fal fa-plus-circle"
                      @click="increment(index, item)"
                    />
                  </div>
                </div> -->
              </div>
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
            <p>$ {{ round(this.subtotal) }}</p>
          </div>
          <q-separator />
          <div class="col-xs-9 q-pl-sm">
            <p>Impuesto</p>
          </div>
          <div class="col-xs-3 text-right q-pr-sm">
            <p>$ {{ round(this.subtotal * 0.07) }}</p>
          </div>
          <q-separator />
          <div class="col-xs-9 q-pl-sm">
            <p>Delivery</p>
          </div>
          <div class="col-xs-3 text-right q-pr-sm">
            <p>$ {{ round(1.5) }}</p>
          </div>
          <q-separator />
          <div class="col-xs-9 q-pl-sm">
            <strong style="font-size: 18px;">Total del Pedido</strong>
          </div>
          <div class="col-xs-3 text-right q-pr-sm">
            <strong style="font-size: 18px;">
              $ {{ round(this.subtotal) + round(this.subtotal * 0.07) + 1.5 }}
            </strong>
          </div>
          <div class="col-xs-12 text-center	 q-pt-sm ">
            <a style="font-size: 14px;"> Enviar a: {{ this.directionNow }} </a>
          </div>
          <div class="q-pa-sm" style="width: 100%">
            <q-input
              v-model="text"
              type="textarea"
              label="Nota Adicional"
              autogrow
            />
          </div>
          <q-btn
            class="full-width q-mt-md"
            color="primary"
            label="Procesar el Pedido"
            push
            @click="MostrarformaPago = true"
          />
        </div>
      </q-card-section>
      <q-card-section v-else class="shadow-2">
        <div
          class="q-pa-sm text-h6 text-grey-8"
          style="font-size: 22px; white-space: nowrap"
        >
          {{ cartEmptyMessage }}
        </div>
        <div class="q-pa-lg row">
          <q-img
            class="offset-xs-4 col-xs-4"
            style="width: 35%"
            src="https://image.flaticon.com/icons/svg/2038/2038854.svg"
          ></q-img>
        </div>
        <div class="q-pa-lg row">
          <q-btn
            class="offset-xs-1 col-xs-11"
            align="center"
            label="Comienza un Pedido"
            color="primary"
            outline
            to="/services"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="MostrarformaPago" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-red">Forma de Pago</div>
        </q-card-section>

        <q-card-section class="q-pt-none ">
          <q-radio v-model="formaPago" val="Efectivo" label="Efectivo" />
          <q-radio v-model="formaPago" val="Tarjeta" label="Tarjeta" />
          <q-input
            v-if="formaPago == 'Efectivo'"
            dense
            square
            outlined
            v-model="efectivo"
            label="Monto Efectivo"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Procesar el Pedido" v-close-popup />
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
//import Coupon from "components/Coupon";
export default {
  components: {
    //  Coupon
  },
  data() {
    return {
      MostrarformaPago: false,
      formaPago: "",
      text: "",
      subtotal: 0.0,
      efectivo: 0.0,
      urlImage:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/items/",
      title: "Manage Cart Items",
      cartEmptyMessage: "Opps! Tu carrito está vacio",
      qty: 1,
      delivery: 200,
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
    directionNow() {
      return this.$store.state.global.directionNow;
    },
    carritoLenght() {
      return this.$store.state.carrito.carritoLenght;
    }
  },
  mounted() {
    console.log("Carrito:  ", this.carrito);
    let auxSubTotal = 0.0;
    this.carrito.forEach(element => {
      auxSubTotal = auxSubTotal + element.precio;
      element.adicionales.forEach(adicionales => {
        auxSubTotal = auxSubTotal + adicionales.precio;
      });
    });
    this.subtotal = auxSubTotal;
  },
  methods: {
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
    }
  }
};
</script>
