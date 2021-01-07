<template>
  <div>
    <div v-if="progress1 < 1">
      <div class="text-h5 text-primary text-center" style="margin-top: 5px;">
        Estamos procesando tu pedido
      </div>
      <div
        class="text-h8 text-primary text-center"
        style="margin: 0px 20px 10px 20px;"
      >
        Tienes 10 Segundos para cancelarlo.
      </div>
      <div
        class="q-pa-md"
        style="margin-top: 50px; display: flex;  justify-content: center;"
      >
        <q-linear-progress
          size="35px"
          :value="progress1"
          color="red-10"
          style="width: 250px;"
        >
          <div class="absolute-full flex flex-center">
            <q-badge color="white" text-color="black" :label="progressLabel1" />
          </div>
        </q-linear-progress>
      </div>
      <div class="q-pa-md ">
        <q-btn
          style="width: 250px;"
          class="fixed-center q-mt-md"
          color="red-10"
          rounded
          label="Cancelar"
          push
          @click="cancelaPedido"
        />
      </div>
    </div>
    <div v-else>
      <div class="text-h5 text-primary text-center" style="margin-top: 5px;">
        Su Pedido ha sido recibido
      </div>
      <div class="q-pa-md">
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 1"
                src="iconos_pedido_recibido_negro-01.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_pedido_recibido_rojo-01.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 1">Recibimos tu pedido</strong>
            <strong style="color: red;" v-else>Recibimos tu pedido</strong>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 2"
                src="iconos_confirmado_negro.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_confirmado_rojo-01.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 2">Pedido Confrmado </strong>
            <strong style="color: red;" v-else>Pedido Confrmado </strong>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 3"
                src="iconos_preparando_pedido_negro.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_preparando_pedido_rojo.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 3">Estamos preparando tu pedido</strong>
            <strong style="color: red;" v-else
              >Estamos preparando tu pedido</strong
            >
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 4"
                src="iconos_pedido_en_camino_negro-01.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_pedido_en_camino__rojo.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 4">Su pedido va en camino</strong>
            <strong style="color: red;" v-else>Su pedido va en camino</strong>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 5"
                src="iconos_pedido_entregado__negro-01.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_pedido_entregado__rojo-01.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 5">Pedido Entregado</strong>
            <strong style="color: red;" v-else>Pedido Entregado</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";
import { createPedidos, createItemsPedidos } from "./../graphql/mutations";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      progress1: 0.0,
      progressLabel1: 0.0,
      step: 0
    };
  },
  computed: {
    carrito() {
      return this.$store.state.carrito.carrito;
    },
    variables() {
      return this.$store.state.carrito.variables;
    }
    // progressLabel1() {
    //   return (this.progress1 * 100).toFixed(2) + "%";
    // }
  },
  watch: {
    async progress1(Valores, o) {
      const self = this;
      if (self.progress1 >= 1) {
        if (Valores == 1) {
          var id = await setInterval(function() {
            self.step++;
            if (self.step == 1) {
              self.procesarpedido();
            }
            if (self.step >= 6) {
              console.log("----->aqui");
              clearInterval(id);
              self.$router.push("/restaurant");
            }
          }, 3000);
        }
      }
    }
  },
  async mounted() {
    let cont = 0;
    const self = this;
    if (self.progress1 < 1) {
      var id = await setInterval(function() {
        self.progress1 = cont / 10;
        self.progressLabel1 = cont + " Segundo";
        cont++;
        if (cont == 11) {
          clearInterval(id);
        }
      }, 1000);
    } else {
    }
  },
  methods: {
    procesarpedido() {
      const self = this;
      const xVariable = this.variables;
      const idItemPedido = uuidv4();
      console.log("🚀 line 208 xVariable: ", xVariable);

      Auth.currentUserInfo()
        .then(async () => {
          await self.$API
            .graphql(
              self.$API.graphqlOperation(createPedidos, {
                input: self.variables
              })
            )
            .then(async data => {
              console.log("grabarDatos -> data", data);
              let xvariableItem = [];
              self.carrito.forEach(element => {
                xvariableItem.push({
                  estado: true,
                  id: idItemPedido,
                  idItems: element.id,
                  idPedido: self.variables.codigoPedido
                });
              });
              console.log("grabarDatos -> data", data);
              self.$store.commit("carrito/setcarrito", []);
              self.$store.commit("carrito/setcarritoLenght", 0);
              self.$store.commit("carrito/setEstado", "Pedido");
              self.$router.push("/seguimientoPedido");

              //   await self.$API
              //     .graphql(
              //       self.$API.graphqlOperation(createItemsPedidos, {
              //         input: xvariableItem
              //       })
              //     )
              //     .then(data => {
              //       console.log("grabarDatos -> data", data);
              //       self.$store.commit("carrito/setcarrito", []);
              //       self.$store.commit("carrito/setcarritoLenght", 0);
              //       self.$store.commit("carrito/setEstado", "Pedido");
              //       self.$router.push("/seguimientoPedido");
              //     })
              //     .catch(e => {
              //       console.log("TCL: e", e);
              //     });
            })
            .catch(e => {
              console.log("TCL: e", e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    },
    cancelaPedido() {
      // this.$store.commit("carrito/setcarritoLenght", 0);
      // this.$store.commit("carrito/setcarrito", []);
      // this.$store.commit("carrito/setEstado", "Pedido");
      this.$router.push("/restaurant");
    }
  }
};
</script>

<style></style>
