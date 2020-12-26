/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDatosUsuario = /* GraphQL */ `
  subscription OnCreateDatosUsuario {
    onCreateDatosUsuario {
      id
      nombre
      profile
      correo
      telefono
      tiposUsuario
      datosUsuarioDespachador {
        id
        idenditicacion
        tipoTransporte
        placa
        modelo
        color
        ano
        estado
        createdAt
        updatedAt
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDatosUsuario = /* GraphQL */ `
  subscription OnUpdateDatosUsuario {
    onUpdateDatosUsuario {
      id
      nombre
      profile
      correo
      telefono
      tiposUsuario
      datosUsuarioDespachador {
        id
        idenditicacion
        tipoTransporte
        placa
        modelo
        color
        ano
        estado
        createdAt
        updatedAt
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDatosUsuario = /* GraphQL */ `
  subscription OnDeleteDatosUsuario {
    onDeleteDatosUsuario {
      id
      nombre
      profile
      correo
      telefono
      tiposUsuario
      datosUsuarioDespachador {
        id
        idenditicacion
        tipoTransporte
        placa
        modelo
        color
        ano
        estado
        createdAt
        updatedAt
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDatosUsuarioDespachador = /* GraphQL */ `
  subscription OnCreateDatosUsuarioDespachador {
    onCreateDatosUsuarioDespachador {
      id
      idenditicacion
      tipoTransporte
      placa
      modelo
      color
      ano
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDatosUsuarioDespachador = /* GraphQL */ `
  subscription OnUpdateDatosUsuarioDespachador {
    onUpdateDatosUsuarioDespachador {
      id
      idenditicacion
      tipoTransporte
      placa
      modelo
      color
      ano
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDatosUsuarioDespachador = /* GraphQL */ `
  subscription OnDeleteDatosUsuarioDespachador {
    onDeleteDatosUsuarioDespachador {
      id
      idenditicacion
      tipoTransporte
      placa
      modelo
      color
      ano
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDireccionUsuario = /* GraphQL */ `
  subscription OnCreateDireccionUsuario {
    onCreateDireccionUsuario {
      id
      idUsuario
      nombre
      direccion
      geolocacion {
        lat
        lon
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDireccionUsuario = /* GraphQL */ `
  subscription OnUpdateDireccionUsuario {
    onUpdateDireccionUsuario {
      id
      idUsuario
      nombre
      direccion
      geolocacion {
        lat
        lon
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDireccionUsuario = /* GraphQL */ `
  subscription OnDeleteDireccionUsuario {
    onDeleteDireccionUsuario {
      id
      idUsuario
      nombre
      direccion
      geolocacion {
        lat
        lon
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategorias = /* GraphQL */ `
  subscription OnCreateCategorias {
    onCreateCategorias {
      id
      nombre
      courier
      subCategorias {
        items {
          id
          idCategoria
          Nombre
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategorias = /* GraphQL */ `
  subscription OnUpdateCategorias {
    onUpdateCategorias {
      id
      nombre
      courier
      subCategorias {
        items {
          id
          idCategoria
          Nombre
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategorias = /* GraphQL */ `
  subscription OnDeleteCategorias {
    onDeleteCategorias {
      id
      nombre
      courier
      subCategorias {
        items {
          id
          idCategoria
          Nombre
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategoriasItems = /* GraphQL */ `
  subscription OnCreateCategoriasItems {
    onCreateCategoriasItems {
      id
      idNegocio
      nombre
      courier
      items {
        items {
          id
          nombre
          idNegocio
          descripcion
          tipoItem
          idCategoria
          precioBase
          stockDiario
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategoriasItems = /* GraphQL */ `
  subscription OnUpdateCategoriasItems {
    onUpdateCategoriasItems {
      id
      idNegocio
      nombre
      courier
      items {
        items {
          id
          nombre
          idNegocio
          descripcion
          tipoItem
          idCategoria
          precioBase
          stockDiario
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategoriasItems = /* GraphQL */ `
  subscription OnDeleteCategoriasItems {
    onDeleteCategoriasItems {
      id
      idNegocio
      nombre
      courier
      items {
        items {
          id
          nombre
          idNegocio
          descripcion
          tipoItem
          idCategoria
          precioBase
          stockDiario
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSubCategorias = /* GraphQL */ `
  subscription OnCreateSubCategorias {
    onCreateSubCategorias {
      id
      idCategoria
      Nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSubCategorias = /* GraphQL */ `
  subscription OnUpdateSubCategorias {
    onUpdateSubCategorias {
      id
      idCategoria
      Nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSubCategorias = /* GraphQL */ `
  subscription OnDeleteSubCategorias {
    onDeleteSubCategorias {
      id
      idCategoria
      Nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDespachadoresActivos = /* GraphQL */ `
  subscription OnCreateDespachadoresActivos {
    onCreateDespachadoresActivos {
      id
      estado
      location {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDespachadoresActivos = /* GraphQL */ `
  subscription OnUpdateDespachadoresActivos {
    onUpdateDespachadoresActivos {
      id
      estado
      location {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDespachadoresActivos = /* GraphQL */ `
  subscription OnDeleteDespachadoresActivos {
    onDeleteDespachadoresActivos {
      id
      estado
      location {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatUsuarios = /* GraphQL */ `
  subscription OnCreateChatUsuarios {
    onCreateChatUsuarios {
      id
      idUsuario
      idPedido
      mensaje
      fechaHora
      tipoChat
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatUsuarios = /* GraphQL */ `
  subscription OnUpdateChatUsuarios {
    onUpdateChatUsuarios {
      id
      idUsuario
      idPedido
      mensaje
      fechaHora
      tipoChat
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatUsuarios = /* GraphQL */ `
  subscription OnDeleteChatUsuarios {
    onDeleteChatUsuarios {
      id
      idUsuario
      idPedido
      mensaje
      fechaHora
      tipoChat
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNegocios = /* GraphQL */ `
  subscription OnCreateNegocios {
    onCreateNegocios {
      id
      idCategoria
      idSubCategoria
      nombre
      descripcion
      tag
      categoriasItems {
        items {
          id
          idNegocio
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      profile
      horario {
        lunes {
          entrada
          salida
        }
        estadoLunes
        martes {
          entrada
          salida
        }
        estadoMartes
        miercoles {
          entrada
          salida
        }
        estadoMiercoles
        jueves {
          entrada
          salida
        }
        estadoJueves
        viernes {
          entrada
          salida
        }
        estadoViernes
        sabado {
          entrada
          salida
        }
        estadoSabado
        domingo {
          entrada
          salida
        }
        estadoDomingo
      }
      geolocacion {
        lat
        lon
      }
      representanteLegal
      identificacion
      RUC
      correo
      tiempoAproxEntrega
      telefono
      direccion
      provincia
      ciudad
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNegocios = /* GraphQL */ `
  subscription OnUpdateNegocios {
    onUpdateNegocios {
      id
      idCategoria
      idSubCategoria
      nombre
      descripcion
      tag
      categoriasItems {
        items {
          id
          idNegocio
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      profile
      horario {
        lunes {
          entrada
          salida
        }
        estadoLunes
        martes {
          entrada
          salida
        }
        estadoMartes
        miercoles {
          entrada
          salida
        }
        estadoMiercoles
        jueves {
          entrada
          salida
        }
        estadoJueves
        viernes {
          entrada
          salida
        }
        estadoViernes
        sabado {
          entrada
          salida
        }
        estadoSabado
        domingo {
          entrada
          salida
        }
        estadoDomingo
      }
      geolocacion {
        lat
        lon
      }
      representanteLegal
      identificacion
      RUC
      correo
      tiempoAproxEntrega
      telefono
      direccion
      provincia
      ciudad
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNegocios = /* GraphQL */ `
  subscription OnDeleteNegocios {
    onDeleteNegocios {
      id
      idCategoria
      idSubCategoria
      nombre
      descripcion
      tag
      categoriasItems {
        items {
          id
          idNegocio
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      profile
      horario {
        lunes {
          entrada
          salida
        }
        estadoLunes
        martes {
          entrada
          salida
        }
        estadoMartes
        miercoles {
          entrada
          salida
        }
        estadoMiercoles
        jueves {
          entrada
          salida
        }
        estadoJueves
        viernes {
          entrada
          salida
        }
        estadoViernes
        sabado {
          entrada
          salida
        }
        estadoSabado
        domingo {
          entrada
          salida
        }
        estadoDomingo
      }
      geolocacion {
        lat
        lon
      }
      representanteLegal
      identificacion
      RUC
      correo
      tiempoAproxEntrega
      telefono
      direccion
      provincia
      ciudad
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCiudades = /* GraphQL */ `
  subscription OnCreateCiudades {
    onCreateCiudades {
      id
      id_state
      name
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCiudades = /* GraphQL */ `
  subscription OnUpdateCiudades {
    onUpdateCiudades {
      id
      id_state
      name
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCiudades = /* GraphQL */ `
  subscription OnDeleteCiudades {
    onDeleteCiudades {
      id
      id_state
      name
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProvincias = /* GraphQL */ `
  subscription OnCreateProvincias {
    onCreateProvincias {
      id
      id_country
      name
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProvincias = /* GraphQL */ `
  subscription OnUpdateProvincias {
    onUpdateProvincias {
      id
      id_country
      name
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProvincias = /* GraphQL */ `
  subscription OnDeleteProvincias {
    onDeleteProvincias {
      id
      id_country
      name
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePedidos = /* GraphQL */ `
  subscription OnCreatePedidos {
    onCreatePedidos {
      id
      idNegocio
      idCliente
      items
      total
      idDespachador
      idUsuarioNegocio
      idTipoEnvio
      idTipoPago
      codigoPedido
      fechaHora
      observacines
      idChat
      observacinesChat
      confirmaNegocio
      pedidoListo
      despachadorAsig
      despachadorEnNegocio
      despachadorEnCamino
      despachadorEnSitio
      pedidoEntregado
      pedidoCancelado
      idMotivoCancelado
      idPago
      observacinesCancelacion
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePedidos = /* GraphQL */ `
  subscription OnUpdatePedidos {
    onUpdatePedidos {
      id
      idNegocio
      idCliente
      items
      total
      idDespachador
      idUsuarioNegocio
      idTipoEnvio
      idTipoPago
      codigoPedido
      fechaHora
      observacines
      idChat
      observacinesChat
      confirmaNegocio
      pedidoListo
      despachadorAsig
      despachadorEnNegocio
      despachadorEnCamino
      despachadorEnSitio
      pedidoEntregado
      pedidoCancelado
      idMotivoCancelado
      idPago
      observacinesCancelacion
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePedidos = /* GraphQL */ `
  subscription OnDeletePedidos {
    onDeletePedidos {
      id
      idNegocio
      idCliente
      items
      total
      idDespachador
      idUsuarioNegocio
      idTipoEnvio
      idTipoPago
      codigoPedido
      fechaHora
      observacines
      idChat
      observacinesChat
      confirmaNegocio
      pedidoListo
      despachadorAsig
      despachadorEnNegocio
      despachadorEnCamino
      despachadorEnSitio
      pedidoEntregado
      pedidoCancelado
      idMotivoCancelado
      idPago
      observacinesCancelacion
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateItemsPedidos = /* GraphQL */ `
  subscription OnCreateItemsPedidos {
    onCreateItemsPedidos {
      id
      idPedido
      idItems
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItemsPedidos = /* GraphQL */ `
  subscription OnUpdateItemsPedidos {
    onUpdateItemsPedidos {
      id
      idPedido
      idItems
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItemsPedidos = /* GraphQL */ `
  subscription OnDeleteItemsPedidos {
    onDeleteItemsPedidos {
      id
      idPedido
      idItems
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTipoPedido = /* GraphQL */ `
  subscription OnCreateTipoPedido {
    onCreateTipoPedido {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTipoPedido = /* GraphQL */ `
  subscription OnUpdateTipoPedido {
    onUpdateTipoPedido {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTipoPedido = /* GraphQL */ `
  subscription OnDeleteTipoPedido {
    onDeleteTipoPedido {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTipoPago = /* GraphQL */ `
  subscription OnCreateTipoPago {
    onCreateTipoPago {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTipoPago = /* GraphQL */ `
  subscription OnUpdateTipoPago {
    onUpdateTipoPago {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTipoPago = /* GraphQL */ `
  subscription OnDeleteTipoPago {
    onDeleteTipoPago {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMotivoCancelado = /* GraphQL */ `
  subscription OnCreateMotivoCancelado {
    onCreateMotivoCancelado {
      id
      nombre
      tipoCancelado
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMotivoCancelado = /* GraphQL */ `
  subscription OnUpdateMotivoCancelado {
    onUpdateMotivoCancelado {
      id
      nombre
      tipoCancelado
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMotivoCancelado = /* GraphQL */ `
  subscription OnDeleteMotivoCancelado {
    onDeleteMotivoCancelado {
      id
      nombre
      tipoCancelado
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateItems = /* GraphQL */ `
  subscription OnCreateItems {
    onCreateItems {
      id
      nombre
      idNegocio
      descripcion
      tipoItem
      listadoComponentes {
        items {
          id
          idItemPadre
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      listadoExtras {
        items {
          id
          idItemPadre
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      idCategoria
      precioBase
      stockDiario
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItems = /* GraphQL */ `
  subscription OnUpdateItems {
    onUpdateItems {
      id
      nombre
      idNegocio
      descripcion
      tipoItem
      listadoComponentes {
        items {
          id
          idItemPadre
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      listadoExtras {
        items {
          id
          idItemPadre
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      idCategoria
      precioBase
      stockDiario
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItems = /* GraphQL */ `
  subscription OnDeleteItems {
    onDeleteItems {
      id
      nombre
      idNegocio
      descripcion
      tipoItem
      listadoComponentes {
        items {
          id
          idItemPadre
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      listadoExtras {
        items {
          id
          idItemPadre
          nombre
          courier
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      idCategoria
      precioBase
      stockDiario
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategoriasItemsExtras = /* GraphQL */ `
  subscription OnCreateCategoriasItemsExtras {
    onCreateCategoriasItemsExtras {
      id
      idItemPadre
      nombre
      courier
      items {
        items {
          id
          nombre
          idCategoriaExtra
          precio
          tipoRegistro
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategoriasItemsExtras = /* GraphQL */ `
  subscription OnUpdateCategoriasItemsExtras {
    onUpdateCategoriasItemsExtras {
      id
      idItemPadre
      nombre
      courier
      items {
        items {
          id
          nombre
          idCategoriaExtra
          precio
          tipoRegistro
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategoriasItemsExtras = /* GraphQL */ `
  subscription OnDeleteCategoriasItemsExtras {
    onDeleteCategoriasItemsExtras {
      id
      idItemPadre
      nombre
      courier
      items {
        items {
          id
          nombre
          idCategoriaExtra
          precio
          tipoRegistro
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategoriasItemsComponentes = /* GraphQL */ `
  subscription OnCreateCategoriasItemsComponentes {
    onCreateCategoriasItemsComponentes {
      id
      idItemPadre
      nombre
      courier
      items {
        items {
          id
          idCategoriaComponente
          tipoRegistro
          nombre
          precio
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategoriasItemsComponentes = /* GraphQL */ `
  subscription OnUpdateCategoriasItemsComponentes {
    onUpdateCategoriasItemsComponentes {
      id
      idItemPadre
      nombre
      courier
      items {
        items {
          id
          idCategoriaComponente
          tipoRegistro
          nombre
          precio
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategoriasItemsComponentes = /* GraphQL */ `
  subscription OnDeleteCategoriasItemsComponentes {
    onDeleteCategoriasItemsComponentes {
      id
      idItemPadre
      nombre
      courier
      items {
        items {
          id
          idCategoriaComponente
          tipoRegistro
          nombre
          precio
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateExtrasItemsV2 = /* GraphQL */ `
  subscription OnCreateExtrasItemsV2 {
    onCreateExtrasItemsV2 {
      id
      nombre
      idCategoriaExtra
      precio
      tipoRegistro
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateExtrasItemsV2 = /* GraphQL */ `
  subscription OnUpdateExtrasItemsV2 {
    onUpdateExtrasItemsV2 {
      id
      nombre
      idCategoriaExtra
      precio
      tipoRegistro
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteExtrasItemsV2 = /* GraphQL */ `
  subscription OnDeleteExtrasItemsV2 {
    onDeleteExtrasItemsV2 {
      id
      nombre
      idCategoriaExtra
      precio
      tipoRegistro
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComponentesItemsV2 = /* GraphQL */ `
  subscription OnCreateComponentesItemsV2 {
    onCreateComponentesItemsV2 {
      id
      idCategoriaComponente
      tipoRegistro
      nombre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComponentesItemsV2 = /* GraphQL */ `
  subscription OnUpdateComponentesItemsV2 {
    onUpdateComponentesItemsV2 {
      id
      idCategoriaComponente
      tipoRegistro
      nombre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComponentesItemsV2 = /* GraphQL */ `
  subscription OnDeleteComponentesItemsV2 {
    onDeleteComponentesItemsV2 {
      id
      idCategoriaComponente
      tipoRegistro
      nombre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRankingNegocios = /* GraphQL */ `
  subscription OnCreateRankingNegocios {
    onCreateRankingNegocios {
      id
      idNegocio
      idPedido
      valor
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRankingNegocios = /* GraphQL */ `
  subscription OnUpdateRankingNegocios {
    onUpdateRankingNegocios {
      id
      idNegocio
      idPedido
      valor
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRankingNegocios = /* GraphQL */ `
  subscription OnDeleteRankingNegocios {
    onDeleteRankingNegocios {
      id
      idNegocio
      idPedido
      valor
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRankingDespachador = /* GraphQL */ `
  subscription OnCreateRankingDespachador {
    onCreateRankingDespachador {
      id
      idDespachador
      idPedido
      valor
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRankingDespachador = /* GraphQL */ `
  subscription OnUpdateRankingDespachador {
    onUpdateRankingDespachador {
      id
      idDespachador
      idPedido
      valor
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRankingDespachador = /* GraphQL */ `
  subscription OnDeleteRankingDespachador {
    onDeleteRankingDespachador {
      id
      idDespachador
      idPedido
      valor
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePagos = /* GraphQL */ `
  subscription OnCreatePagos {
    onCreatePagos {
      id
      codigoReferencia
      tipo
      monto
      tipoTarjeta
      idPedido
      detalle
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePagos = /* GraphQL */ `
  subscription OnUpdatePagos {
    onUpdatePagos {
      id
      codigoReferencia
      tipo
      monto
      tipoTarjeta
      idPedido
      detalle
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePagos = /* GraphQL */ `
  subscription OnDeletePagos {
    onDeletePagos {
      id
      codigoReferencia
      tipo
      monto
      tipoTarjeta
      idPedido
      detalle
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTranferenciaNegocio = /* GraphQL */ `
  subscription OnCreateTranferenciaNegocio {
    onCreateTranferenciaNegocio {
      id
      codigo
      idNegocio
      fecha
      descripcion
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTranferenciaNegocio = /* GraphQL */ `
  subscription OnUpdateTranferenciaNegocio {
    onUpdateTranferenciaNegocio {
      id
      codigo
      idNegocio
      fecha
      descripcion
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTranferenciaNegocio = /* GraphQL */ `
  subscription OnDeleteTranferenciaNegocio {
    onDeleteTranferenciaNegocio {
      id
      codigo
      idNegocio
      fecha
      descripcion
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTranferenciaDespachador = /* GraphQL */ `
  subscription OnCreateTranferenciaDespachador {
    onCreateTranferenciaDespachador {
      id
      codigo
      idDespachador
      fecha
      descripcion
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTranferenciaDespachador = /* GraphQL */ `
  subscription OnUpdateTranferenciaDespachador {
    onUpdateTranferenciaDespachador {
      id
      codigo
      idDespachador
      fecha
      descripcion
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTranferenciaDespachador = /* GraphQL */ `
  subscription OnDeleteTranferenciaDespachador {
    onDeleteTranferenciaDespachador {
      id
      codigo
      idDespachador
      fecha
      descripcion
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDetalleTranferenciaNegocio = /* GraphQL */ `
  subscription OnCreateDetalleTranferenciaNegocio {
    onCreateDetalleTranferenciaNegocio {
      id
      idTransferencia
      idPedido
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDetalleTranferenciaNegocio = /* GraphQL */ `
  subscription OnUpdateDetalleTranferenciaNegocio {
    onUpdateDetalleTranferenciaNegocio {
      id
      idTransferencia
      idPedido
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDetalleTranferenciaNegocio = /* GraphQL */ `
  subscription OnDeleteDetalleTranferenciaNegocio {
    onDeleteDetalleTranferenciaNegocio {
      id
      idTransferencia
      idPedido
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDetalleTranferenciaDespachador = /* GraphQL */ `
  subscription OnCreateDetalleTranferenciaDespachador {
    onCreateDetalleTranferenciaDespachador {
      id
      idTransferencia
      idPedido
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDetalleTranferenciaDespachador = /* GraphQL */ `
  subscription OnUpdateDetalleTranferenciaDespachador {
    onUpdateDetalleTranferenciaDespachador {
      id
      idTransferencia
      idPedido
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDetalleTranferenciaDespachador = /* GraphQL */ `
  subscription OnDeleteDetalleTranferenciaDespachador {
    onDeleteDetalleTranferenciaDespachador {
      id
      idTransferencia
      idPedido
      monto
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onCreateConfiguraciones = /* GraphQL */ `
  subscription OnCreateConfiguraciones {
    onCreateConfiguraciones {
      id
      tarifaMensualNegocio
      tarifaMensualRepartidor
      comisionPedidos
      comisionEnvios
      kmMinimo
      tarifaEnvioMinima
      costoKmAdicional
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateConfiguraciones = /* GraphQL */ `
  subscription OnUpdateConfiguraciones {
    onUpdateConfiguraciones {
      id
      tarifaMensualNegocio
      tarifaMensualRepartidor
      comisionPedidos
      comisionEnvios
      kmMinimo
      tarifaEnvioMinima
      costoKmAdicional
      estado
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteConfiguraciones = /* GraphQL */ `
  subscription OnDeleteConfiguraciones {
    onDeleteConfiguraciones {
      id
      tarifaMensualNegocio
      tarifaMensualRepartidor
      comisionPedidos
      comisionEnvios
      kmMinimo
      tarifaEnvioMinima
      costoKmAdicional
      estado
      createdAt
      updatedAt
    }
  }
`;
