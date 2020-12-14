<template>
  <div v-if="this.NumberOfServices > 0" class="q-pa-md">
    <div class="text-left text-h6 text-red text-weight-bold">
      Tipo de {{ NameService }}
    </div>
    <br />
    <q-scroll-area
      horizontal
      style="height: 60px; min-width:320px;"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <div class="row no-wrap">
        <q-btn
          v-for="(button, index) in buttons"
          :key="index"
          bordered
          class="q-mr-md"
        >
          <div class="column">
            <q-icon style="margin: auto" left size="sm" :name="button.image" />
            <div class="item">{{ button.Nombre }}</div>
          </div>
        </q-btn>
      </div>
    </q-scroll-area>
  </div>
</template>
<script>
import { API, Auth } from "aws-amplify";
import { listSubCategoriass } from "./../graphql/queries.js";

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      barStyle: {
        right: "2px",
        borderRadius: "1px",
        backgroundColor: "rgb(2, 123, 227, 0)",
        width: "1px",
        opacity: 0.2
      },
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "rgb(2, 123, 227, 0)",
        width: "5px",
        opacity: 0.75
      },
      buttons: [
        {
          image: "img:https://image.flaticon.com/icons/png/512/184/184531.png",
          Nombre: "Pollo"
        },
        {
          image:
            "img:https://i.pinimg.com/originals/59/aa/6e/59aa6e282f8492a3e5b26636894864ae.png",
          Nombre: "Mexicano"
        },
        {
          image: "img:https://img.icons8.com/emoji/452/hamburger-emoji.png",
          Nombre: "Hamburguesas"
        },
        {
          image:
            "img:https://image.flaticon.com/icons/png/512/1046/1046842.png",
          Nombre: "Chino"
        },
        {
          image:
            "img:https://image.flaticon.com/icons/png/128/1404/1404945.png",
          Nombre: "Pizza"
        }
      ]
    };
  },
  computed: {
    NameService() {
      return this.$store.state.global.NameService;
    },
    NumberOfServices() {
      return this.buttons.length;
    }
  },
  mounted() {
    let self = this;
    self.readData();
  },
  methods: {
    async readData() {
      console.log("Leyendo la data");
      const self = this;
      self.loading = true;
      await self.$API
        .graphql(
          self.$API.graphqlOperation(listSubCategoriass, {
            sort: {
              direction: "asc",
              field: "nombre"
            }
          })
        )
        .then(data => {
          //console.log(data.data.listSubCategoriass.items);
          self.tableData = data.data.listSubCategoriass.items;
          self.loading = false;
        })
        .catch(e => {
          self.loading = false;
          console.log("TCL: e", e);
        });
    }
  }
};
</script>
<style lang="css" scoped>
.item {
  font-size: 9px;
  color: #666;
  white-space: nowrap;
}
</style>
