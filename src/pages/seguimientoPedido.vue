<template>
  <div>
    <div v-if="progress1 < 1">
      <div class="text-h5 text-primary text-center" style="margin-top: 5px;">
        Estamos procesando tu pedido
      </div>
      <div
        class="text-h8 text-primary text-center"
        style="margin: 0px 20px 10px 20px;"
      >
        Tienes 1 Minuto para cancelarlo.
      </div>
      <div
        class="q-pa-md"
        style="margin-top: 50px; display: flex;  justify-content: center;"
      >
        <q-linear-progress
          size="35px"
          :value="progress1"
          color="red-10"
          style="width: 250px;"
        >
          <div class="absolute-full flex flex-center">
            <q-badge color="white" text-color="black" :label="progressLabel1" />
          </div>
        </q-linear-progress>
      </div>
      <div class="q-pa-md ">
        <q-btn
          style="width: 250px;"
          class="fixed-center q-mt-md"
          color="red-10"
          rounded
          label="Cancelar"
          push
          @click="cancelaPedido"
        />
      </div>
    </div>
    <div v-else>
      <div class="text-h5 text-primary text-center" style="margin-top: 5px;">
        Su Pedido ha sido recibido
      </div>
      <div class="q-pa-md">
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 1"
                src="iconos_pedido_recibido_negro-01.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_pedido_recibido_rojo-01.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 1">Recibimos tu pedido</strong>
            <strong style="color: red;" v-else>Recibimos tu pedido</strong>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 2"
                src="iconos_confirmado_negro.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_confirmado_rojo-01.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 2">Pedido Confrmado </strong>
            <strong style="color: red;" v-else>Pedido Confrmado </strong>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 3"
                src="iconos_preparando_pedido_negro.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_preparando_pedido_rojo.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 3">Estamos preparando tu pedido</strong>
            <strong style="color: red;" v-else
              >Estamos preparando tu pedido</strong
            >
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 4"
                src="iconos_pedido_en_camino_negro-01.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_pedido_en_camino__rojo.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 4">Su pedido va en camino</strong>
            <strong style="color: red;" v-else>Su pedido va en camino</strong>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <q-item-section thumbnail class="q-pl-sm">
              <img
                v-if="step < 5"
                src="iconos_pedido_entregado__negro-01.svg"
                class="imageFood"
              />
              <img
                v-else
                src="iconos_pedido_entregado__rojo-01.svg"
                class="imageFood"
              />
            </q-item-section>
          </div>
          <div class="col-8 text-left flex flex-center">
            <strong v-if="step < 5">Pedido Entregado</strong>
            <strong style="color: red;" v-else>Pedido Entregado</strong>
          </div>
        </div>
      </div>
    </div>
    <q-page-sticky
      v-if="progress1 >= 1"
      position="bottom-right"
      :offset="[28, 88]"
    >
      <q-btn
        @click="addchat = true"
        fab
        icon="fal fa-comments-alt"
        color="primary"
      />
    </q-page-sticky>
    <q-dialog v-model="addchat" persistent :maximized="true">
      <q-card class="bg-white">
        <q-header class="bg-primary text-white fixed-top">
          <q-btn
            class="float-left q-mt-xs"
            flat
            icon="fal fa-arrow-left"
            @click="closedialogMyChat"
            size="xs"
            v-close-popup
          >
          </q-btn>
          <div class="text-center text-weight-bold float-left  q-pt-xs">
            Chat Orden #{{ idPedido }}
          </div>
        </q-header>

        <q-card-section class="q-mt-xl q-mb-xl">
          <q-list style="max-width: 100%" class="q-pb-sm ">
            <template v-for="item in chatListData">
              <q-chat-message
                v-if="item.idUsuario == idUsuario"
                v-bind:key="item.id"
                name="Yo"
                avatar="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                :text="[item.mensaje]"
                sent
                :stamp="item.fechaFormat"
              />
              <q-chat-message
                v-else
                v-bind:key="item.id"
                name="Soporte"
                bg-color="dark"
                text-color="white"
                avatar="https://cdn4.iconfinder.com/data/icons/tech-support-3/512/customer_service_1-512.png"
                :text="[item.mensaje]"
                :stamp="item.fechaFormat"
              />
            </template>
          </q-list>

          <div class="fixed-bottom q-pa-sm bg-blue-grey-2">
            <q-input rounded outlined v-model="text" class="">
              <template v-slot:append>
                <q-btn
                  type="button"
                  v-on:click="sendChat"
                  :disabled="textStatus"
                  unelevated
                  round
                  color="primary"
                  icon="far fa-arrow-right"
                />
              </template>
            </q-input>
          </div>

          <div></div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";
import {
  createPedidos,
  createItemsPedidos,
  createItemsComponentesPedidosV2,
  createItemsExtrasPedidosV2
} from "./../graphql/mutations";
import { v4 as uuidv4 } from "uuid";
import { date } from "quasar";
import { createChatUsuarios } from "../graphql/mutations";
import { listChatUsuarioss } from "../graphql/queries";

export default {
  data() {
    return {
      idPedido: "",
      addchat: false,
      progress1: 0.0,
      progressLabel1: 0.0,
      textStatus: true,
      step: 0,
      text: null,
      chatListData: []
    };
  },
  async created() {
    await this.$Auth
      .currentAuthenticatedUser()
      .then(async user => {
        this.idUsuario = user.attributes.sub;
      })
      .catch(err => console.log(err))
      .finally(end => {
        this.$q.loading.hide();
      });
  },
  computed: {
    carrito() {
      return this.$store.state.carrito.carrito;
    },
    variables() {
      return this.$store.state.carrito.variables;
    }
    // progressLabel1() {
    //   return (this.progress1 * 100).toFixed(2) + "%";
    // }
  },
  watch: {
    async progress1(Valores, o) {
      const self = this;
      if (self.progress1 >= 1) {
        if (Valores == 1) {
          console.log("Entrando al ciclo");
          self.procesarpedido();
          self.step++;
          var id = await setInterval(function() {
            self.step++;
            if (self.step >= 6) {
              console.log("----->aqui");
              clearInterval(id);
              self.$router.push("/valorizacion");
            }
          }, 60000);
        }
      }
    },
    text: function(v) {
      //this.info.correo = v.toLowerCase();
      //this.text = v.trim();
      var text = v.trim();
      var length = text.length;
      if (length >= 2) {
        this.textStatus = false;
      } else {
        this.textStatus = true;
      }
    }
  },
  async mounted() {
    let cont = 0;
    const self = this;
    if (self.progress1 < 1) {
      var id = await setInterval(function() {
        self.progress1 = cont / 10;
        self.progressLabel1 = cont + " Segundo";
        cont++;
        if (cont == 11) {
          clearInterval(id);
        }
      }, 1000);
    } else {
    }
  },
  methods: {
    procesarpedido() {
      const self = this;
      const xVariable = this.variables;
      let idItemPedido = uuidv4();
      let xIdItemAdicional = uuidv4();
      const xCarrito = this.carrito;
      self.idPedido = idItemPedido;

      Auth.currentUserInfo()
        .then(async () => {
          await self.$API
            .graphql(
              self.$API.graphqlOperation(createPedidos, {
                input: self.variables
              })
            )
            .then(async data => {
              console.log("grabarDatos -> data", data);
              let xvariableItem = [];
              xCarrito.forEach(element => {
                idItemPedido = uuidv4();
                xvariableItem = {
                  cantidad: element.cantidad,
                  estado: true,
                  id: idItemPedido,
                  idItems: element.id,
                  idPedido: self.variables.codigoPedido,
                  precioTotal: element.precio
                };
                self.$API
                  .graphql(
                    self.$API.graphqlOperation(createItemsPedidos, {
                      input: xvariableItem
                    })
                  )
                  .then(data => {
                    console.log("grabarDatos -> data", data);
                  })
                  .catch(e => {
                    console.log("TCL: e", e);
                  });
                // Adicionales createItemsComponentesPedidosV2
                element.adicionales.forEach(adicional => {
                  xIdItemAdicional = uuidv4();
                  let xvariableItemAdicional = [];
                  xvariableItemAdicional = {
                    cantidad: 1,
                    estado: true,
                    id: xIdItemAdicional,
                    idItemPedido: idItemPedido,
                    idItems: adicional.id,
                    precioTotal: adicional.precio
                  };
                  if (adicional.idCategoriaComponente) {
                    self.$API
                      .graphql(
                        self.$API.graphqlOperation(
                          createItemsComponentesPedidosV2,
                          {
                            input: xvariableItemAdicional
                          }
                        )
                      )
                      .then(data => {
                        console.log("grabarDatos -> data", data);
                      })
                      .catch(e => {
                        console.log("TCL: e", e);
                      });
                  } else {
                    self.$API
                      .graphql(
                        self.$API.graphqlOperation(createItemsExtrasPedidosV2, {
                          input: xvariableItemAdicional
                        })
                      )
                      .then(data => {
                        console.log("grabarDatos -> data", data);
                      })
                      .catch(e => {
                        console.log("TCL: e", e);
                      });
                  }
                });
              });
              self.$store.commit("carrito/setcarrito", []);
              self.$store.commit("carrito/setcarritoLenght", 0);
              self.$store.commit("carrito/setEstado", "Pedido");
              self.$router.push("/seguimientoPedido");
            })
            .catch(e => {
              console.log("TCL: e", e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    },
    resetForm() {},
    closedialogMyChat() {
      this.addchat = false;
    },
    cancelaPedido() {
      // this.$store.commit("carrito/setcarritoLenght", 0);
      // this.$store.commit("carrito/setcarrito", []);
      // this.$store.commit("carrito/setEstado", "Pedido");
      this.$router.push("/restaurant");
    },
    async sendChat() {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(
        timeStamp,
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );

      const info = {
        idPedido: this.idPedido,
        idUsuario: this.idUsuario,
        mensaje: this.text,
        tipoChat: "CLIENTE_NEGOCIO",
        estado: true,
        fechaHora: formattedString
      };

      this.text = null;

      const createChat = await this.$API
        .graphql(
          this.$API.graphqlOperation(createChatUsuarios, { input: info })
        )
        .then(async res => {
          console.log("res", res.data.createChatUsuarios);
          var data = res.data.createChatUsuarios;
          data.fechaFormat = date.formatDate(
            data.fechaHora,
            "DD-MM-YYYY HH:mm:ss"
          );
          this.chatListData.unshift(data);

          this.testCreateChatNegocio(info);
        })
        .catch(e => {
          //alert("Por favor verifique los datos introducido");
          console.log("TCL: e-createChatUsuario", e);
        })
        .finally(f => {
          this.$q.loading.hide();
        });
    },
    dataChat() {
      this.$API
        .graphql(
          this.$API.graphqlOperation(listChatUsuarioss, {
            filter: {
              idPedido: { eq: this.idPedido },
              tipoChat: { eq: "CLIENTE_NEGOCIO" },
              estado: { eq: true }
            }
          })
        )
        .then(data => {
          console.log("Listado del Chat", data.data.listChatUsuarioss);
          var chatListData = data.data.listChatUsuarioss.items;
          var newData = chatListData.sort(function(a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.fechaHora) - new Date(a.fechaHora);
          });
          console.log(newData);
          var listData = newData.map(function(obj) {
            var rObj = {};
            rObj = obj;
            rObj["fechaFormat"] = date.formatDate(
              obj.fechaHora,
              "DD-MM-YYYY HH:mm:ss"
            );
            //rObj[obj.clave] = obj.valor;
            /*
          rbj['idPedido'] = obj.idPedido;
          rObj['idUsuario'] = obj.idUsuario;
          rObj['mensaje'] = obj.mesaje;
          rObj['tipoChat'] = obj.tipoChat;
          rObj['estado'] = obj.estado;
          rObj['fechaHora'] = obj.fechaHora;
          rObj['updatedAt'] = obj.updatedAt;
          rObj['createdAt'] = obj.createdAt;
          */
            return rObj;
          });
          this.chatListData = listData;
          console.log("listData: ", listData);
        })
        .catch(e => {
          //alert("Por favor verifique los datos introducido");
          console.log("TCL: e-listChatUsuarioss", e);
        })
        .finally(f => {
          this.$q.loading.hide();
        });
    },
    async testCreateChatNegocio(info) {
      info.mensaje = `Respuesta de: "${info.mensaje}"`;
      info.idUsuario = "8db6398c-9e61-4f68-8e8f-26995e74621f";
      let newDate = date.addToDate(info.fechaHora, { seconds: 1 });
      info.fechaHora = newDate;
      const createChat = await this.$API
        .graphql(
          this.$API.graphqlOperation(createChatUsuarios, { input: info })
        )
        .then(async res => {
          console.log("res", res.data.createChatUsuarios);
          var data = res.data.createChatUsuarios;
          data.fechaFormat = date.formatDate(
            data.fechaHora,
            "DD-MM-YYYY HH:mm:ss"
          );
          this.chatListData.unshift(data);
        })
        .catch(e => {
          //alert("Por favor verifique los datos introducido");
          console.log("TCL: e-createChatUsuario - Negocio", e);
        })
        .finally(f => {
          this.$q.loading.hide();
        });
    }
  }
};
</script>

<style></style>
