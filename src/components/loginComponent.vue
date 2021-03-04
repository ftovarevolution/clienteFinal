<template>
  <q-page>
    <q-card class="my-card shadow-9" style="margin-top: 160px;">
      <q-card-section style="text-align: center; height: 70px;">
        <q-avatar
          size="220px"
          font-size="52px"
          color="blue-grey-8"
          text-color="white"
          style="top: 0; margin: 0px auto; transform: translateY(-70%);"
        >
          <q-img
            src="./../statics/logo_secret.png"
            transition="jump-up"
            spinner-color="white"
            :ratio="1"
            class="q-ma-lg"
          />
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <q-form @submit="enterfun" ref="formularioLogin">
          <q-input
            type="email"
            ref="user"
            outlined
            filled
            bottom-slots
            v-model="username"
            standout="bg-blue-grey-2 text-white"
            color="white"
            label="eMail"
            clearable
            :rules="[
              $rules.required('Campo Obligatorio..'),
              $rules.email('No es un email..')
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-user" size="sm" color="primary" />
            </template>
          </q-input>
        </q-form>
        <q-form @submit="signIn">
          <q-input
            outlined
            ref="password"
            filled
            v-model="password"
            label="Contraseña"
            standout="bg-blue-grey-2 text-white"
            clearable
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-lock" color="primary" size="sm" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"
                size="sm"
                class="cursor-pointer q-mr-sm"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="self-center" style="text-align: center;">
            <q-btn
              style="width: 300px;"
              class="self-center"
              label="Entrar"
              @click="signIn"
              type="button"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-section style="text-align: center;">
        <q-btn
          class="text-weight-light text-center"
          flat
          size="md"
          text-color="primary"
          color="primary"
          no-caps
          @click="forgotPassword"
          label="He olvidado mi contraseña"
        />
      </q-card-section>
    </q-card>
    <forgotpassword :datosActual="this.email" />
  </q-page>
</template>

<script>
const forgotpassword = () => import("./../components/forgotpassword");
import axios from "axios";

export default {
  name: "PageLogin",
  components: {
    forgotpassword
  },
  data() {
    return {
      email: "",
      resizeMobile: false,
      text: "",
      username: "",
      password: "",
      isPwd: true
    };
  },
  computed: {
    loginUser() {
      let userActivo = "";
      if (localStorage.username) {
        userActivo = localStorage.username;
      }
      return userActivo;
    },
    conectApi() {
      return this.$store.state.global.conectApi;
    },
    portApi() {
      return this.$store.state.global.Port;
    }
  },

  mounted() {
    this.username = this.loginUser;
    this.validResize();
    if (this.username.length > 0) {
      setTimeout(() => {
        this.$refs.password.focus();
        this.$refs.password.focus();
      }, 1000);
    }
  },

  methods: {
    validResize() {
      this.resizeMobile = this.isMobile();
    },
    MostrarForgotPassword(data) {
      this.email = data;
      this.$store.commit("login/setdialogVisible", true);
    },
    forgotPassword() {
      this.$q
        .dialog({
          title: "Recuperar contraseña",
          message: "Introduzca su correo electrónico.",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true,
          ok: {
            push: true,
            label: "Enviar"
          },
          cancel: {
            push: true,
            color: "negative"
          }
        })
        .onOk(async data => {
          const getUrl =
            "http://" +
            this.conectApi +
            ":" +
            this.portApi +
            "/api/mail/verifyMail/" +
            data;
          await axios
            .get(getUrl)
            .then(response => {
              if (response.data.message == "dont exist") {
                this.enviaMail(data);
              } else {
                this.$q

                  .dialog({
                    title: "Recuperar contraseña",
                    message:
                      "ya se ha enviado un email a su cuenta. Desea enviar de nuevo",
                    cancel: true,
                    persistent: true,
                    ok: {
                      push: true,
                      label: "Si"
                    },
                    cancel: {
                      push: true,
                      color: "negative",
                      label: "No"
                    }
                  })
                  .onOk(() => {
                    this.enviaMail(data);
                  })
                  .onCancel(() => {
                    this.MostrarForgotPassword(data);
                  })
                  .onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                  });
              }
            })
            .catch(err => {
              console.log("#####", err);
            });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    async existeRegistro(data) {
      const getUrl =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/mail/verifyMail/" +
        data;
      await axios
        .get(getUrl)
        .then(response => {
          return response.data;
        })
        .catch(err => {
          console.log("#####", err);
        });
    },
    enviaMail(data) {
      // enviar email
      const getUrl =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/mail/sendMail/" +
        data;
      axios
        .get(getUrl)
        .then(response => {
          console.log("🚀 - forgotPassword - response", response);
          console.log("send email");
          this.$q.notify({
            position: "top-right",
            message: "Se ha enviado un email.",
            color: "green"
          });
          this.MostrarForgotPassword(data);
        })
        .catch(err => {
          console.log("#####", err);
          switch (err.response.status) {
            case 404:
              this.$q.notify({
                position: "top-right",
                message: "El email no esta registrado.",
                color: "negative"
              });
              break;

            default:
              break;
          }
        });
    },
    enterfun() {
      this.$refs.formularioLogin.validate().then(success => {
        if (success) {
          this.loading = true;
          let xidsecret = 0;
          const xvariables = {
            email: this.username,
            password: this.password
          };
          let urlConsulta =
            "http://" +
            this.conectApi +
            ":" +
            this.portApi +
            "/api/auth/signin";
          axios
            .post(urlConsulta, xvariables)
            .then(response => {
              let token = response.data.token;
              this.loading = false;
              localStorage.token = token;
              this.$store.commit(
                "global/setIdEmpresa",
                response.data.idEmpresa
              );
              this.$store.commit("global/settoken", token);
              localStorage.username = this.username;
              this.$router.push("/consultarchofer", () => {});
            })
            .catch(err => {
              switch (err.response.status) {
                case 400:
                  this.$store.commit("global/settoken", null);
                  this.$q.notify({
                    position: "top-right",
                    message:
                      "El Usuario no existe o la contraseña es incorrecta...",
                    color: "negative"
                  });
                  break;

                default:
                  break;
              }
              // console.log("#####", err);
            });
        }
      });
    },
    isMobile: function() {
      var check = false;
      (function(a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    signIn() {
      this.enterfun();
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  height: 400px
  width: 450px
</style>
