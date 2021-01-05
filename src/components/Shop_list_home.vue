<template>
  <div>
    <q-list class="bg-grey-4">
      <div v-if="search" class="text-black">Buscando "{{ this.search }}""</div>
      <q-item
        class="bg-white"
        clickable
        v-ripple
        v-for="(shop, index) in data"
        :key="index"
        @click="goToSelect(shop)"
        style="border: blue 0px solid; margin-bottom: 8px; display: flex; justify-content: center; align-items: center;"
      >
        <q-item-section
          thumbnail
          v-if="shop.image"
          style="width: 100%; padding-left: 0px; margin-left: 0px ; border: red 0px solid"
        >
          <img
            :src="urlImage + shop.element.id"
            style="min-height:140px; width: 100%"
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
      urlImage:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/negocios/",
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
    async logout() {
      this.$store.commit("login/setRegister", false);
      this.$store.commit("login/setUserVerify", "");
      this.$store.commit("login/setVerify", false);
      this.$store.commit("global/setLoginew", true);
      try {
        localStorage.register = "false";
        await this.$Auth.signOut();
        this.$router.push("/login");
      } catch (error) {
        console.log("error signing out: ", error);
        this.$router.push("/");
      }
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
            });
            self.loading = false;
          }
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
    }
  }
};
</script>

<style lang="css" scoped></style>
