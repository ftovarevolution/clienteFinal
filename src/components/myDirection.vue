<template>
  <q-dialog
    v-model="dialogMyDirection"
    persistent
    :maximized="true"
    @before-show="cargarDatos"
  >
    <q-card class="bg-white">
      <q-bar class="bg-primary text-white">
        <q-btn
          flat
          icon="fal fa-arrow-left"
          @click="closedialogMyDirection"
          v-close-popup
        >
        </q-btn>
        <div class="text-center text-weight-bold">
          Ubicación de Entrega
        </div>
      </q-bar>

      <q-card-section>
        <q-list style="max-width: 350px">
          <q-slide-item
            id="index"
            right-color="red"
            @right="opt => onRight(opt, item.id)"
            v-for="(item, index) in MyDirectionData"
            :key="index"
          >
            <template v-slot:right style="border: blue 10px solid">
              <q-icon name="fad fa-trash-alt" />
            </template>
            <q-item @click="selectItem(item)" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="fas fa-map-pin" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.nombre }}</q-item-label>
                <q-item-label caption lines="2">{{
                  item.direccion
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
      </q-card-section>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          @click="addDialogoDireccion = true"
          fab
          icon="fas fa-plus"
          color="primary"
        />
      </q-page-sticky>
    </q-card>
    <q-dialog v-model="addDialogoDireccion" persistent @before-show="resetForm">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Agregar Dirección</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="Nombre"
            v-model="address"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            borderless
            label="Dirección"
            v-model="directionNow"
            disable
            @keyup.enter="prompt = false"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn @click="addDireccion" flat label="Agregar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { Quasar, Notify, QSpace, Dialog } from "quasar";
import { API, Auth } from "aws-amplify";
import { listDireccionUsuarios } from "./../graphql/queries.js";
import {
  createDireccionUsuario,
  deleteDireccionUsuario
} from "./../graphql/mutations.js";

export default {
  name: "myDirection",
  data() {
    return {
      colorAux: "white",
      direccion: "",
      address: "",
      addDialogoDireccion: false,
      MyDirectionData: []
    };
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  computed: {
    SubID() {
      if (localStorage.SubID) {
        if (localStorage.SubID.length > 0) {
          return localStorage.SubID;
        } else {
          return this.$store.state.login.SubID;
        }
      } else {
        return this.$store.state.login.SubID;
      }
    },
    dialogMyDirection() {
      return this.$store.state.home.MyDirectionDialog;
    },
    directionNow() {
      return this.$store.state.global.directionNow;
    },
    directionNowLat() {
      return this.$store.state.global.directionNowLat;
    },
    directionNowLng() {
      return this.$store.state.global.directionNowLng;
    }
  },
  mounted() {
    const self = this;
    // self.cargarDatos();
  },
  methods: {
    onRight({ reset }, idDelete) {
      const self = this;
      this.$q
        .dialog({
          title: "Eliminar",
          message: "Desea Eliminar esta dirección?",
          persistent: true,
          ok: {
            label: "Si",
            push: true,
            color: "negative"
          },
          cancel: {
            label: "No",
            push: true,
            color: "blue"
          }
        })
        .onOk(() => {
          console.log("Eliminando");
          self.$API
            .graphql(
              self.$API.graphqlOperation(deleteDireccionUsuario, {
                input: { id: idDelete }
              })
            )
            .then(data => {
              this.cargarDatos();
            })
            .catch(e => {
              self.loading = false;
              console.log("TCL: e", e);
            });
        })
        .onCancel(() => {
          //console.log(">>>> Cancel");
        });
      this.finalize(reset);
    },
    finalize(reset) {
      this.timer = setTimeout(() => {
        this.colorAux = "white";
        reset();
      }, 1000);
    },

    resetForm() {
      this.address = "";
    },
    async cargarDatos() {
      const self = this;
      self.loading = true;
      self.MyDirectionData = [];
      await self.$API
        .graphql(
          self.$API.graphqlOperation(listDireccionUsuarios, {
            filter: {
              estado: { eq: 1 },
              idUsuario: { eq: this.SubID }
            },
            sort: {
              direction: "asc",
              field: "nombre"
            }
          })
        )
        .then(data => {
          let datosItem = data.data.listDireccionUsuarios.items;
          let ranking = 0;
          if (datosItem.length > 0) {
            self.MyDirectionData = datosItem;
            self.loading = false;
          }
        })
        .catch(e => {
          self.loading = false;
          console.log("TCL: e", e);
        });
    },
    selectItem(item) {
      const self = this;
      console.log("selectItem -> item", item);
      self.$store.commit("global/setTitle", item.direccion);
      console.log("Lo cambie");
      self.$store.commit("global/setdirectionNow", item.direccion);
      self.$store.commit("global/setdirectionNowLat", item.geolocacion.lat);
      self.$store.commit("global/setdirectionNowLng", item.geolocacion.lon);
      localStorage.directionNow = this.$store.state.global.directionNow;
      localStorage.directionNowLat = this.$store.state.global.directionNowLat;
      localStorage.directionNowLng = this.$store.state.global.directionNowLng;
      this.closedialogMyDirection();
      this.$router.push("/services");
    },
    closedialogMyDirection() {
      this.$store.commit("home/setMyDirectionDialog", false);
    },
    addDireccion() {
      const self = this;

      let idAdress = uuidv4();
      let datos = [];
      datos = {
        id: idAdress,
        idUsuario: self.SubID,
        nombre: self.address,
        direccion: self.directionNow,
        geolocacion: {
          lat: self.directionNowLat,
          lon: self.directionNowLng
        },
        estado: 1
      };
      Auth.currentUserInfo()
        .then(async () => {
          await self.$API
            .graphql(
              self.$API.graphqlOperation(createDireccionUsuario, {
                input: datos
              })
            )
            .then(data => {
              this.$q.notify({
                message: "Su dirección a sido guardada.",
                color: "green"
              });
              setTimeout(() => {
                this.cargarDatos();
              }, 500);
            })
            .catch(e => {
              console.log("TCL: e", e);
            });
        })
        .catch(e => {
          //self.$router.push('/')
          console.log(e);
        });
    }
  }
};
</script>

<style></style>
