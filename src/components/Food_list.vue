<template>
  <div>
    <q-list>
      <div v-for="(list, index) in listado" :key="index">
        <div class="text-h6 q-pb-md q-pt-sm text-grey-7">{{ list.title }}</div>
        <q-item v-for="(food, indexx) in list.data" :key="indexx">
          <q-item-section thumbnail v-if="food.image" class="q-pl-sm">
            <img :src="food.image" style="min-height:67px; width:90px" />
          </q-item-section>

          <q-item-section>
            <div class="column items-start justify-center">
              <q-item-label class="text-bold"> {{ food.name }} </q-item-label>
              <q-item-label caption>₹· {{ food.price }} </q-item-label>
              <q-item-label caption> {{ food.description }} </q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="col items-end">
            <q-btn
              v-if="!food.quantity"
              outline
              size="md"
              color="primary"
              label="Agregar"
              @click="
                food.optionFood && food.optionDrink
                  ? optionList(food.optionFood, food.optionDrink)
                  : food.optionFood
                  ? optionList(food.optionFood, false)
                  : food.optionDrink
                  ? optionList(false, food.optionDrink)
                  : (add = false);
                selected = food;
              "
            />
            <div v-else>
              <div class="row justify-center items-center">
                <div class="col">
                  <q-btn
                    color="negative"
                    icon="remove"
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
                    icon="add"
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

    <q-dialog v-model="add" position="bottom">
      <q-card style="width: 100%; height: 700px">
        <q-list>
          <q-item>
            <q-item-section class="text-h5 text-bold text-grey-7"
              >Select Option</q-item-section
            >
            <q-item-section class="col items-end">
              <q-btn
                outline
                size="md"
                color="primary"
                icon="clear"
                @click="(add = false), (optionDrink = []), (optionFood = [])"
              />
            </q-item-section>
          </q-item>

          <div v-if="optionFood.length">
            <q-item>
              <q-item-section class="text-subtitle2 text bold text-grey-7"
                >Select Item Size</q-item-section
              >
            </q-item>
            <q-item
              clickable
              tag="label"
              v-ripple
              v-for="(option, index) in optionFood"
              :key="index"
            >
              <q-item-section avatar class="col column col-10">
                <q-radio
                  class="self-start text-subtitle1"
                  v-model="selecFood"
                  :val="option.op"
                  color="primary"
                  :label="option.op"
                />
                <q-separator inset />
              </q-item-section>
              <q-item-section class="col column col">
                <q-item-label class="items-end text-subtitle1"
                  >₹ {{ option.priceOp }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>

          <div v-if="optionDrink.length">
            <q-item>
              <q-item-section class="text-subtitle2 text bold text-grey-7"
                >You can also add some addon's</q-item-section
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
                  :val="option.op"
                  color="cyan"
                  :label="option.op"
                />
                <q-separator inset />
              </q-item-section>
              <q-item-section class="col column col">
                <q-item-label class="items-end text-subtitle1"
                  >₹ {{ option.priceOp }}</q-item-label
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
export default {
  data() {
    return {
      add: false,
      model: 0,
      optionFood: [],
      optionDrink: [],
      selecFood: "",
      selecDrink: [],
      selected: {},
      listado: [
        {
          title: "MainCourse",
          data: [
            {
              id: 1,
              image: "comida1.jpg",
              name: "comida1",
              price: "100",
              description: "Food Description",
              optionFood: [
                {
                  op: "Small",
                  priceOp: 100
                },
                {
                  op: "Medium",
                  priceOp: 100
                },
                {
                  op: "Large",
                  priceOp: 100
                }
              ],
              optionDrink: [
                {
                  op: "Cold Drink",
                  priceOp: 300
                }
              ]
            },
            {
              id: 2,
              image: "comida2.jpeg",
              name: "comida2",
              price: "300",
              description: "Food Description",
              optionFood: [
                {
                  op: "Small",
                  priceOp: 100
                },
                {
                  op: "Medium",
                  priceOp: 100
                },
                {
                  op: "Large",
                  priceOp: 100
                }
              ]
            },
            {
              id: 3,
              image: "comida3.jpeg",
              name: "comida3",
              price: "1000",
              description: "Food Description",
              optionFood: [
                {
                  op: "Small",
                  priceOp: 100
                }
              ],
              optionDrink: [
                {
                  op: "Cold Drink",
                  priceOp: 300
                }
              ]
            }
          ]
        },
        {
          title: "VegStarter",
          data: [
            {
              id: 4,
              image: "comida3.jpeg",
              name: "Food Name",
              price: "000",
              description: "Food Description",
              optionFood: [
                {
                  op: "Small",
                  priceOp: 100
                }
              ],
              optionDrink: [
                {
                  op: "Cold Drink",
                  priceOp: 300
                }
              ]
            },
            {
              id: 5,
              image: "comida3.jpeg",
              name: "Food Name",
              price: "000",
              description: "Food Description",
              optionFood: [
                {
                  op: "Small",
                  priceOp: 100
                },
                {
                  op: "Medium",
                  priceOp: 100
                }
              ],
              optionDrink: [
                {
                  op: "Cold Drink",
                  priceOp: 300
                }
              ]
            },
            {
              id: 6,
              image: "comida3.jpeg",
              name: "Food Name",
              price: "000",
              description: "Food Description",
              optionFood: [
                {
                  op: "Small",
                  priceOp: 100
                }
              ]
            }
          ]
        },
        {
          title: "FastFood",
          data: [
            {
              id: 7,
              image: "comida2.jpeg",
              name: "Food Name",
              price: "000",
              description: "Food Description",
              optionFood: [
                {
                  op: "Small",
                  priceOp: 100
                },
                {
                  op: "Medium",
                  priceOp: 100
                },
                {
                  op: "Large",
                  priceOp: 100
                }
              ],
              optionDrink: [
                {
                  op: "Cold Drink",
                  priceOp: 300
                }
              ]
            },
            {
              id: 8,
              image: "comida2.jpeg",
              name: "Food Name",
              price: "000",
              description: "Food Description",
              optionFood: [
                {
                  op: "Large",
                  priceOp: 100
                }
              ],
              optionDrink: [
                {
                  op: "Cold Drink",
                  priceOp: 300
                }
              ]
            }
          ]
        },
        {
          title: "GreenSalad",
          data: [
            {
              id: 9,
              image: "comida1.jpg",
              name: "Food Name",
              price: "000",
              description: "Food Description",
              optionFood: [
                {
                  op: "Small",
                  priceOp: 100
                },
                {
                  op: "Medium",
                  priceOp: 100
                }
              ]
            },
            {
              id: 10,
              image: "comida1.jpg",
              name: "Food Name",
              price: "000",
              description: "Food Description",
              optionFood: [
                {
                  op: "Medium",
                  priceOp: 100
                },
                {
                  op: "Large",
                  priceOp: 100
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState("generals", ["carro", "lista", "pru"])
  },
  mounted() {
    /* console.log(this.lista, 'holano')
    if (!this.lista) {
      console.log('holasi', this.listado)
      this.addshop({ data: false, listado: this.listado })
       this.lista = this.listado
      console.log(this.lista, this.pru)
    } */
    //console.log(this.carro, 'holano')
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
    optionList(opFood, opDrink) {
      this.add = true;
      this.selecFood = "";
      this.selecDrink = [];
      if (!this.optionFood === false) {
        this.optionFood = opFood;
      }
      if (!this.optionDrink === false) {
        this.optionDrink = opDrink;
      }
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
