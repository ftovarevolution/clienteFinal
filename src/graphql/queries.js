/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDatosUsuario = /* GraphQL */ `
  query GetDatosUsuario($id: ID!) {
    getDatosUsuario(id: $id) {
      id
      nombre
      profile
      correo
      telefono
      tiposUsuario
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
export const listDatosUsuarios = /* GraphQL */ `
  query ListDatosUsuarios(
    $filter: ModeldatosUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDatosUsuarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombre
        profile
        correo
        telefono
        tiposUsuario
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
      nextToken
    }
  }
`;
export const getDireccionUsuario = /* GraphQL */ `
  query GetDireccionUsuario($id: ID!) {
    getDireccionUsuario(id: $id) {
      id
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
export const listDireccionUsuarios = /* GraphQL */ `
  query ListDireccionUsuarios(
    $filter: ModeldireccionUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDireccionUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nombre
        direccion
        geolocacion {
          lat
          lon
        }
        estado
      }
      nextToken
    }
  }
`;
export const getCategorias = /* GraphQL */ `
  query GetCategorias($id: ID!) {
    getCategorias(id: $id) {
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
export const listCategoriass = /* GraphQL */ `
  query ListCategoriass(
    $filter: ModelcategoriasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategoriass(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombre
        courier
        subCategorias {
          items {
            id
            Nombre
            estado
          }
        }
        estado
      }
      nextToken
    }
  }
`;
export const getSubCategorias = /* GraphQL */ `
  query GetSubCategorias($id: ID!) {
    getSubCategorias(id: $id) {
      id
      idCategoria
      Nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listSubCategoriass = /* GraphQL */ `
  query ListSubCategoriass(
    $filter: ModelsubCategoriasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubCategoriass(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idCategoria
        Nombre
        estado
      }
      nextToken
    }
  }
`;
export const getDespachadoresActivos = /* GraphQL */ `
  query GetDespachadoresActivos($id: ID!) {
    getDespachadoresActivos(id: $id) {
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
export const listDespachadoresActivoss = /* GraphQL */ `
  query ListDespachadoresActivoss(
    $filter: ModeldespachadoresActivosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDespachadoresActivoss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        estado
        location {
          lat
          lon
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatUsuarios = /* GraphQL */ `
  query GetChatUsuarios($id: ID!) {
    getChatUsuarios(id: $id) {
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
export const listChatUsuarioss = /* GraphQL */ `
  query ListChatUsuarioss(
    $filter: ModelchatUsuariosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatUsuarioss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getNegocios = /* GraphQL */ `
  query GetNegocios($id: ID!) {
    getNegocios(id: $id) {
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
export const listNegocioss = /* GraphQL */ `
  query ListNegocioss(
    $filter: ModelnegociosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNegocioss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idCategoria
        idSubCategoria
        nombre
        descripcion
        tag
        profile
        horario {
          estadoLunes
          estadoMartes
          estadoMiercoles
          estadoJueves
          estadoViernes
          estadoSabado
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
      nextToken
    }
  }
`;
export const getPedidos = /* GraphQL */ `
  query GetPedidos($id: ID!) {
    getPedidos(id: $id) {
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
export const listPedidoss = /* GraphQL */ `
  query ListPedidoss(
    $filter: ModelpedidosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPedidoss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getItemsPedidos = /* GraphQL */ `
  query GetItemsPedidos($id: ID!) {
    getItemsPedidos(id: $id) {
      id
      idPedido
      idItems
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listItemsPedidoss = /* GraphQL */ `
  query ListItemsPedidoss(
    $filter: ModelitemsPedidosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsPedidoss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idPedido
        idItems
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTipoPedido = /* GraphQL */ `
  query GetTipoPedido($id: ID!) {
    getTipoPedido(id: $id) {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listTipoPedidos = /* GraphQL */ `
  query ListTipoPedidos(
    $filter: ModeltipoPedidoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTipoPedidos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombre
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTipoPago = /* GraphQL */ `
  query GetTipoPago($id: ID!) {
    getTipoPago(id: $id) {
      id
      nombre
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listTipoPagos = /* GraphQL */ `
  query ListTipoPagos(
    $filter: ModeltipoPagoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTipoPagos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombre
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMotivoCancelado = /* GraphQL */ `
  query GetMotivoCancelado($id: ID!) {
    getMotivoCancelado(id: $id) {
      id
      nombre
      tipoCancelado
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listMotivoCancelados = /* GraphQL */ `
  query ListMotivoCancelados(
    $filter: ModelmotivoCanceladoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMotivoCancelados(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nombre
        tipoCancelado
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItems = /* GraphQL */ `
  query GetItems($id: ID!) {
    getItems(id: $id) {
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
export const listItemss = /* GraphQL */ `
  query ListItemss(
    $filter: ModelitemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getExtrasItems = /* GraphQL */ `
  query GetExtrasItems($id: ID!) {
    getExtrasItems(id: $id) {
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
export const listExtrasItemss = /* GraphQL */ `
  query ListExtrasItemss(
    $filter: ModelextrasItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExtrasItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombre
        idItemPadre
        precio
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComponentesItems = /* GraphQL */ `
  query GetComponentesItems($id: ID!) {
    getComponentesItems(id: $id) {
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
export const listComponentesItemss = /* GraphQL */ `
  query ListComponentesItemss(
    $filter: ModelcomponentesItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComponentesItemss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nombre
        idItemPadre
        precio
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRankingNegocios = /* GraphQL */ `
  query GetRankingNegocios($id: ID!) {
    getRankingNegocios(id: $id) {
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
export const listRankingNegocioss = /* GraphQL */ `
  query ListRankingNegocioss(
    $filter: ModelrankingNegociosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRankingNegocioss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idNegocio
        idPedido
        valor
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRankingDespachador = /* GraphQL */ `
  query GetRankingDespachador($id: ID!) {
    getRankingDespachador(id: $id) {
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
export const listRankingDespachadors = /* GraphQL */ `
  query ListRankingDespachadors(
    $filter: ModelrankingDespachadorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRankingDespachadors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idDespachador
        idPedido
        valor
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPagos = /* GraphQL */ `
  query GetPagos($id: ID!) {
    getPagos(id: $id) {
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
export const listPagoss = /* GraphQL */ `
  query ListPagoss(
    $filter: ModelpagosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPagoss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTranferenciaNegocio = /* GraphQL */ `
  query GetTranferenciaNegocio($id: ID!) {
    getTranferenciaNegocio(id: $id) {
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
export const listTranferenciaNegocios = /* GraphQL */ `
  query ListTranferenciaNegocios(
    $filter: ModeltranferenciaNegocioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTranferenciaNegocios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTranferenciaDespachador = /* GraphQL */ `
  query GetTranferenciaDespachador($id: ID!) {
    getTranferenciaDespachador(id: $id) {
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
export const listTranferenciaDespachadors = /* GraphQL */ `
  query ListTranferenciaDespachadors(
    $filter: ModeltranferenciaDespachadorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTranferenciaDespachadors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getDetalleTranferenciaNegocio = /* GraphQL */ `
  query GetDetalleTranferenciaNegocio($id: ID!) {
    getDetalleTranferenciaNegocio(id: $id) {
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
export const listDetalleTranferenciaNegocios = /* GraphQL */ `
  query ListDetalleTranferenciaNegocios(
    $filter: ModeldetalleTranferenciaNegocioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDetalleTranferenciaNegocios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idTransferencia
        idPedido
        monto
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDetalleTranferenciaDespachador = /* GraphQL */ `
  query GetDetalleTranferenciaDespachador($id: ID!) {
    getDetalleTranferenciaDespachador(id: $id) {
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
export const listDetalleTranferenciaDespachadors = /* GraphQL */ `
  query ListDetalleTranferenciaDespachadors(
    $filter: ModeldetalleTranferenciaDespachadorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDetalleTranferenciaDespachadors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idTransferencia
        idPedido
        monto
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchDespachadoresActivoss = /* GraphQL */ `
  query SearchDespachadoresActivoss(
    $filter: SearchabledespachadoresActivosFilterInput
    $sort: SearchabledespachadoresActivosSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchDespachadoresActivoss(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        estado
        location {
          lat
          lon
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
