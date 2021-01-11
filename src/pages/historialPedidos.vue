<template>
  <div>
    <q-list>
      <div>
        <div
          class="text-h6 q-pb-md q-pt-sm text-grey-7"
          style="margin-top: -10px;"
        >
          Mis Pedidos
        </div>
        <q-item
          v-for="(pedidos, indexx) in data"
          :key="indexx"
          style="margin-top: -10px;"
        >
          <q-item-section>
            <div
              class="column items-start"
              style="width: 155px; border: 0px blue solid; min-height: 68px"
            >
              <q-item-label class="text-bold">
                KFC{{ pedidos.nombre }}
              </q-item-label>
              <q-item-label lines="2" caption>
                Pollo y mas pollo{{ pedidos.descripcion }}
              </q-item-label>
              <q-item-label class="text-bold" style="font-size: 15px;" caption
                >$1456454
                {{ pedidos.precioBase }}
              </q-item-label>
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";
import { listPedidoss } from "./../graphql/queries";

export default {
  data() {
    return {
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
            direction: "des",
            field: "createdAt"
          }
        })
      )
      .then(data => {
        let datosItem = data.data.listPedidoss.items;
        console.log(
          "🚀 ~ file: historialPedidos.vue ~ line 111 ~ mounted ~ datosItem",
          datosItem
        );
        self.data = datosItem;
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
  methods: {}
};
</script>

<style></style>
