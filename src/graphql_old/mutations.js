/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDatosUsuario = /* GraphQL */ `
  mutation CreateDatosUsuario(
    $input: CreateDatosUsuarioInput!
    $condition: ModeldatosUsuarioConditionInput
  ) {
    createDatosUsuario(input: $input, condition: $condition) {
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
export const updateDatosUsuario = /* GraphQL */ `
  mutation UpdateDatosUsuario(
    $input: UpdateDatosUsuarioInput!
    $condition: ModeldatosUsuarioConditionInput
  ) {
    updateDatosUsuario(input: $input, condition: $condition) {
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
export const deleteDatosUsuario = /* GraphQL */ `
  mutation DeleteDatosUsuario(
    $input: DeleteDatosUsuarioInput!
    $condition: ModeldatosUsuarioConditionInput
  ) {
    deleteDatosUsuario(input: $input, condition: $condition) {
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
export const createDatosUsuarioDespachador = /* GraphQL */ `
  mutation CreateDatosUsuarioDespachador(
    $input: CreateDatosUsuarioDespachadorInput!
    $condition: ModeldatosUsuarioDespachadorConditionInput
  ) {
    createDatosUsuarioDespachador(input: $input, condition: $condition) {
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
export const updateDatosUsuarioDespachador = /* GraphQL */ `
  mutation UpdateDatosUsuarioDespachador(
    $input: UpdateDatosUsuarioDespachadorInput!
    $condition: ModeldatosUsuarioDespachadorConditionInput
  ) {
    updateDatosUsuarioDespachador(input: $input, condition: $condition) {
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
export const deleteDatosUsuarioDespachador = /* GraphQL */ `
  mutation DeleteDatosUsuarioDespachador(
    $input: DeleteDatosUsuarioDespachadorInput!
    $condition: ModeldatosUsuarioDespachadorConditionInput
  ) {
    deleteDatosUsuarioDespachador(input: $input, condition: $condition) {
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
export const createDireccionUsuario = /* GraphQL */ `
  mutation CreateDireccionUsuario(
    $input: CreateDireccionUsuarioInput!
    $condition: ModeldireccionUsuarioConditionInput
  ) {
    createDireccionUsuario(input: $input, condition: $condition) {
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
export const updateDireccionUsuario = /* GraphQL */ `
  mutation UpdateDireccionUsuario(
    $input: UpdateDireccionUsuarioInput!
    $condition: ModeldireccionUsuarioConditionInput
  ) {
    updateDireccionUsuario(input: $input, condition: $condition) {
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
export const deleteDireccionUsuario = /* GraphQL */ `
  mutation DeleteDireccionUsuario(
    $input: DeleteDireccionUsuarioInput!
    $condition: ModeldireccionUsuarioConditionInput
  ) {
    deleteDireccionUsuario(input: $input, condition: $condition) {
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
export const createCategorias = /* GraphQL */ `
  mutation CreateCategorias(
    $input: CreateCategoriasInput!
    $condition: ModelcategoriasConditionInput
  ) {
    createCategorias(input: $input, condition: $condition) {
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
export const updateCategorias = /* GraphQL */ `
  mutation UpdateCategorias(
    $input: UpdateCategoriasInput!
    $condition: ModelcategoriasConditionInput
  ) {
    updateCategorias(input: $input, condition: $condition) {
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
export const deleteCategorias = /* GraphQL */ `
  mutation DeleteCategorias(
    $input: DeleteCategoriasInput!
    $condition: ModelcategoriasConditionInput
  ) {
    deleteCategorias(input: $input, condition: $condition) {
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
export const createSubCategorias = /* GraphQL */ `
  mutation CreateSubCategorias(
    $input: CreateSubCategoriasInput!
    $condition: ModelsubCategoriasConditionInput
  ) {
    createSubCategorias(input: $input, condition: $condition) {
      id
      idCategoria
      Nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const updateSubCategorias = /* GraphQL */ `
  mutation UpdateSubCategorias(
    $input: UpdateSubCategoriasInput!
    $condition: ModelsubCategoriasConditionInput
  ) {
    updateSubCategorias(input: $input, condition: $condition) {
      id
      idCategoria
      Nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubCategorias = /* GraphQL */ `
  mutation DeleteSubCategorias(
    $input: DeleteSubCategoriasInput!
    $condition: ModelsubCategoriasConditionInput
  ) {
    deleteSubCategorias(input: $input, condition: $condition) {
      id
      idCategoria
      Nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const createDespachadoresActivos = /* GraphQL */ `
  mutation CreateDespachadoresActivos(
    $input: CreateDespachadoresActivosInput!
    $condition: ModeldespachadoresActivosConditionInput
  ) {
    createDespachadoresActivos(input: $input, condition: $condition) {
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
export const updateDespachadoresActivos = /* GraphQL */ `
  mutation UpdateDespachadoresActivos(
    $input: UpdateDespachadoresActivosInput!
    $condition: ModeldespachadoresActivosConditionInput
  ) {
    updateDespachadoresActivos(input: $input, condition: $condition) {
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
export const deleteDespachadoresActivos = /* GraphQL */ `
  mutation DeleteDespachadoresActivos(
    $input: DeleteDespachadoresActivosInput!
    $condition: ModeldespachadoresActivosConditionInput
  ) {
    deleteDespachadoresActivos(input: $input, condition: $condition) {
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
export const createChatUsuarios = /* GraphQL */ `
  mutation CreateChatUsuarios(
    $input: CreateChatUsuariosInput!
    $condition: ModelchatUsuariosConditionInput
  ) {
    createChatUsuarios(input: $input, condition: $condition) {
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
export const updateChatUsuarios = /* GraphQL */ `
  mutation UpdateChatUsuarios(
    $input: UpdateChatUsuariosInput!
    $condition: ModelchatUsuariosConditionInput
  ) {
    updateChatUsuarios(input: $input, condition: $condition) {
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
export const deleteChatUsuarios = /* GraphQL */ `
  mutation DeleteChatUsuarios(
    $input: DeleteChatUsuariosInput!
    $condition: ModelchatUsuariosConditionInput
  ) {
    deleteChatUsuarios(input: $input, condition: $condition) {
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
export const createNegocios = /* GraphQL */ `
  mutation CreateNegocios(
    $input: CreateNegociosInput!
    $condition: ModelnegociosConditionInput
  ) {
    createNegocios(input: $input, condition: $condition) {
      id
      idCategoria
      idSubCategoria
      nombre
      descripcion
      tag
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
export const updateNegocios = /* GraphQL */ `
  mutation UpdateNegocios(
    $input: UpdateNegociosInput!
    $condition: ModelnegociosConditionInput
  ) {
    updateNegocios(input: $input, condition: $condition) {
      id
      idCategoria
      idSubCategoria
      nombre
      descripcion
      tag
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
export const deleteNegocios = /* GraphQL */ `
  mutation DeleteNegocios(
    $input: DeleteNegociosInput!
    $condition: ModelnegociosConditionInput
  ) {
    deleteNegocios(input: $input, condition: $condition) {
      id
      idCategoria
      idSubCategoria
      nombre
      descripcion
      tag
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
export const createPedidos = /* GraphQL */ `
  mutation CreatePedidos(
    $input: CreatePedidosInput!
    $condition: ModelpedidosConditionInput
  ) {
    createPedidos(input: $input, condition: $condition) {
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
export const updatePedidos = /* GraphQL */ `
  mutation UpdatePedidos(
    $input: UpdatePedidosInput!
    $condition: ModelpedidosConditionInput
  ) {
    updatePedidos(input: $input, condition: $condition) {
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
export const deletePedidos = /* GraphQL */ `
  mutation DeletePedidos(
    $input: DeletePedidosInput!
    $condition: ModelpedidosConditionInput
  ) {
    deletePedidos(input: $input, condition: $condition) {
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
export const createItemsPedidos = /* GraphQL */ `
  mutation CreateItemsPedidos(
    $input: CreateItemsPedidosInput!
    $condition: ModelitemsPedidosConditionInput
  ) {
    createItemsPedidos(input: $input, condition: $condition) {
      id
      idPedido
      idItems
      estado
      createdAt
      updatedAt
    }
  }
`;
export const updateItemsPedidos = /* GraphQL */ `
  mutation UpdateItemsPedidos(
    $input: UpdateItemsPedidosInput!
    $condition: ModelitemsPedidosConditionInput
  ) {
    updateItemsPedidos(input: $input, condition: $condition) {
      id
      idPedido
      idItems
      estado
      createdAt
      updatedAt
    }
  }
`;
export const deleteItemsPedidos = /* GraphQL */ `
  mutation DeleteItemsPedidos(
    $input: DeleteItemsPedidosInput!
    $condition: ModelitemsPedidosConditionInput
  ) {
    deleteItemsPedidos(input: $input, condition: $condition) {
      id
      idPedido
      idItems
      estado
      createdAt
      updatedAt
    }
  }
`;
export const createTipoPedido = /* GraphQL */ `
  mutation CreateTipoPedido(
    $input: CreateTipoPedidoInput!
    $condition: ModeltipoPedidoConditionInput
  ) {
    createTipoPedido(input: $input, condition: $condition) {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const updateTipoPedido = /* GraphQL */ `
  mutation UpdateTipoPedido(
    $input: UpdateTipoPedidoInput!
    $condition: ModeltipoPedidoConditionInput
  ) {
    updateTipoPedido(input: $input, condition: $condition) {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const deleteTipoPedido = /* GraphQL */ `
  mutation DeleteTipoPedido(
    $input: DeleteTipoPedidoInput!
    $condition: ModeltipoPedidoConditionInput
  ) {
    deleteTipoPedido(input: $input, condition: $condition) {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const createTipoPago = /* GraphQL */ `
  mutation CreateTipoPago(
    $input: CreateTipoPagoInput!
    $condition: ModeltipoPagoConditionInput
  ) {
    createTipoPago(input: $input, condition: $condition) {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const updateTipoPago = /* GraphQL */ `
  mutation UpdateTipoPago(
    $input: UpdateTipoPagoInput!
    $condition: ModeltipoPagoConditionInput
  ) {
    updateTipoPago(input: $input, condition: $condition) {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const deleteTipoPago = /* GraphQL */ `
  mutation DeleteTipoPago(
    $input: DeleteTipoPagoInput!
    $condition: ModeltipoPagoConditionInput
  ) {
    deleteTipoPago(input: $input, condition: $condition) {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const createMotivoCancelado = /* GraphQL */ `
  mutation CreateMotivoCancelado(
    $input: CreateMotivoCanceladoInput!
    $condition: ModelmotivoCanceladoConditionInput
  ) {
    createMotivoCancelado(input: $input, condition: $condition) {
      id
      nombre
      tipoCancelado
      estado
      createdAt
      updatedAt
    }
  }
`;
export const updateMotivoCancelado = /* GraphQL */ `
  mutation UpdateMotivoCancelado(
    $input: UpdateMotivoCanceladoInput!
    $condition: ModelmotivoCanceladoConditionInput
  ) {
    updateMotivoCancelado(input: $input, condition: $condition) {
      id
      nombre
      tipoCancelado
      estado
      createdAt
      updatedAt
    }
  }
`;
export const deleteMotivoCancelado = /* GraphQL */ `
  mutation DeleteMotivoCancelado(
    $input: DeleteMotivoCanceladoInput!
    $condition: ModelmotivoCanceladoConditionInput
  ) {
    deleteMotivoCancelado(input: $input, condition: $condition) {
      id
      nombre
      tipoCancelado
      estado
      createdAt
      updatedAt
    }
  }
`;
export const createItems = /* GraphQL */ `
  mutation CreateItems(
    $input: CreateItemsInput!
    $condition: ModelitemsConditionInput
  ) {
    createItems(input: $input, condition: $condition) {
      id
      nombre
      idNegocio
      descripcion
      tipoItem
      listadoComponentes
      listadoExtras
      precioBase
      stockDiario
      estado
      createdAt
      updatedAt
    }
  }
`;
export const updateItems = /* GraphQL */ `
  mutation UpdateItems(
    $input: UpdateItemsInput!
    $condition: ModelitemsConditionInput
  ) {
    updateItems(input: $input, condition: $condition) {
      id
      nombre
      idNegocio
      descripcion
      tipoItem
      listadoComponentes
      listadoExtras
      precioBase
      stockDiario
      estado
      createdAt
      updatedAt
    }
  }
`;
export const deleteItems = /* GraphQL */ `
  mutation DeleteItems(
    $input: DeleteItemsInput!
    $condition: ModelitemsConditionInput
  ) {
    deleteItems(input: $input, condition: $condition) {
      id
      nombre
      idNegocio
      descripcion
      tipoItem
      listadoComponentes
      listadoExtras
      precioBase
      stockDiario
      estado
      createdAt
      updatedAt
    }
  }
`;
export const createExtrasItems = /* GraphQL */ `
  mutation CreateExtrasItems(
    $input: CreateExtrasItemsInput!
    $condition: ModelextrasItemsConditionInput
  ) {
    createExtrasItems(input: $input, condition: $condition) {
      id
      nombre
      idItemPadre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const updateExtrasItems = /* GraphQL */ `
  mutation UpdateExtrasItems(
    $input: UpdateExtrasItemsInput!
    $condition: ModelextrasItemsConditionInput
  ) {
    updateExtrasItems(input: $input, condition: $condition) {
      id
      nombre
      idItemPadre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const deleteExtrasItems = /* GraphQL */ `
  mutation DeleteExtrasItems(
    $input: DeleteExtrasItemsInput!
    $condition: ModelextrasItemsConditionInput
  ) {
    deleteExtrasItems(input: $input, condition: $condition) {
      id
      nombre
      idItemPadre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const createComponentesItems = /* GraphQL */ `
  mutation CreateComponentesItems(
    $input: CreateComponentesItemsInput!
    $condition: ModelcomponentesItemsConditionInput
  ) {
    createComponentesItems(input: $input, condition: $condition) {
      id
      nombre
      idItemPadre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const updateComponentesItems = /* GraphQL */ `
  mutation UpdateComponentesItems(
    $input: UpdateComponentesItemsInput!
    $condition: ModelcomponentesItemsConditionInput
  ) {
    updateComponentesItems(input: $input, condition: $condition) {
      id
      nombre
      idItemPadre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const deleteComponentesItems = /* GraphQL */ `
  mutation DeleteComponentesItems(
    $input: DeleteComponentesItemsInput!
    $condition: ModelcomponentesItemsConditionInput
  ) {
    deleteComponentesItems(input: $input, condition: $condition) {
      id
      nombre
      idItemPadre
      precio
      estado
      createdAt
      updatedAt
    }
  }
`;
export const createRankingNegocios = /* GraphQL */ `
  mutation CreateRankingNegocios(
    $input: CreateRankingNegociosInput!
    $condition: ModelrankingNegociosConditionInput
  ) {
    createRankingNegocios(input: $input, condition: $condition) {
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
export const updateRankingNegocios = /* GraphQL */ `
  mutation UpdateRankingNegocios(
    $input: UpdateRankingNegociosInput!
    $condition: ModelrankingNegociosConditionInput
  ) {
    updateRankingNegocios(input: $input, condition: $condition) {
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
export const deleteRankingNegocios = /* GraphQL */ `
  mutation DeleteRankingNegocios(
    $input: DeleteRankingNegociosInput!
    $condition: ModelrankingNegociosConditionInput
  ) {
    deleteRankingNegocios(input: $input, condition: $condition) {
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
export const createRankingDespachador = /* GraphQL */ `
  mutation CreateRankingDespachador(
    $input: CreateRankingDespachadorInput!
    $condition: ModelrankingDespachadorConditionInput
  ) {
    createRankingDespachador(input: $input, condition: $condition) {
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
export const updateRankingDespachador = /* GraphQL */ `
  mutation UpdateRankingDespachador(
    $input: UpdateRankingDespachadorInput!
    $condition: ModelrankingDespachadorConditionInput
  ) {
    updateRankingDespachador(input: $input, condition: $condition) {
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
export const deleteRankingDespachador = /* GraphQL */ `
  mutation DeleteRankingDespachador(
    $input: DeleteRankingDespachadorInput!
    $condition: ModelrankingDespachadorConditionInput
  ) {
    deleteRankingDespachador(input: $input, condition: $condition) {
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
export const createPagos = /* GraphQL */ `
  mutation CreatePagos(
    $input: CreatePagosInput!
    $condition: ModelpagosConditionInput
  ) {
    createPagos(input: $input, condition: $condition) {
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
export const updatePagos = /* GraphQL */ `
  mutation UpdatePagos(
    $input: UpdatePagosInput!
    $condition: ModelpagosConditionInput
  ) {
    updatePagos(input: $input, condition: $condition) {
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
export const deletePagos = /* GraphQL */ `
  mutation DeletePagos(
    $input: DeletePagosInput!
    $condition: ModelpagosConditionInput
  ) {
    deletePagos(input: $input, condition: $condition) {
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
export const createTranferenciaNegocio = /* GraphQL */ `
  mutation CreateTranferenciaNegocio(
    $input: CreateTranferenciaNegocioInput!
    $condition: ModeltranferenciaNegocioConditionInput
  ) {
    createTranferenciaNegocio(input: $input, condition: $condition) {
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
export const updateTranferenciaNegocio = /* GraphQL */ `
  mutation UpdateTranferenciaNegocio(
    $input: UpdateTranferenciaNegocioInput!
    $condition: ModeltranferenciaNegocioConditionInput
  ) {
    updateTranferenciaNegocio(input: $input, condition: $condition) {
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
export const deleteTranferenciaNegocio = /* GraphQL */ `
  mutation DeleteTranferenciaNegocio(
    $input: DeleteTranferenciaNegocioInput!
    $condition: ModeltranferenciaNegocioConditionInput
  ) {
    deleteTranferenciaNegocio(input: $input, condition: $condition) {
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
export const createTranferenciaDespachador = /* GraphQL */ `
  mutation CreateTranferenciaDespachador(
    $input: CreateTranferenciaDespachadorInput!
    $condition: ModeltranferenciaDespachadorConditionInput
  ) {
    createTranferenciaDespachador(input: $input, condition: $condition) {
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
export const updateTranferenciaDespachador = /* GraphQL */ `
  mutation UpdateTranferenciaDespachador(
    $input: UpdateTranferenciaDespachadorInput!
    $condition: ModeltranferenciaDespachadorConditionInput
  ) {
    updateTranferenciaDespachador(input: $input, condition: $condition) {
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
export const deleteTranferenciaDespachador = /* GraphQL */ `
  mutation DeleteTranferenciaDespachador(
    $input: DeleteTranferenciaDespachadorInput!
    $condition: ModeltranferenciaDespachadorConditionInput
  ) {
    deleteTranferenciaDespachador(input: $input, condition: $condition) {
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
export const createDetalleTranferenciaNegocio = /* GraphQL */ `
  mutation CreateDetalleTranferenciaNegocio(
    $input: CreateDetalleTranferenciaNegocioInput!
    $condition: ModeldetalleTranferenciaNegocioConditionInput
  ) {
    createDetalleTranferenciaNegocio(input: $input, condition: $condition) {
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
export const updateDetalleTranferenciaNegocio = /* GraphQL */ `
  mutation UpdateDetalleTranferenciaNegocio(
    $input: UpdateDetalleTranferenciaNegocioInput!
    $condition: ModeldetalleTranferenciaNegocioConditionInput
  ) {
    updateDetalleTranferenciaNegocio(input: $input, condition: $condition) {
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
export const deleteDetalleTranferenciaNegocio = /* GraphQL */ `
  mutation DeleteDetalleTranferenciaNegocio(
    $input: DeleteDetalleTranferenciaNegocioInput!
    $condition: ModeldetalleTranferenciaNegocioConditionInput
  ) {
    deleteDetalleTranferenciaNegocio(input: $input, condition: $condition) {
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
export const createDetalleTranferenciaDespachador = /* GraphQL */ `
  mutation CreateDetalleTranferenciaDespachador(
    $input: CreateDetalleTranferenciaDespachadorInput!
    $condition: ModeldetalleTranferenciaDespachadorConditionInput
  ) {
    createDetalleTranferenciaDespachador(input: $input, condition: $condition) {
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
export const updateDetalleTranferenciaDespachador = /* GraphQL */ `
  mutation UpdateDetalleTranferenciaDespachador(
    $input: UpdateDetalleTranferenciaDespachadorInput!
    $condition: ModeldetalleTranferenciaDespachadorConditionInput
  ) {
    updateDetalleTranferenciaDespachador(input: $input, condition: $condition) {
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
export const deleteDetalleTranferenciaDespachador = /* GraphQL */ `
  mutation DeleteDetalleTranferenciaDespachador(
    $input: DeleteDetalleTranferenciaDespachadorInput!
    $condition: ModeldetalleTranferenciaDespachadorConditionInput
  ) {
    deleteDetalleTranferenciaDespachador(input: $input, condition: $condition) {
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
export const createConfiguraciones = /* GraphQL */ `
  mutation CreateConfiguraciones(
    $input: CreateConfiguracionesInput!
    $condition: ModelconfiguracionesConditionInput
  ) {
    createConfiguraciones(input: $input, condition: $condition) {
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
export const updateConfiguraciones = /* GraphQL */ `
  mutation UpdateConfiguraciones(
    $input: UpdateConfiguracionesInput!
    $condition: ModelconfiguracionesConditionInput
  ) {
    updateConfiguraciones(input: $input, condition: $condition) {
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
export const deleteConfiguraciones = /* GraphQL */ `
  mutation DeleteConfiguraciones(
    $input: DeleteConfiguracionesInput!
    $condition: ModelconfiguracionesConditionInput
  ) {
    deleteConfiguraciones(input: $input, condition: $condition) {
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
