export default function () {
  return {
    botonMenu: true,
    dialogLogin: false,
    dialogRegister: false,
    dialogVerify: false,
    dialogVerify2: false,
    userActive: null,
    tipoActive: null,
    dialogMenuPass: false,
    dialogSearch: false,
    dialogWelcome: false,
    dialogPais: false,
    datosUser: {
      name: null,
    },
    campo: 1,
    datosPais: {
      bandera: null,
    },
    searchData: null,
    pictureProfile: '',
    centroInicial: {
      lat: 0,
      lng: 0,
    },
    favoritos: {
      CASA: {
        lugar: null,
      },
      TRABAJO: {
        lugar: null,
      },
      FAVORITO: {
        lugar: null,
      },
    },
    datosCarreraActual: {}
  }
}
