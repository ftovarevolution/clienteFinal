<template>
  <q-dialog
    v-model="dialogVisible"
    persistent
    @before-show="beforeOpen"
    @hide="closeDialog"
  >
    <q-card style="width: 700px; max-width: 80vw; ">
      <q-toolbar
        class="q-mt-sm q-mb-lg bg-dark text-white"
        style="margin-top: 0px"
      >
        <q-avatar square>
          <q-icon size="xl" name="fas fa-user-secret" />
        </q-avatar>
        <q-toolbar-title
          ><span v-if="this.dialogModificando == false" class="text-weight-bold"
            >Registro de Usuario</span
          >
          <span v-if="this.dialogModificando == true" class="text-weight-bold"
            >Editando datos de Usuario</span
          >
        </q-toolbar-title>
        <q-btn
          color="negative"
          flat
          round
          dense
          icon="fas fa-times"
          @click="resetForm"
        />
      </q-toolbar>
      <q-card-section class="q-ma-xs q-pa-xs">
        <q-form
          class="q-gutter-sm caja-form q-ma-xs q-px-xl"
          ref="myFormUsuarios"
        >
          <q-input
            outlined
            filled
            v-model="nombre"
            label="Nombre del Usuario"
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-industry" />
            </template>
          </q-input>

          <q-input
            outlined
            filled
            v-model="telefono"
            label="Teléfono #### - ####"
            maxlength="50"
            mask="#### - ####"
            unmasked-value
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-phone" />
            </template>
          </q-input>

          <q-input
            outlined
            filled
            required
            validate
            bottom-slots
            v-model="email"
            label="Correo Electronico"
            type="email"
            :rules="[
              $rules.required('Campo Obligatorio..'),
              $rules.email('No es un email..')
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-mail-bulk" />
            </template>
          </q-input>
          <q-input
            outlined
            filled
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Contraseña"
            lazy-rules
            no-error-icon
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-lock-alt" />
            </template>
            <template v-slot:append>
              <q-btn
                v-show="!isPwd"
                flat
                icon="fal fa-eye"
                class="cursor-pointer q-mr-sm"
                @click="isPwd = true"
                style="width: 36px;"
              />
              <q-btn
                v-show="isPwd"
                flat
                icon="fal fa-eye-slash"
                class="cursor-pointer q-mr-sm"
                @click="isPwd = false"
                style="width: 36px;"
              />
            </template>
          </q-input>
          <q-input
            outlined
            filled
            v-model="password2"
            :type="isPwd ? 'password' : 'text'"
            label="Confirmar Contraseña"
            lazy-rules
            no-error-icon
            :rules="[$rules.required('Campo Obligatorio..')]"
          >
            <template v-slot:prepend>
              <q-icon name="fad fa-lock-alt" />
            </template>
            <template v-slot:append>
              <q-btn
                v-show="!isPwd"
                flat
                icon="fal fa-eye"
                class="cursor-pointer q-mr-sm"
                @click="isPwd = true"
                style="width: 36px;"
              />
              <q-btn
                v-show="isPwd"
                flat
                icon="fal fa-eye-slash"
                class="cursor-pointer q-mr-sm"
                @click="isPwd = false"
                style="width: 36px;"
              />
            </template>
          </q-input>
        </q-form>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            color="primary"
            icon="far fa-save"
            label="Guardar"
            @click="onSubmit"
          />
        </q-card-actions>
      </q-card-section>
      <q-inner-loading :showing="Loadingvisible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "myFormUsuarios",
  data() {
    return {
      nombre: "",
      telefono: "",
      email: "",
      password: "",
      password2: "",
      isPwd: true,
      Loadingvisible: false,
      icon: false,
      bar: false,
      bar2: false,
      toolbar: true
    };
  },
  props: {
    datosActual: null,
    idempresaActual: null
  },
  computed: {
    dialogModificando() {
      return this.$store.state.perfil.dialogModificando;
    },
    dialogVisible() {
      return this.$store.state.perfil.dialogVisible;
    },
    conectApi() {
      return this.$store.state.global.conectApi;
    },
    portApi() {
      return this.$store.state.global.Port;
    },
    nEmpresa() {
      return this.$store.state.global.IdEmpresa;
    }
  },
  mounted() {
    const self = this;
  },
  methods: {
    prueba() {
      this.nombre = "";
      console.log("Si");
    },
    resetForm() {
      this.nombre = "";
      this.telefono = "";
      this.email = "";
      this.password = "";
      this.password2 = "";
      this.$store.commit("perfil/setdialogVisible", false);
    },
    onSubmit(data) {
      this.$refs.myFormUsuarios.validate().then(success => {
        if (success) {
          if (this.password != this.password2) {
            this.$q.notify({
              position: "bottom-right",
              message: "La contraseña no coincide con la verificación.",
              color: "negative"
            });
            this.password = "";
            this.password2 = "";
            this.$refs.myFormUsuarios.validate();
            return;
          } else {
            let codigoEmpresa = "";
            if (this.idempresaActual.length > 0) {
              codigoEmpresa = this.idempresaActual;
            } else {
              codigoEmpresa = this.nEmpresa;
            }
            this.loading = true;
            const xvariables = {
              id: codigoEmpresa,
              nombre: this.nombre,
              telefono: this.telefono,
              email: this.email,
              password: this.password,
              password2: this.password2
            };
            if (this.dialogModificando == true) {
              // updateUsuario

              let urlConsulta =
                "http://" +
                this.conectApi +
                ":" +
                this.portApi +
                "/api/empresa/updateUsuario";
              axios
                .post(urlConsulta, xvariables)
                .then(response => {
                  let rows = response.data;
                  this.loading = false;
                  if (rows.message) {
                    switch (rows.message) {
                      case "Not exist mail":
                        this.$q.notify({
                          position: "bottom-right",
                          message: "El email NO existe registrado.",
                          color: "negative"
                        });
                        break;

                      default:
                        this.$q.notify({
                          position: "bottom-right",
                          message: "Se ha guardado la información.",
                          color: "green"
                        });
                        if (this.password != "") {
                          this.cambiarPassword(xvariables);
                        }
                        setTimeout(() => {
                          this.$store.commit("empresa/setreloadTable", true);
                          this.$store.commit("empresa/setreloadTable", false);
                        }, 1000);
                        break;
                    }
                  } else {
                    this.$q.notify({
                      position: "bottom-right",
                      message: "Se ha guardado la información.",
                      color: "green"
                    });
                  }
                })
                .catch((err, response) => {
                  console.log("#####", err);
                });
            } else {
              let urlConsulta =
                "http://" +
                this.conectApi +
                ":" +
                this.portApi +
                "/api/empresa/addUsuario";
              axios
                .post(urlConsulta, xvariables)
                .then(response => {
                  let rows = response.data;
                  this.loading = false;
                  if (rows.message) {
                    switch (rows.message) {
                      case "existing mail":
                        this.$q.notify({
                          position: "bottom-right",
                          message: "El email ya existe registrado.",
                          color: "negative"
                        });
                        break;

                      default:
                        this.$q.notify({
                          position: "bottom-right",
                          message: "Se ha guardado la información.",
                          color: "green"
                        });
                        this.cambiarPassword(xvariables);
                        setTimeout(() => {
                          this.$store.commit("empresa/setreloadTable", true);
                          this.$store.commit("empresa/setreloadTable", false);
                        }, 1000);
                        break;
                    }
                  } else {
                    this.$q.notify({
                      position: "bottom-right",
                      message: "Se ha guardado la información.",
                      color: "green"
                    });
                  }
                })
                .catch((err, response) => {
                  console.log("#####", err);
                });
            }
            this.resetForm();
          }
        }
      });
    },
    cambiarPassword(xdatos) {
      const xvariables = {
        email: xdatos.email,
        password: xdatos.password
      };
      let urlConsulta =
        "http://" +
        this.conectApi +
        ":" +
        this.portApi +
        "/api/auth/updatePasswordAut";
      axios
        .post(urlConsulta, xvariables)
        .then(response => {
          let rows = response.data;
          this.loading = false;
          console.log("🚀 - this.$refs.myFormUsuarios.validate - rows", rows);
          if (rows.message != "register Update") {
            this.$q.notify({
              position: "top-right",
              message: "No se ha establecido el password.",
              color: "negative"
            });
            return;
          }
        })
        .catch((err, response) => {
          console.log("#####", err);
        });
    },
    closeDialog() {
      if (!this.cancel) {
        this.$store.commit("empresa/setreloadTable", true);
        this.cancel = true;
      }
    },
    beforeOpen() {
      if (this.dialogModificando) {
        this.nombre = this.datosActual.nombre;
        this.telefono = this.datosActual.telefono;
        this.email = this.datosActual.email;
      }
    }
  }
};
</script>

<style></style>
