<template>
  <div>
    <q-list>
      <div
        v-for="(list, index) in negocioSelect.element.categoriasItems.items"
        :key="index"
      >
        <div
          class="text-h6 q-pb-md q-pt-sm text-grey-7"
          style="margin-top: -10px;"
          v-if="list.items.items.length > 0"
        >
          {{ list.nombre }}
        </div>
        <q-item
          v-for="(food, indexx) in list.items.items"
          :key="indexx"
          style="margin-top: -10px;"
        >
          <q-item-section thumbnail v-if="true" class="q-pl-sm">
            <!-- <img style="width: auto" :src="urlImage + item.id + '.jpg'" /> -->
            <img
              :src="urlImage + food.id"
              style="min-height:67px; width:90px"
            />
          </q-item-section>
          <q-item-section>
            <div
              class="column items-start"
              style="width: 155px; border: 0px blue solid; min-height: 68px"
            >
              <q-item-label class="text-bold"> {{ food.nombre }} </q-item-label>
              <q-item-label lines="2" caption>
                {{ food.descripcion }}
              </q-item-label>
              <q-item-label class="text-bold" style="font-size: 15px;" caption
                >$· {{ food.precioBase }}
              </q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="col items-end">
            <q-btn
              v-if="true"
              style="margin-left: 45px;"
              size="sm"
              rounded
              color="red-10"
              label="Agregar"
              @click="
                optionList(food.listadoComponentes, food.listadoExtras, food)
              "
            />
            <div v-else>
              <div class="row justify-center items-center">
                <div class="col">
                  <q-btn
                    color="negative"
                    icon="fas fa-minus"
                    class=""
                    style="border-radius: 6px; height:23px; width:29px; font-size:8px"
                    @click="
                      modificar_cantidad(false, food.id, food, index, indexx)
                    "
                  />
                </div>
                <div class="col q-ml-xs row justify-center">
                  {{ food.cantidad }}
                </div>
                <div class="col">
                  <q-btn
                    color="positive"
                    class=""
                    icon="fas fa-plus"
                    style="border-radius: 6px; height:23px; width:29px; font-size:8px"
                    @click="
                      modificar_cantidad(true, food.id, food, index, indexx)
                    "
                  />
                </div>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
    <itemExtrass
      :foodSelect="this.foodSelect"
      :precioSeleccion="this.precioSeleccion"
      :optionFood="this.optionFood"
      :optionExtras="this.optionDrink"
    />
  </div>
</template>

<script>
import itemExtrass from "../components/itemExtras";
import { mapState, mapMutations } from "vuex";
import { API, Auth } from "aws-amplify";
import { listItemss } from "./../graphql/queries";

export default {
  components: {
    itemExtrass
  },
  data() {
    return {
      urlImageNegocio:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/negocios/",
      urlImage:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/items/",
      precioSeleccion: 0.0,
      loading: false,
      model: 0,
      foodSelect: [],
      optionFood: [],
      optionDrink: [],
      selecDrink: [],
      selected: {},
      listado: []
    };
  },
  props: {
    datosNegocio: null
  },
  computed: {
    ...mapState("generals", ["carro", "lista", "pru"])
  },
  computed: {
    negocioSelect() {
      return this.$store.state.global.negocioSelect;
    },
    carrito() {
      return this.$store.state.carrito.carrito;
    },
    carritoLenght() {
      return this.$store.state.carrito.carritoLenght;
    }
  },
  watch: {
    negocioSelect(Valores, o) {}
  },
  mounted() {
    if (this.carro) {
      this.actualizar();
    }
  },
  methods: {
    ...mapMutations("generals", ["addshop", "addshop2"]),
    actualizar() {
      for (let x = 0; x < this.carro.length; x++) {
        for (let a = 0; a < this.listado.length; a++) {
          for (let b = 0; b < this.listado[a].data.length; b++) {
            if (this.listado[a].data[b].id === this.carro[x].id) {
              // console.log('generals', this.listado)
              this.listado[a].data[b].quantity = this.carro[x].quantity;
            }
          }
        }
      }
      console.log(this.listado);
    },
    selectOption(option) {
      console.log("object");
      console.log(
        "🚀 ~ file: Food_list.vue ~ line 261 ~ selectOption ~ option",
        option
      );
    },
    modificar_cantidad(accion, id, record, index, index2) {
      for (let x = 0; x < this.carro.length; x++) {
        if (this.carro[x].id === id) {
          if (accion) {
            this.carro[x].quantity++;
            record.quantity = this.carro[x].quantity;
            this.$set(this.listado[index].data, index2, record);
          } else {
            console.log(!this.carro[x].quantity === 0, "generals");
            if (this.carro[x].quantity > 0) {
              console.log(this.carro[x].quantity, "generals");
              this.carro[x].quantity--;
              record.quantity = this.carro[x].quantity;
              this.$set(this.listado[index].data, index2, record);
            }
          }
        }
      }
      this.addshop2(this.carro);
      this.actualizar();
    },
    addfood() {
      this.selected.quantity = 1;
      this.selected.selecFood = this.selecFood;
      this.selected.selecDrink = this.selecDrink;
      console.log(this.lista);
      if (this.lista) {
        this.lista.map(v => {
          if (v.id === this.selected.id) {
            return {
              ...v,
              quantity: 1
            };
          } else {
            return v;
          }
        });
      } else {
        this.listado.map(v => {
          if (v.id === this.selected.id) {
            return {
              ...v,
              quantity: 1
            };
          } else {
            return v;
          }
        });
      }

      var data = {
        data: this.selected,
        listado: this.lista ? this.lista : this.listado
      };
      this.addshop(data);
      this.selected = {};
      //console.log(this.selected, this.selecFood, this.selecDrink);
    },
    optionList(opFood, opDrink, food) {
      this.selecFood = "";
      this.selecDrink = [];
      this.optionFood = opFood.items;
      this.optionDrink = opDrink.items;
      this.foodSelect = food;
      this.precioSeleccion = food.precioBase;
      this.$store.commit("foodList/setadd", true);
    },
    cont(i) {
      this.i++;
    }
  }
};
</script>

<style>
.responsive {
  width: 100%;
  height: auto;
}
.boton_personalizado {
  text-decoration: none;
  padding: 10px;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  background-color: #1883ba;
  border-radius: 6px;
  border: 2px solid #0016b0;
}
</style>
