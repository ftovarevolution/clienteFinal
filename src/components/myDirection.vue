<template>
  <q-dialog v-model="dialogMyDirection" persistent :maximized="true">
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
        <q-list class="rounded-borders" style="max-width: 350px">
          <q-item
            @click="selectItem(item)"
            clickable
            v-ripple
            v-for="(item, index) in MyDirectionData"
            :key="index"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-map-pin" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
              <q-item-label caption lines="2">{{ item.titlemap }}</q-item-label>
            </q-item-section>
            <!-- <q-separator spaced inset /> -->
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "myDirection",
  data() {
    return {
      MyDirectionData: [
        {
          idClient: "5",
          title: "Mi Ubicación Actual",
          titlemap: "",
          lat: "9.6656565",
          lng: "-10.55554444"
        },
        {
          idClient: "5",
          title: "Mi casa",
          titlemap: "ph Parque de Toscana",
          lat: "9.6656565",
          lng: "-10.55554444"
        },
        {
          idClient: "5",
          title: "Mi Trabajo",
          titlemap: "Rio Abajo calle 6ta",
          lat: "9.6656565",
          lng: "-10.55554444"
        },
        {
          idClient: "5",
          title: "Amigos",
          titlemap: "Res. Santillana. Nuevo Arraijan",
          lat: "9.6656565",
          lng: "-10.55554444"
        }
      ]
    };
  },
  computed: {
    dialogMyDirection() {
      return this.$store.state.home.MyDirectionDialog;
    }
  },
  mounted() {
    const self = this;
  },
  methods: {
    selectItem(item) {
      console.log("selectItem -> item", item);
    },
    closedialogMyDirection() {
      this.$store.commit("home/setMyDirectionDialog", false);
    }
  }
};
</script>

<style></style>
