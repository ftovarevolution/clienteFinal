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
      <q-card
        class="bg-white text-black mycard"
        style="border: 0px solid; padding-bottom: 200px;"
      >
        <q-list>
          <q-item>
            <q-item-section class="col-1" style="margin-left: -20px">
              <q-btn
                flat
                size="md"
                color="primary"
                icon="fas fa-times"
                @click="closeDialog"
              />
            </q-item-section>
          </q-item>
          <div class="row q-ml-md">
            <div class="col-12" style="width: 100%; border: red 0px solid">
              <img
                class="image1"
                :src="urlImage + foodSelect.id"
                style="margin-left:-10px; max-height:160px; min-height:160px; width: 100%"
              />
            </div>
          </div>
          <div class="row q-ml-md">
            <div class="col-9">
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
            <div class="row" style="min-width: 100%; margin-left: 0px;">
              <div class="col-11" style="min-width: 100%; ">
                <div
                  class="text-bold text-grey-8 titleExtras bg-grey-3"
                  style="border: 0px solid; min-width: 100%; margin-left: 0px; height: 40px;"
                >
                  <div
                    class="q-ml-md q-pt-sm"
                    style="pading-top: 12px; border: 0px solid red"
                  >
                    {{ comOption.nombre }}
                  </div>
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
              <!-- <q-separator inset v-if="idx + 1 != optionFood.length" /> -->
            </div>
          </q-item>
          <!-- <q-separator color="primary" inset /> -->
          <!-- aqui los extras   -->
          <div dense v-for="(optionextra, id) in optionExtras" :key="'a' + id">
            <div class="row">
              <div class="col-11 q-ml-md">
                <div
                  class="text-bold text-grey-8 titleExtras bg-grey-3"
                  style="border: 0px solid; min-width: 100%; margin-left: 0px; height: 40px;"
                >
                  <div class="q-ml-md q-pt-sm">
                    {{ optionextra.nombre }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row"
              style="min-width: 100%; border: 0px solid;"
              v-if="opcionesExtras.length > 0"
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
                <div class="row" style="min-width: 400px;">
                  <div class="col-12">
                    <q-checkbox
                      v-model="opcionesExtras[id][index].valor"
                      :label="option.nombre"
                      color="primary"
                      @input="
                        seleccion(option, 2, opcionesExtras[id][index].valor)
                      "
                    >
                      <strong style="color: grey">
                        + ${{ option.precio }}</strong
                      >
                    </q-checkbox>
                  </div>
                </div>
              </q-item>
            </div>
          </div>
        </q-list>
        <q-footer reveal class="bg-white text-black">
          <div style="text-align: center; margin-bottom: 16px; font-size: 20px">
            <div class="row justify-center items-center q-mt-lg">
              <div class="col-4">
                <q-btn
                  color="negative"
                  icon="fas fa-minus"
                  style="border-radius: 6px; height:23px; width:29px; font-size:8px; float: right;"
                  @click="modificar_cantidad(false)"
                />
              </div>
              <div class="col q-ml-xs row justify-center">
                {{ this.cantidad }}
              </div>
              <div class="col">
                <q-btn
                  color="positive"
                  icon="fas fa-plus"
                  style="border-radius: 6px; height:23px; width:29px; font-size:8px; float: left;"
                  @click="modificar_cantidad(true)"
                />
              </div>
            </div>
            <div class="col column items-center q-mb-xl">
              <q-btn
                :disable="!selecFood"
                no-caps
                rounded
                label="Agregar al Carrito"
                color="primary"
                class="q-mt-md"
                style="width: 90%; height: 50px"
                @click="addfood"
              />
            </div>
          </div>
        </q-footer>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlImageNegocio:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/negocios/",
      urlImage:
        "https://bucket-onway154115-dev.s3-us-west-2.amazonaws.com/items/",
      selecFood: "",
      selecFood0: "",
      selecFood1: "",
      selecFood2: "",
      selecFood3: "",
      selecFood4: "",
      selecFood5: "",
      selecFood6: "",
      opciones: [],
      opcionesExtras: [],
      cantidad: 1
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
    modificar_cantidad(accion) {
      if (accion) {
        if (this.cantidad < 20) {
          this.cantidad++;
        }
      } else {
        if (this.cantidad > 1) {
          this.cantidad--;
        }
      }
    },
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
      this.cantidad = 1;
      let n = 0;
      this.optionExtras.forEach(element => {
        this.opcionesExtras.push([]);
        element.items.items.forEach(item => {
          this.opcionesExtras[n].push({ valor: false, cantidad: 0 });
        });
        n = n + 1;
      });
      if (n == 0) {
        this.selecFood = true;
      }
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
    async validaNEgocioDiferente() {
      let self = this;
      await self.$q
        .dialog({
          title: "Atencion!",
          message:
            "En su carrito ya existen productos de otro local comercial. Si continua se borrará los productos en el carrito",
          ok: {
            push: true,
            color: "positive",
            label: "Continuar"
          },
          cancel: {
            push: true,
            color: "negative",
            label: "Cancelar"
          },
          persistent: true
        })
        .onOk(() => {
          return true;
        })
        .onCancel(() => {
          return false;
        });
    },
    cuentaCarrito(Valores) {
      let totalItem = 0;
      Valores.forEach(element => {
        totalItem = totalItem + element.cantidad;
      });
      this.$store.commit("carrito/setcarritoLenght", totalItem);
    },
    addfood() {
      let self = this;
      const valEnCarrito = self.$store.state.carrito.idnegocio;
      let carrito = self.$store.state.carrito.carrito;
      let carritoTemp = [];
      if (valEnCarrito != self.negocioSelect.element.id && carrito.length > 0) {
        self.$q
          .dialog({
            title: "Atencion!",
            message:
              "En su carrito ya existen productos de otro local comercial. Si continua se borrará los productos en el carrito",
            ok: {
              push: true,
              color: "positive",
              label: "Continuar"
            },
            cancel: {
              push: true,
              color: "negative",
              label: "Cancelar"
            },
            persistent: true
          })
          .onOk(() => {
            self.$store.commit("carrito/setcarrito", carritoTemp);
            carrito = [];
            let carritoAux = {
              id: self.foodSelect.id,
              nombre: self.foodSelect.nombre,
              precio: self.foodSelect.precioBase,
              cantidad: self.cantidad,
              adicionales: self.opciones
            };
            carritoTemp.push(carritoAux);
            const lat = self.negocioSelect.element.geolocacion.lat;
            const lon = self.negocioSelect.element.geolocacion.lon;
            self.$store.commit("carrito/setcarrito", carritoTemp);
            self.$store.commit(
              "carrito/setidnegocio",
              self.negocioSelect.element.id
            );
            this.cuentaCarrito(carritoTemp);
            self.$store.commit("carrito/setnegocioLat", lat);
            self.$store.commit("carrito/setnegocioLon", lon);
            self.$store.commit("foodList/setadd", false);
          })
          .onCancel(() => {
            return;
          });
      } else {
        carrito.forEach(element => {
          carritoTemp.push(element);
        });
        let carritoAux = {
          id: self.foodSelect.id,
          nombre: self.foodSelect.nombre,
          precio: self.foodSelect.precioBase,
          cantidad: self.cantidad,
          adicionales: self.opciones
        };
        carritoTemp.push(carritoAux);
        const lat = self.negocioSelect.element.geolocacion.lat;
        const lon = self.negocioSelect.element.geolocacion.lon;
        self.$store.commit("carrito/setcarrito", carritoTemp);
        self.$store.commit(
          "carrito/setidnegocio",
          self.negocioSelect.element.id
        );
        self.cuentaCarrito(carritoTemp);
        self.$store.commit("carrito/setnegocioLat", lat);
        self.$store.commit("carrito/setnegocioLon", lon);
        self.$store.commit("foodList/setadd", false);
      }
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
  border: 0px solid black

.imageFood
  min-height: 67px;
  width: 90px;

.myPrecio
  font-size: 20px;
  float: right;
  margin-right: 20px;
</style>
