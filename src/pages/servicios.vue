<template>
  <div class="full-width text-center">
    <q-input
      standout="bg-red-2 text-white"
      rounded
      style="width: 90%; margin-top: 10px; margin-left: 20px; margin-right: 20px"
      dense
      v-model="textSearch"
      bottom-slots
      placeholder="Que buscas hoy?"
    >
      <template v-slot:prepend>
        <q-icon name="fas fa-search" />
      </template>
      <template v-slot:append>
        <q-btn
          color="primary"
          flat
          icon="fal fa-times"
          class="cursor-pointer q-mr-sm"
          @click="textSearch = ''"
          style="width: 36px;"
        />
      </template>
    </q-input>
    <div
      class="column inline buttonSevice"
      v-for="(item, index) in menu"
      :key="index"
    >
      <q-btn round @click="callService(item)">
        <q-avatar class="bg-primary" size="84px">
          <img :src="item.image" />
        </q-avatar>
      </q-btn>
      <div class="text-center">{{ item.nombre }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnOps: {
        type: "circle",
        easing: "easeOutQuart",
        size: 4,
        particlesAmountCoefficient: 4,
        oscillationCoefficient: 2,
        color: function() {
          return Math.random() < 0.5 ? "#000000" : "#ff3333";
        },
        onComplete: () => {
          console.log("complete");
        },
        onBegin: () => {
          console.log("begin");
        },
        visible: true,
        animating: false
      },
      right: false,
      textSearch: "",
      email: "",
      title: "",
      showSearch: false,
      menu: [
        {
          id: "12354545444545",
          nombre: "Restaurantes",
          image:
            "https://webstockreview.net/images/beef-clipart-meat-dish-5.png"
        },
        {
          id: "12354545444544",
          nombre: "Licorerias",
          image:
            "https://cdn.icon-icons.com/icons2/709/PNG/128/Drinks-33_icon-icons.com_61965.png"
        },
        {
          id: "123545454445222",
          nombre: "Super Market",
          image:
            "https://pngimage.net/wp-content/uploads/2019/05/hypermarket-icon-png-4.png"
        },
        {
          id: "1212222",
          nombre: "Carnicerias",
          image: "https://image.flaticon.com/icons/png/512/1534/1534825.png"
        },
        {
          id: "12354545444sasdasd5222",
          nombre: "Farmacias",
          image: "https://www.iconshock.com/image/RealVista/Medical/pharmacy/"
        }
      ],
      menuInfo: [
        {
          icon: "arrow_forward",
          caption: "About Us"
        },
        {
          icon: "arrow_forward",
          caption: "How it Works"
        },
        {
          icon: "arrow_forward",
          caption: "Faqs"
        },
        {
          icon: "arrow_forward",
          caption: "Contact Us"
        }
      ]
    };
  },
  components: {},
  mounted() {
    const self = this;
    self.$store.commit("global/setTitle", "Servicios");
  },
  methods: {
    clearSearch() {
      alert(1);
    },
    callService(item) {
      let self = this;
      self.$store.commit("global/setIdService", item.id);
      self.$store.commit("global/setNameService", item.nombre);
      this.$router.push("/restaurant");
    }
  }
};
</script>

<style lang="sass">
.buttonSevice
  margin-left: 40px
  margin-right: 40px
  margin-bottom: 30px
</style>
