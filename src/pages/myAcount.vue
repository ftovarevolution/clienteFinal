<template>
  <div>
    <q-card>
      <q-card-section class="shadow-2">
        <div class="text-h4 text-grey-8">Mi Perfil</div>
        <div class="text-h6 text-bold q-mt-sl">
          Bienvenido! {{ userNameAux }}
        </div>
        <div class="q-pa-md">
          <div class="row">
            <div class="col-4">
              <q-item-section thumbnail class="q-pl-sm">
                <img
                  src="iconos_pedido_recibido_negro-01.svg"
                  class="imageFood"
                />
              </q-item-section>
            </div>
            <div class="col-8 text-left flex flex-center" @click="mispedido">
              <strong>Historial de Pedido</strong>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <q-item-section thumbnail class="q-pl-sm">
                <img src="iconos_salida-01.svg" class="imageFood" />
              </q-item-section>
            </div>
            <div class="col-8 text-left flex flex-center" @click="salir">
              <strong>Salir</strong>
            </div>
          </div>
        </div>
        <q-form @submit="signUp" class="form1" ref="form1">
          <q-card class="my-card shadow-9" style="margin-top: 10px;">
            <q-card-section>
              <div class="text-h8 text-bold q-mt-sl q-mb-sm">
                Actualizar mis datos
              </div>
              <q-input
                rounded
                standout="bg-grey-4 text-white"
                bottom-slots
                v-model="userNameAux"
                label="Nombre"
                lazy-rules
                no-error-icon
                :rules="[$rules.required('Campo Obligatorio..')]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="fal fa-user" />
                </template>
                <template v-slot:append>
                  <q-btn
                    color="primary"
                    flat
                    icon="fal fa-times"
                    class="cursor-pointer q-mr-sm"
                    @click="name = ''"
                    style="width: 36px;"
                  />
                </template>
              </q-input>
              <q-input
                rounded
                standout="bg-grey-4 text-white"
                bottom-slots
                v-model="emailAux"
                no-error-icon
                lazy-rules
                :rules="[
                  $rules.required('Campo Obligatorio..'),
                  $rules.email('No es un email..')
                ]"
                label="Correo electrónico"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="fal fa-envelope" />
                </template>
                <template v-slot:append>
                  <q-btn
                    color="primary"
                    flat
                    icon="fal fa-times"
                    class="cursor-pointer q-mr-sm"
                    @click="email = ''"
                    no-error-icon
                    style="width: 36px;"
                  />
                </template>
              </q-input>
              <q-input
                rounded
                standout="bg-grey-4 text-white"
                bottom-slots
                v-model="phone"
                no-error-icon
                lazy-rules
                label="Teléfono"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="fal fa-phone" />
                </template>
                <template v-slot:append>
                  <q-btn
                    color="primary"
                    flat
                    icon="fal fa-times"
                    class="cursor-pointer q-mr-sm"
                    @click="phone = ''"
                    no-error-icon
                    style="width: 36px;"
                  />
                </template>
              </q-input>
            </q-card-section>
          </q-card>
          <div style="text-align: center; margin-top: 30px;">
            <q-btn
              class="text-capitalize"
              style="width: 260px; height: 46px; font-size: 23px; "
              align="center"
              rounded
              color="red-10"
              type="submit"
            >
              <div style="margin-top: -12px;">
                Actualizar Datos
              </div>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userNameAux: "",
      emailAux: "",
      phone: ""
    };
  },
  computed: {
    datosUser() {
      return this.$store.state.user.datosUser;
    },
    userName() {
      return this.$store.state.login.userName;
    },
    UserVerify() {
      return this.$store.state.login.UserVerify;
    }
  },
  mounted() {
    this.userNameAux = this.userName;
    this.emailAux = this.UserVerify;
  },
  methods: {
    mispedido() {
      this.$router.push("/historialPedidos");
    },
    async salir() {
      this.$store.commit("global/setnavigateNow", "");
      this.$store.commit("login/setRegister", false);
      this.$store.commit("login/setUserVerify", "");
      this.$store.commit("login/setVerify", false);
      this.$store.commit("global/setLoginew", true);
      this.$store.commit("global/setdirectionNow", "");
      this.$store.commit("global/setdirectionNowLat", 0);
      this.$store.commit("global/setdirectionNowLng", 0);
      this.$store.commit("carrito/setcarrito", []);
      try {
        localStorage.register = "false";
        await this.$Auth.signOut();
        this.$router.push("/login");
      } catch (error) {
        console.log("error signing out: ", error);
        this.$router.push("/");
      }
    },
    execute(name) {
      console.log(name, "excute");
      if (typeof this[name] === "function") {
        this[name]();
      }
    },
    accountSettings() {},
    signUp() {},
    logout() {},
    orderHistory() {},
    onSubmit() {}
  }
};
</script>
