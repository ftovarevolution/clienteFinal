<template>
  <div>
    <q-list>
      <div class="q-pl-md">
        <div
          class="text-h6 q-pb-md q-pt-sm text-grey-7"
          style="margin-top: -10px;"
        >
          Mis Pedidos
        </div>
        <div v-for="(pedidos, indexx) in data" :key="indexx">
          <q-item style="margin-top: -10px;">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="urlImage + pedidos.idNegocio" />
                </q-avatar>
              </q-item-section>
              <q-item-section @click="elijePedido(pedidos)">
                <q-item-label lines="1">{{
                  pedidos.datosNegocio.nombre
                }}</q-item-label>
                <q-item-label caption lines="2" style="width: 200px">
                  {{ pedidos.datosNegocio.descripcion }}
                </q-item-label>
                <q-item-label caption lines="2" style="width: 200px">
                  {{ pedidos.fecha }}
                </q-item-label>
              </q-item-section>

              <q-item-section class="text-weight-bold" side top>
                $ {{ pedidos.total }}
              </q-item-section>
            </q-item>
          </q-item>
          <q-separator />
        </div>
      </div>
    </q-list>
    <orderDetail :orden="this.orden" />
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";
import { listPedidoss } from "./../graphql/queries";
import orderDetail from "../components/orderDetail";

export default {
  components: {
    orderDetail
  },
  data() {
    return {
      urlImage:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/logos/",
      orden: [],
      name: "Franklin Tovar",
      data: []
    };
  },
  computed: {},
  async mounted() {
    const self = this;
    await self.$API
      .graphql(
        self.$API.graphqlOperation(listPedidoss, {
          filter: {
            idCliente: { eq: localStorage.SubID }
          },
          sort: {
            direction: "asc",
            field: "createdAt"
          }
        })
      )
      .then(data => {
        let datosItem = data.data.listPedidoss.items;
        self.data = datosItem;
        self.data.forEach(element => {
          let day = element.createdAt.substr(8, 2);
          let month = element.createdAt.substr(5, 2);
          let year = element.createdAt.substr(0, 4);
          let datof = day + "-" + month + "-" + year;
          element.fecha = datof;
        });

        // let ranking = 0;
        // if (datosItem.length > 0) {
        //   datosItem.forEach(async element => {
        //     ranking = await this.calculateRanking(element.id);
        //     self.data.push({
        //       element,
        //       image: element.profile,
        //       rating: ranking,
        //       tiempo: "25-30min",
        //       estado: true
        //     });
        //   });
        //   self.loading = false;
        // }
      })
      .catch(e => {
        self.loading = false;
        console.log("TCL1: error", e);
        switch (e.code) {
          case "NotAuthorizedException":
            this.logout();
            break;

          default:
            this.logout();
            break;
        }
      });
  },
  methods: {
    elijePedido(pedido) {
      this.orden = pedido;
      this.$store.commit("home/setMyOrdenDialog", true);
    }
  }
};
</script>

<style></style>
