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
        >
          {{ list.nombre }}
        </div>
        <q-item
          v-for="(food, indexx) in list.items.items"
          :key="indexx"
          style="margin-top: -10px;"
        >
          <q-item-section thumbnail v-if="true" class="q-pl-sm">
            <img src="comida1.jpg" style="min-height:67px; width:90px" />
          </q-item-section>
          <q-item-section>
            <div class="column items-start justify-center" style="width: 155px">
              <q-item-label class="text-bold"> {{ food.nombre }} </q-item-label>
              <q-item-label caption> {{ food.descripcion }} </q-item-label>
              <q-item-label class="text-bold" style="font-size: 15px;" caption
                >$· {{ food.precioBase }}
              </q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="col items-end">
            <q-btn
              v-if="!food.quantity"
              style="margin-left: 45px;"
              outline
              size="sm"
              color="primary"
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
                  {{ food.quantity }}
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

    <q-dialog
      v-model="add"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
      style="height: 100%;"
    >
      <q-card
        class="bg-white text-black"
        style="height: 100%; width: 100%; margin-top: 0px; border: 1px solid black"
      >
        <q-list>
          <q-item>
            <q-item-section class="col items-end">
              <q-btn
                outline
                size="md"
                color="primary"
                icon="fas fa-times"
                @click="(add = false), (optionDrink = []), (optionFood = [])"
              />
            </q-item-section>
          </q-item>
          <div class="row">
            <div class="col-3">
              <q-item-section thumbnail class="q-pl-sm">
                <img src="comida1.jpg" style="min-height:67px; width:90px" />
              </q-item-section>
            </div>
            <div class="col-7">
              <q-item-label class="text-bold">
                {{ foodSelect.nombre }}
              </q-item-label>
              <q-item-label caption>
                {{ foodSelect.descripcion }}
              </q-item-label>
            </div>
            <div class="col">
              <q-item-label
                class="text-bold"
                style="font-size: 20px; float: right; margin-right: 20px"
                caption
                >${{ this.precioSeleccion }}
              </q-item-label>
            </div>
          </div>

          <div v-if="optionFood.length">
            <q-item>
              <q-item-section class="text-subtitle2 text bold text-grey-7">
                {{ optionFood[0].tipoRegistro }}
              </q-item-section>
            </q-item>
            <q-item
              clickable
              tag="label"
              v-ripple
              v-for="(option, index) in optionFood"
              :key="index"
              style="border: 1px solid; height: 10px; margin-top: 0px; padding-top: 0px"
            >
              <q-item-section avatar class="col column col-10">
                <div class="q-mt-md">
                  <q-radio
                    v-model="selecFood"
                    :val="option.nombre"
                    color="primary"
                    :label="option.nombre"
                    @input="selectOption(option)"
                  />
                </div>
              </q-item-section>
              <q-item-section class="col column col">
                <q-item-label
                  class="items-end text-subtitle1"
                  v-if="option.precio > 0"
                  >$ {{ option.precio }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>

          <div v-if="optionDrink.length">
            <q-item>
              <q-item-section class="text-subtitle2 text bold text-grey-7"
                >Adicionales</q-item-section
              >
            </q-item>
            <q-item
              clickable
              tag="label"
              v-ripple
              v-for="(option, index) in optionDrink"
              :key="index"
            >
              <q-item-section avatar class="col column col-10">
                <q-checkbox
                  class="self-start text-subtitle1"
                  v-model="selecDrink"
                  :val="option.nombre"
                  color="cyan"
                  :label="option.nombre"
                />
                <q-separator inset />
              </q-item-section>
              <q-item-section class="col column col">
                <q-item-label
                  class="items-end text-subtitle1"
                  v-if="option.precio > 0"
                >
                  $ {{ option.precio }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>

          <div class="col column items-center">
            <q-btn
              :disable="!selecFood"
              no-caps
              rounded
              label="Add"
              color="primary"
              class="q-mt-md"
              style="width: 90%; height: 50px"
              @click="addfood()"
            />
          </div>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { API, Auth } from "aws-amplify";
import { listItemss } from "./../graphql/queries";

export default {
  data() {
    return {
      precioSeleccion: 0.0,
      loading: false,
      add: false,
      model: 0,
      foodSelect: [],
      optionFood: [],
      optionDrink: [],
      selecFood: "",
      selecDrink: [],
      selected: {},
      listado: []
    };
  },
  computed: {
    ...mapState("generals", ["carro", "lista", "pru"])
  },
  computed: {
    negocioSelect() {
      return this.$store.state.global.negocioSelect;
    }
  },
  mounted() {
    console.log("🚀 ----> this.negocioSelect", this.negocioSelect);
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
      this.add = false;
      console.log(this.selected, this.selecFood, this.selecDrink);
    },
    optionList(opFood, opDrink, food) {
      this.add = true;
      this.selecFood = "";
      this.selecDrink = [];
      this.optionFood = opFood.items;
      this.optionDrink = opDrink.items;
      this.foodSelect = food;
      this.precioSeleccion = food.precioBase;
      console.log("🚀 ~ file: ", this.foodSelect);
      // if (!this.optionFood === false) {
      //   this.optionFood = opFood;
      // }
      // if (!this.optionDrink === false) {
      //   this.optionDrink = opDrink;
      // }
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
