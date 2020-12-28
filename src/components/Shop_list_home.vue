<template>
  <div>
    <q-list class="bg-grey-4">
      <div v-if="search" class="q-pa-md text-black">
        Searching for "{{ this.search }}""
      </div>
      <q-item
        class="bg-white"
        clickable
        v-ripple
        v-for="(shop, index) in data"
        :key="index"
        @click="goToSelect(shop)"
        style="border: red 0px solid; margin-bottom: 8px;"
      >
        <q-item-section
          thumbnail
          v-if="shop.image"
          class="q-pl-sm"
          style="width: 100%; padding-right: 0px; margin-right:0px ; border: red 0px solid"
        >
          <img
            :src="shop.image"
            style="margin-left:-10px; min-height:140px; width: 116%"
          />
          <div class="column items-start justify-center">
            <q-item-label style="font-size: 38px" class="text-bold text-black">
              {{ shop.element.nombre }}
            </q-item-label>
            <q-rating
              readonly
              no-dimming
              v-model="shop.rating"
              max="5"
              color-half="red-10"
              color-selected="red-10"
              color="black"
              size="20px"
              icon="fas fa-star"
              icon-selected="fas fa-star"
              icon-half="fad fa-star-half"
            />
            <q-item-label class="text-black" style="font-size: 18px" caption>
              {{ shop.tiempo }}
            </q-item-label>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";
import { listNegocioss, listRankingNegocioss } from "./../graphql/queries";

export default {
  data() {
    return {
      data: [],
      dataAll: []
    };
  },
  mounted() {
    this.readData();
  },
  props: {
    idServicios: null,
    search: null
  },
  methods: {
    goToSelect(negocio) {
      this.$store.commit("global/setnegocioSelect", negocio);
      localStorage.negocioSelect = negocio;
      this.$router.push("/item");
    },
    async calculateRanking(id) {
      const self = this;
      let resultado = 5;
      await self.$API
        .graphql(
          self.$API.graphqlOperation(listRankingNegocioss, {
            filter: {
              idNegocio: { eq: id }
            }
          })
        )
        .then(data => {
          let datosItem = data.data.listRankingNegocioss.items;
          if (datosItem.length > 0) {
            let valorRank = 0;
            let count = datosItem.length;
            let values = [];
            datosItem.forEach(element => {
              valorRank = element.valor;
              values.push(valorRank);
            });
            let sum = values.reduce(
              (previous, current) => (current += previous)
            );
            let avg = sum / count;
            resultado = avg;
          }
        })
        .catch(e => {
          console.log("TCL: e", e);
        });
      return resultado;
    },
    async readData() {
      const self = this;
      self.loading = true;
      self.data = [];
      self.dataAll = [];
      await self.$API
        .graphql(
          self.$API.graphqlOperation(listNegocioss, {
            filter: {
              idCategoria: { eq: self.idServicios }
            },
            sort: {
              direction: "asc",
              field: "nombre"
            }
          })
        )
        .then(data => {
          let datosItem = data.data.listNegocioss.items;
          let ranking = 0;
          if (datosItem.length > 0) {
            datosItem.forEach(async element => {
              ranking = await this.calculateRanking(element.id);
              self.data.push({
                element,
                image: element.profile,
                rating: ranking,
                tiempo: "25-30min"
              });

              // self.data.push({
              //   image: element.profile,
              //   id: element.id,
              //   nombre: element.nombre,
              //   rating: ranking,
              //   descripcion: element.descripcion,
              //   tiempo: "25-30min"
              // });
            });
            self.loading = false;
          }
        })
        .catch(e => {
          self.loading = false;
          console.log("TCL: error", e);
        });
    }
  }
};
</script>

<style lang="css" scoped>
.responsive {
  width: 100%;
  height: auto;
}
</style>
