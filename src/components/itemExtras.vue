<template>
  <!-- eslint-disable max-len -->
  <div style="z-index: 10000000">
    <q-dialog
      @before-show="cargaDatos"
      @hide="resetForm"
      v-model="add"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
      style="height: 100%; z-index: 10000000"
    >
      <q-card class="bg-white text-black mycard">
        <q-list>
          <q-item>
            <q-item-section class="col items-end">
              <q-btn
                outline
                size="md"
                color="primary"
                icon="fas fa-times"
                @click="closeDialog"
              />
            </q-item-section>
          </q-item>
          <div class="row">
            <div class="col-3">
              <q-item-section thumbnail class="q-pl-sm">
                <img src="comida1.jpg" class="imageFood" />
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
              <q-item-label class="text-bold myPrecio" caption
                >${{ this.precioSeleccion }}
              </q-item-label>
            </div>
          </div>
          <q-item dense v-for="(comOption, idx) in optionFood" :key="idx">
            <div class="row">
              <div class="col-sm-9">
                <div class="text-bold text-grey titleExtras">
                  {{ comOption.nombre }}
                </div>
                <div class="row">
                  <div class="col-24 col-sm-8">
                    <q-item
                      dense
                      clickable
                      tag="label"
                      v-ripple
                      v-for="(option, index) in comOption.items.items"
                      :key="index"
                    >
                      <q-item-section dense avatar>
                        <q-radio
                          v-if="idx == 0"
                          dense
                          @input="seleccion(option, 1)"
                          v-model="selecFood0"
                          :val="option.nombre"
                          :label="option.nombre"
                          color="primary"
                        >
                          <strong v-if="option.precio > 0" style="color: grey">
                            + ${{ option.precio }}</strong
                          >
                        </q-radio>

                        <q-radio
                          v-if="idx == 1"
                          dense
                          @input="seleccion(option, 1)"
                          v-model="selecFood1"
                          :val="option.nombre"
                          :label="option.nombre"
                          color="primary"
                        >
                          <strong v-if="option.precio > 0" style="color: grey">
                            + ${{ option.precio }}</strong
                          >
                        </q-radio>

                        <q-radio
                          v-if="idx == 2"
                          dense
                          @input="seleccion(option, 1)"
                          v-model="selecFood2"
                          :val="option.nombre"
                          :label="option.nombre"
                          color="primary"
                        >
                          <strong v-if="option.precio > 0" style="color: grey">
                            + ${{ option.precio }}</strong
                          >
                        </q-radio>

                        <q-radio
                          v-if="idx == 3"
                          dense
                          @input="seleccion(option, 1)"
                          v-model="selecFood3"
                          :val="option.nombre"
                          :label="option.nombre"
                          color="primary"
                        >
                          <strong v-if="option.precio > 0" style="color: grey">
                            + ${{ option.precio }}</strong
                          >
                        </q-radio>

                        <q-radio
                          v-if="idx == 4"
                          dense
                          @input="seleccion(option, 1)"
                          v-model="selecFood4"
                          :val="option.nombre"
                          :label="option.nombre"
                          color="primary"
                        >
                          <strong v-if="option.precio > 0" style="color: grey">
                            + ${{ option.precio }}</strong
                          >
                        </q-radio>
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
              </div>
              <q-separator inset v-if="idx + 1 != optionFood.length" />
            </div>
          </q-item>
          <q-separator color="primary" inset />
          <!-- aqui los extras   -->
          <q-item
            dense
            v-for="(optionextra, id) in optionExtras"
            :key="'a' + id"
          >
            <div class="column" style="height: 100%">
              <div class="col">
                <div class="text-bold text-grey titleExtras">
                  {{ optionextra.nombre }}
                </div>
              </div>
              <div
                class="col"
                v-if="opcionesExtras.length > 0"
                style="border: 0px solid"
              >
                <q-item
                  dense
                  clickable
                  tag="label"
                  v-ripple
                  v-for="(option, index) in optionextra.items.items"
                  :key="index"
                  style="border: 0px solid red; height: 1px;"
                >
                  <q-checkbox
                    v-model="opcionesExtras[id][index].valor"
                    :label="option.nombre"
                    color="primary"
                    @input="
                      seleccion(option, 2, opcionesExtras[id][index].valor)
                    "
                  >
                    <strong style="color: grey"> + ${{ option.precio }}</strong>
                  </q-checkbox>
                </q-item>
              </div>
            </div>
          </q-item>

          <div class="col column items-center">
            <q-btn
              :disable="!selecFood"
              no-caps
              rounded
              label="Agregar a Carrito"
              color="primary"
              class="q-mt-md"
              style="width: 90%; height: 50px"
              @click="addfood"
            />
          </div>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selecFood: "",
      selecFood0: "",
      selecFood1: "",
      selecFood2: "",
      selecFood3: "",
      selecFood4: "",
      selecFood5: "",
      selecFood6: "",
      opciones: [],
      opcionesExtras: []
    };
  },
  props: {
    foodSelect: null,
    precioSeleccion: null,
    optionFood: null,
    optionExtras: null
  },
  mounted() {
    //console.log("------>", this.optionFood);
  },
  computed: {
    negocioSelect() {
      return this.$store.state.global.negocioSelect;
    },
    add() {
      return this.$store.state.foodList.add;
    }
  },
  methods: {
    seleccion(objeto, tipo, value) {
      if (tipo == 1) {
        for (let index = 0; index < this.opciones.length; index++) {
          const element = this.opciones[index];
          if (element.idCategoriaComponente == objeto.idCategoriaComponente) {
            this.opciones.splice(index, 1);
          }
        }
        this.opciones.push(objeto);
      } else {
        if (!value) {
          for (let index = 0; index < this.opciones.length; index++) {
            const element = this.opciones[index];
            if (element.idCategoriaExtra) {
              if (element.idCategoriaExtra == objeto.idCategoriaExtra) {
                this.opciones.splice(index, 1);
              }
            }
          }
        } else {
          this.opciones.push(objeto);
        }
      }
      let lnOpciones = 0;
      this.opciones.forEach(element => {
        if (element.idCategoriaComponente) {
          lnOpciones = lnOpciones + 1;
        }
      });
      if (lnOpciones >= this.optionFood.length) {
        this.selecFood = true;
      }
      console.log("---------------------------------------");
      this.opciones.forEach(element => {
        console.log("🚀 --->", element.nombre);
      });
    },
    cargaDatos() {
      let n = 0;
      this.optionExtras.forEach(element => {
        this.opcionesExtras.push([]);
        element.items.items.forEach(item => {
          this.opcionesExtras[n].push({ valor: false, cantidad: 0 });
        });
        n = n + 1;
      });
    },
    closeDialog() {
      this.$store.commit("foodList/setadd", false);
      //(optionDrink = []), (optionFood = [])
    },
    resetForm() {
      const self = this;
      self.selecFood = "";
      self.selecFood0 = "";
      self.selecFood1 = "";
      self.selecFood2 = "";
      self.selecFood3 = "";
      self.selecFood4 = "";
      self.selecFood5 = "";
      self.selecFood6 = "";
      self.opcionesExtras = [];
      self.opciones = [];
    },
    addfood() {
      // console.log("Producto :::::::::>", this.foodSelect);
      // console.log("Agregar Carrito :::::::::>", this.opciones);
      let carrito = this.$store.state.carrito.carrito;
      let carritoTemp = [];
      carrito.forEach(element => {
        carritoTemp.push(element);
      });
      let carritoAux = {
        id: this.foodSelect.id,
        nombre: this.foodSelect.nombre,
        precio: this.foodSelect.precioBase,
        cantidad: 1,
        adicionales: this.opciones
      };
      carritoTemp.push(carritoAux);
      console.log(
        "🚀 ~ file: itemExtras.vue ~ line 319 ~ addfood ~ carritoTemp",
        carritoTemp
      );
      this.$store.commit("carrito/setcarrito", carritoTemp);
      // let NegocioGeneral = this.negocioSelect;
      // NegocioGeneral.element.categoriasItems.items.forEach(element => {
      //   element.items.items.forEach(element2 => {
      //     if (element2.id == carritoAux[0].id) {
      //       console.log("Entrando...........");
      //       if (element2.cantidad) {
      //         element2.cantidad = element2.cantidad + 1;
      //       } else {
      //         element2.cantidad = 1;
      //       }
      //     }
      //   });
      // });
      //this.$store.commit("global/setnegocioSelect", NegocioGeneral);
      this.$store.commit("foodList/setadd", false);
    }
  }
};
</script>

<style lang="sass" scoped>
.titleExtras
  width: 100%;
  font-size: 16px;
  margin-left: 20px;
  margin-top: 20px;
  border: 0px solid red;

.mycard
  height: 100%;
  width: 100%;
  margin-top: 0px;
  border: 1px solid black

.imageFood
  min-height: 67px;
  width: 90px;

.myPrecio
  font-size: 20px;
  float: right;
  margin-right: 20px;
</style>
