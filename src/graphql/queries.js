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
      nextToken
    }
  }
`;
export const getDatosUsuarioDespachador = /* GraphQL */ `
  query GetDatosUsuarioDespachador($id: ID!) {
    getDatosUsuarioDespachador(id: $id) {
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
export const listDatosUsuarioDespachadors = /* GraphQL */ `
  query ListDatosUsuarioDespachadors(
    $filter: ModeldatosUsuarioDespachadorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDatosUsuarioDespachadors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getDireccionUsuario = /* GraphQL */ `
  query GetDireccionUsuario($id: ID!) {
    getDireccionUsuario(id: $id) {
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
          nextToken
        }
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategoriasItems = /* GraphQL */ `
  query GetCategoriasItems($id: ID!) {
    getCategoriasItems(id: $id) {
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
export const listCategoriasItemss = /* GraphQL */ `
  query ListCategoriasItemss(
    $filter: ModelcategoriasItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategoriasItemss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idNegocio
        nombre
        courier
        items {
          nextToken
        }
        estado
        createdAt
        updatedAt
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
        createdAt
        updatedAt
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
export const listNegocioss = /* GraphQL */ `
  query ListNegocioss(
    $filter: ModelnegociosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNegocioss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        RUC
        ciudad
        correo
        createdAt
        descripcion
        direccion
        estado
        id
        idCategoria
        idSubCategoria
        identificacion
        nombre
        profile
        provincia
        representanteLegal
        tag
        telefono
        tiempoAproxEntrega
        updatedAt
        geolocacion {
          lat
          lon
        }
        horario {
          domingo {
            entrada
            salida
          }
          estadoDomingo
          estadoJueves
          estadoLunes
          estadoMartes
          estadoMiercoles
          estadoSabado
          estadoViernes
          jueves {
            entrada
            salida
          }
          lunes {
            entrada
            salida
          }
          martes {
            entrada
            salida
          }
          miercoles {
            entrada
            salida
          }
          sabado {
            entrada
            salida
          }
          viernes {
            entrada
            salida
          }
        }
        categoriasItems {
          items {
            courier
            createdAt
            estado
            id
            idNegocio
            nombre
            updatedAt
            items {
              items {
                createdAt
                descripcion
                estado
                id
                idCategoria
                idNegocio
                nombre
                precioBase
                stockDiario
                tipoItem
                updatedAt
                listadoComponentes {
                  items {
                    courier
                    createdAt
                    estado
                    id
                    idItemPadre
                    nombre
                    updatedAt
                    items {
                      items {
                        createdAt
                        estado
                        id
                        idCategoriaComponente
                        nombre
                        precio
                        tipoRegistro
                        updatedAt
                      }
                    }
                  }
                }
                listadoExtras {
                  items {
                    courier
                    createdAt
                    estado
                    id
                    idItemPadre
                    nombre
                    updatedAt
                    items {
                      items {
                        createdAt
                        estado
                        id
                        idCategoriaExtra
                        nombre
                        precio
                        tipoRegistro
                        updatedAt
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;
export const getCiudades = /* GraphQL */ `
  query GetCiudades($id: ID!) {
    getCiudades(id: $id) {
      id
      id_state
      name
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listCiudadess = /* GraphQL */ `
  query ListCiudadess(
    $filter: ModelCiudadesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCiudadess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        id_state
        name
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProvincias = /* GraphQL */ `
  query GetProvincias($id: ID!) {
    getProvincias(id: $id) {
      id
      id_country
      name
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listProvinciass = /* GraphQL */ `
  query ListProvinciass(
    $filter: ModelProvinciasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProvinciass(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        id_country
        name
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
      datosNegocio {
        id
        idCategoria
        idSubCategoria
        nombre
        descripcion
        tag
        categoriasItems {
          nextToken
        }
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
        tiempoAproxEntrega
        telefono
        direccion
        provincia
        ciudad
        estado
        createdAt
        updatedAt
      }
      idCliente
      datosCliente {
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
      idDespachador
      itemsPedidos {
        items {
          id
          idPedido
          idItems
          cantidad
          precioTotal
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      total
      idUsuarioNegocio
      idTipoEnvio
      idTipoPago
      codigoPedido
      fechaHora
      observacines
      idChat
      precioDelivery
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
        datosNegocio {
          id
          idCategoria
          idSubCategoria
          nombre
          descripcion
          tag
          profile
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
        idCliente
        datosCliente {
          id
          nombre
          profile
          correo
          telefono
          tiposUsuario
          estado
          createdAt
          updatedAt
        }
        idDespachador
        total
        idUsuarioNegocio
        idTipoEnvio
        idTipoPago
        codigoPedido
        fechaHora
        observacines
        idChat
        precioDelivery
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
        itemsPedidos {
          items {
            cantidad
            estado
            id
            idItems
            idPedido
            precioTotal
            updatedAt
            datosItem {
              estado
              nombre
            }
            itemsExtrasPedidos {
              items {
                cantidad
                estado
                id
                idItemPedido
                idItems
                precioTotal
                datosItem {
                  nombre
                }
              }
            }
            itemsComponentesPedidos {
              items {
                cantidad
                estado
                id
                idItemPedido
                idItems
                precioTotal
                datosItem {
                  nombre
                  id
                }
              }
            }
          }
        }
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
      datosItem {
        id
        nombre
        idNegocio
        descripcion
        tipoItem
        listadoComponentes {
          nextToken
        }
        listadoExtras {
          nextToken
        }
        idCategoria
        precioBase
        stockDiario
        estado
        createdAt
        updatedAt
      }
      itemsComponentesPedidos {
        items {
          id
          idItemPedido
          idItems
          cantidad
          precioTotal
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      itemsExtrasPedidos {
        items {
          id
          idItemPedido
          idItems
          cantidad
          precioTotal
          estado
          createdAt
          updatedAt
        }
        nextToken
      }
      cantidad
      precioTotal
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
        datosItem {
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
        itemsComponentesPedidos {
          nextToken
        }
        itemsExtrasPedidos {
          nextToken
        }
        cantidad
        precioTotal
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItemsComponentesPedidosV2 = /* GraphQL */ `
  query GetItemsComponentesPedidosV2($id: ID!) {
    getItemsComponentesPedidosV2(id: $id) {
      id
      idItemPedido
      idItems
      datosItem {
        id
        idCategoriaComponente
        tipoRegistro
        nombre
        precio
        estado
        createdAt
        updatedAt
      }
      cantidad
      precioTotal
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listItemsComponentesPedidosV2s = /* GraphQL */ `
  query ListItemsComponentesPedidosV2s(
    $filter: ModelitemsComponentesPedidosV2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsComponentesPedidosV2s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idItemPedido
        idItems
        datosItem {
          id
          idCategoriaComponente
          tipoRegistro
          nombre
          precio
          estado
          createdAt
          updatedAt
        }
        cantidad
        precioTotal
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItemsExtrasPedidosV2 = /* GraphQL */ `
  query GetItemsExtrasPedidosV2($id: ID!) {
    getItemsExtrasPedidosV2(id: $id) {
      id
      idItemPedido
      idItems
      datosItem {
        id
        nombre
        idCategoriaExtra
        precio
        tipoRegistro
        estado
        createdAt
        updatedAt
      }
      cantidad
      precioTotal
      estado
      createdAt
      updatedAt
    }
  }
`;
export const listItemsExtrasPedidosV2s = /* GraphQL */ `
  query ListItemsExtrasPedidosV2s(
    $filter: ModelitemsExtrasPedidosV2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsExtrasPedidosV2s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idItemPedido
        idItems
        datosItem {
          id
          nombre
          idCategoriaExtra
          precio
          tipoRegistro
          estado
          createdAt
          updatedAt
        }
        cantidad
        precioTotal
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
        listadoComponentes {
          nextToken
        }
        listadoExtras {
          nextToken
        }
        idCategoria
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
export const getCategoriasItemsExtras = /* GraphQL */ `
  query GetCategoriasItemsExtras($id: ID!) {
    getCategoriasItemsExtras(id: $id) {
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
export const listCategoriasItemsExtrass = /* GraphQL */ `
  query ListCategoriasItemsExtrass(
    $filter: ModelcategoriasItemsExtrasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategoriasItemsExtrass(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idItemPadre
        nombre
        courier
        items {
          nextToken
        }
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategoriasItemsComponentes = /* GraphQL */ `
  query GetCategoriasItemsComponentes($id: ID!) {
    getCategoriasItemsComponentes(id: $id) {
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
export const listCategoriasItemsComponentess = /* GraphQL */ `
  query ListCategoriasItemsComponentess(
    $filter: ModelcategoriasItemsComponentesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategoriasItemsComponentess(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        idItemPadre
        nombre
        courier
        items {
          nextToken
        }
        estado
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getExtrasItemsV2 = /* GraphQL */ `
  query GetExtrasItemsV2($id: ID!) {
    getExtrasItemsV2(id: $id) {
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
export const listExtrasItemsV2s = /* GraphQL */ `
  query ListExtrasItemsV2s(
    $filter: ModelextrasItemsV2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExtrasItemsV2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getComponentesItemsV2 = /* GraphQL */ `
  query GetComponentesItemsV2($id: ID!) {
    getComponentesItemsV2(id: $id) {
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
export const listComponentesItemsV2s = /* GraphQL */ `
  query ListComponentesItemsV2s(
    $filter: ModelcomponentesItemsV2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComponentesItemsV2s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const getConfiguraciones = /* GraphQL */ `
  query GetConfiguraciones($id: ID!) {
    getConfiguraciones(id: $id) {
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
export const listConfiguracioness = /* GraphQL */ `
  query ListConfiguracioness(
    $filter: ModelconfiguracionesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfiguracioness(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
    $from: Int
  ) {
    searchDespachadoresActivoss(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
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

// /* eslint-disable */
// // this is an auto generated file. This will be overwritten

// export const getDatosUsuario = /* GraphQL */ `
//   query GetDatosUsuario($id: ID!) {
//     getDatosUsuario(id: $id) {
//       id
//       nombre
//       profile
//       correo
//       telefono
//       tiposUsuario
//       datosUsuarioDespachador {
//         id
//         idenditicacion
//         tipoTransporte
//         placa
//         modelo
//         color
//         ano
//         estado
//         createdAt
//         updatedAt
//       }
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listDatosUsuarios = /* GraphQL */ `
//   query ListDatosUsuarios(
//     $filter: ModeldatosUsuarioFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listDatosUsuarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         nombre
//         profile
//         correo
//         telefono
//         tiposUsuario
//         datosUsuarioDespachador {
//           id
//           idenditicacion
//           tipoTransporte
//           placa
//           modelo
//           color
//           ano
//           estado
//           createdAt
//           updatedAt
//         }
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getDatosUsuarioDespachador = /* GraphQL */ `
//   query GetDatosUsuarioDespachador($id: ID!) {
//     getDatosUsuarioDespachador(id: $id) {
//       id
//       idenditicacion
//       tipoTransporte
//       placa
//       modelo
//       color
//       ano
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listDatosUsuarioDespachadors = /* GraphQL */ `
//   query ListDatosUsuarioDespachadors(
//     $filter: ModeldatosUsuarioDespachadorFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listDatosUsuarioDespachadors(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idenditicacion
//         tipoTransporte
//         placa
//         modelo
//         color
//         ano
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getDireccionUsuario = /* GraphQL */ `
//   query GetDireccionUsuario($id: ID!) {
//     getDireccionUsuario(id: $id) {
//       id
//       idUsuario
//       nombre
//       direccion
//       geolocacion {
//         lat
//         lon
//       }
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listDireccionUsuarios = /* GraphQL */ `
//   query ListDireccionUsuarios(
//     $filter: ModeldireccionUsuarioFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listDireccionUsuarios(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idUsuario
//         nombre
//         direccion
//         geolocacion {
//           lat
//           lon
//         }
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getCategorias = /* GraphQL */ `
//   query GetCategorias($id: ID!) {
//     getCategorias(id: $id) {
//       id
//       nombre
//       courier
//       subCategorias {
//         items {
//           id
//           idCategoria
//           Nombre
//           estado
//           createdAt
//           updatedAt
//         }
//         nextToken
//       }
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listCategoriass = /* GraphQL */ `
//   query ListCategoriass(
//     $filter: ModelcategoriasFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listCategoriass(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         nombre
//         courier
//         subCategorias {
//           nextToken
//         }
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getCategoriasItems = /* GraphQL */ `
//   query GetCategoriasItems($id: ID!) {
//     getCategoriasItems(id: $id) {
//       id
//       idNegocio
//       nombre
//       courier
//       items {
//         items {
//           id
//           nombre
//           idNegocio
//           descripcion
//           tipoItem
//           idCategoria
//           precioBase
//           stockDiario
//           estado
//           createdAt
//           updatedAt
//         }
//         nextToken
//       }
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listCategoriasItemss = /* GraphQL */ `
//   query ListCategoriasItemss(
//     $filter: ModelcategoriasItemsFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listCategoriasItemss(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idNegocio
//         nombre
//         courier
//         items {
//           nextToken
//         }
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getSubCategorias = /* GraphQL */ `
//   query GetSubCategorias($id: ID!) {
//     getSubCategorias(id: $id) {
//       id
//       idCategoria
//       Nombre
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listSubCategoriass = /* GraphQL */ `
//   query ListSubCategoriass(
//     $filter: ModelsubCategoriasFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listSubCategoriass(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         idCategoria
//         Nombre
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getDespachadoresActivos = /* GraphQL */ `
//   query GetDespachadoresActivos($id: ID!) {
//     getDespachadoresActivos(id: $id) {
//       id
//       estado
//       location {
//         lat
//         lon
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listDespachadoresActivoss = /* GraphQL */ `
//   query ListDespachadoresActivoss(
//     $filter: ModeldespachadoresActivosFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listDespachadoresActivoss(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         estado
//         location {
//           lat
//           lon
//         }
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getChatUsuarios = /* GraphQL */ `
//   query GetChatUsuarios($id: ID!) {
//     getChatUsuarios(id: $id) {
//       id
//       idUsuario
//       idPedido
//       mensaje
//       fechaHora
//       tipoChat
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listChatUsuarioss = /* GraphQL */ `
//   query ListChatUsuarioss(
//     $filter: ModelchatUsuariosFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listChatUsuarioss(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         idUsuario
//         idPedido
//         mensaje
//         fechaHora
//         tipoChat
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getNegocios = /* GraphQL */ `
//   query GetNegocios($id: ID!) {
//     getNegocios(id: $id) {
//       id
//       idCategoria
//       idSubCategoria
//       nombre
//       descripcion
//       tag
//       categoriasItems {
//         items {
//           id
//           idNegocio
//           nombre
//           courier
//           estado
//           createdAt
//           updatedAt
//         }
//         nextToken
//       }
//       profile
//       horario {
//         lunes {
//           entrada
//           salida
//         }
//         estadoLunes
//         martes {
//           entrada
//           salida
//         }
//         estadoMartes
//         miercoles {
//           entrada
//           salida
//         }
//         estadoMiercoles
//         jueves {
//           entrada
//           salida
//         }
//         estadoJueves
//         viernes {
//           entrada
//           salida
//         }
//         estadoViernes
//         sabado {
//           entrada
//           salida
//         }
//         estadoSabado
//         domingo {
//           entrada
//           salida
//         }
//         estadoDomingo
//       }
//       geolocacion {
//         lat
//         lon
//       }
//       representanteLegal
//       identificacion
//       RUC
//       correo
//       tiempoAproxEntrega
//       telefono
//       direccion
//       provincia
//       ciudad
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listNegocioss = /* GraphQL */ `
//   query ListNegocioss(
//     $filter: ModelnegociosFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listNegocioss(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         RUC
//         ciudad
//         correo
//         createdAt
//         descripcion
//         direccion
//         estado
//         id
//         idCategoria
//         idSubCategoria
//         identificacion
//         nombre
//         profile
//         provincia
//         representanteLegal
//         tag
//         telefono
//         tiempoAproxEntrega
//         updatedAt
//         geolocacion {
//           lat
//           lon
//         }
//         horario {
//           domingo {
//             entrada
//             salida
//           }
//           estadoDomingo
//           estadoJueves
//           estadoLunes
//           estadoMartes
//           estadoMiercoles
//           estadoSabado
//           estadoViernes
//           jueves {
//             entrada
//             salida
//           }
//           lunes {
//             entrada
//             salida
//           }
//           martes {
//             entrada
//             salida
//           }
//           miercoles {
//             entrada
//             salida
//           }
//           sabado {
//             entrada
//             salida
//           }
//           viernes {
//             entrada
//             salida
//           }
//         }
//         categoriasItems {
//           items {
//             courier
//             createdAt
//             estado
//             id
//             idNegocio
//             nombre
//             updatedAt
//             items {
//               items {
//                 createdAt
//                 descripcion
//                 estado
//                 id
//                 idCategoria
//                 idNegocio
//                 nombre
//                 precioBase
//                 stockDiario
//                 tipoItem
//                 updatedAt
//                 listadoComponentes {
//                   items {
//                     courier
//                     createdAt
//                     estado
//                     id
//                     idItemPadre
//                     nombre
//                     updatedAt
//                     items {
//                       items {
//                         createdAt
//                         estado
//                         id
//                         idCategoriaComponente
//                         nombre
//                         precio
//                         tipoRegistro
//                         updatedAt
//                       }
//                     }
//                   }
//                 }
//                 listadoExtras {
//                   items {
//                     courier
//                     createdAt
//                     estado
//                     id
//                     idItemPadre
//                     nombre
//                     updatedAt
//                     items {
//                       items {
//                         createdAt
//                         estado
//                         id
//                         idCategoriaExtra
//                         nombre
//                         precio
//                         tipoRegistro
//                         updatedAt
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       nextToken
//     }
//   }
// `;
// export const getCiudades = /* GraphQL */ `
//   query GetCiudades($id: ID!) {
//     getCiudades(id: $id) {
//       id
//       id_state
//       name
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listCiudadess = /* GraphQL */ `
//   query ListCiudadess(
//     $filter: ModelCiudadesFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listCiudadess(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         id_state
//         name
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getProvincias = /* GraphQL */ `
//   query GetProvincias($id: ID!) {
//     getProvincias(id: $id) {
//       id
//       id_country
//       name
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listProvinciass = /* GraphQL */ `
//   query ListProvinciass(
//     $filter: ModelProvinciasFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listProvinciass(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         id_country
//         name
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getPedidos = /* GraphQL */ `
//   query GetPedidos($id: ID!) {
//     getPedidos(id: $id) {
//       id
//       idNegocio
//       idCliente
//       items
//       total
//       idDespachador
//       idUsuarioNegocio
//       idTipoEnvio
//       idTipoPago
//       codigoPedido
//       fechaHora
//       observacines
//       idChat
//       observacinesChat
//       confirmaNegocio
//       pedidoListo
//       despachadorAsig
//       despachadorEnNegocio
//       despachadorEnCamino
//       despachadorEnSitio
//       pedidoEntregado
//       pedidoCancelado
//       idMotivoCancelado
//       idPago
//       observacinesCancelacion
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listPedidoss = /* GraphQL */ `
//   query ListPedidoss(
//     $filter: ModelpedidosFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listPedidoss(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         idNegocio
//         idCliente
//         items
//         total
//         idDespachador
//         idUsuarioNegocio
//         idTipoEnvio
//         idTipoPago
//         codigoPedido
//         fechaHora
//         observacines
//         idChat
//         observacinesChat
//         confirmaNegocio
//         pedidoListo
//         despachadorAsig
//         despachadorEnNegocio
//         despachadorEnCamino
//         despachadorEnSitio
//         pedidoEntregado
//         pedidoCancelado
//         idMotivoCancelado
//         idPago
//         observacinesCancelacion
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getItemsPedidos = /* GraphQL */ `
//   query GetItemsPedidos($id: ID!) {
//     getItemsPedidos(id: $id) {
//       id
//       idPedido
//       idItems
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listItemsPedidoss = /* GraphQL */ `
//   query ListItemsPedidoss(
//     $filter: ModelitemsPedidosFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listItemsPedidoss(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         idPedido
//         idItems
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getTipoPedido = /* GraphQL */ `
//   query GetTipoPedido($id: ID!) {
//     getTipoPedido(id: $id) {
//       id
//       nombre
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listTipoPedidos = /* GraphQL */ `
//   query ListTipoPedidos(
//     $filter: ModeltipoPedidoFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listTipoPedidos(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         nombre
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getTipoPago = /* GraphQL */ `
//   query GetTipoPago($id: ID!) {
//     getTipoPago(id: $id) {
//       id
//       nombre
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listTipoPagos = /* GraphQL */ `
//   query ListTipoPagos(
//     $filter: ModeltipoPagoFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listTipoPagos(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         nombre
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getMotivoCancelado = /* GraphQL */ `
//   query GetMotivoCancelado($id: ID!) {
//     getMotivoCancelado(id: $id) {
//       id
//       nombre
//       tipoCancelado
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listMotivoCancelados = /* GraphQL */ `
//   query ListMotivoCancelados(
//     $filter: ModelmotivoCanceladoFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listMotivoCancelados(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         nombre
//         tipoCancelado
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getItems = /* GraphQL */ `
//   query GetItems($id: ID!) {
//     getItems(id: $id) {
//       id
//       nombre
//       idNegocio
//       descripcion
//       tipoItem
//       listadoComponentes {
//         items {
//           id
//           idItemPadre
//           nombre
//           courier
//           estado
//           createdAt
//           updatedAt
//         }
//         nextToken
//       }
//       listadoExtras {
//         items {
//           id
//           idItemPadre
//           nombre
//           courier
//           estado
//           createdAt
//           updatedAt
//         }
//         nextToken
//       }
//       idCategoria
//       precioBase
//       stockDiario
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listItemss = /* GraphQL */ `
//   query ListItemss(
//     $filter: ModelitemsFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         nombre
//         idNegocio
//         descripcion
//         tipoItem
//         listadoComponentes {
//           nextToken
//         }
//         listadoExtras {
//           nextToken
//         }
//         idCategoria
//         precioBase
//         stockDiario
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getCategoriasItemsExtras = /* GraphQL */ `
//   query GetCategoriasItemsExtras($id: ID!) {
//     getCategoriasItemsExtras(id: $id) {
//       id
//       idItemPadre
//       nombre
//       courier
//       items {
//         items {
//           id
//           nombre
//           idCategoriaExtra
//           precio
//           tipoRegistro
//           estado
//           createdAt
//           updatedAt
//         }
//         nextToken
//       }
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listCategoriasItemsExtrass = /* GraphQL */ `
//   query ListCategoriasItemsExtrass(
//     $filter: ModelcategoriasItemsExtrasFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listCategoriasItemsExtrass(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idItemPadre
//         nombre
//         courier
//         items {
//           nextToken
//         }
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getCategoriasItemsComponentes = /* GraphQL */ `
//   query GetCategoriasItemsComponentes($id: ID!) {
//     getCategoriasItemsComponentes(id: $id) {
//       id
//       idItemPadre
//       nombre
//       courier
//       items {
//         items {
//           id
//           idCategoriaComponente
//           tipoRegistro
//           nombre
//           precio
//           estado
//           createdAt
//           updatedAt
//         }
//         nextToken
//       }
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listCategoriasItemsComponentess = /* GraphQL */ `
//   query ListCategoriasItemsComponentess(
//     $filter: ModelcategoriasItemsComponentesFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listCategoriasItemsComponentess(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idItemPadre
//         nombre
//         courier
//         items {
//           nextToken
//         }
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getExtrasItemsV2 = /* GraphQL */ `
//   query GetExtrasItemsV2($id: ID!) {
//     getExtrasItemsV2(id: $id) {
//       id
//       nombre
//       idCategoriaExtra
//       precio
//       tipoRegistro
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listExtrasItemsV2s = /* GraphQL */ `
//   query ListExtrasItemsV2s(
//     $filter: ModelextrasItemsV2FilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listExtrasItemsV2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         nombre
//         idCategoriaExtra
//         precio
//         tipoRegistro
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getComponentesItemsV2 = /* GraphQL */ `
//   query GetComponentesItemsV2($id: ID!) {
//     getComponentesItemsV2(id: $id) {
//       id
//       idCategoriaComponente
//       tipoRegistro
//       nombre
//       precio
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listComponentesItemsV2s = /* GraphQL */ `
//   query ListComponentesItemsV2s(
//     $filter: ModelcomponentesItemsV2FilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listComponentesItemsV2s(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idCategoriaComponente
//         tipoRegistro
//         nombre
//         precio
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getRankingNegocios = /* GraphQL */ `
//   query GetRankingNegocios($id: ID!) {
//     getRankingNegocios(id: $id) {
//       id
//       idNegocio
//       idPedido
//       valor
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listRankingNegocioss = /* GraphQL */ `
//   query ListRankingNegocioss(
//     $filter: ModelrankingNegociosFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listRankingNegocioss(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idNegocio
//         idPedido
//         valor
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getRankingDespachador = /* GraphQL */ `
//   query GetRankingDespachador($id: ID!) {
//     getRankingDespachador(id: $id) {
//       id
//       idDespachador
//       idPedido
//       valor
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listRankingDespachadors = /* GraphQL */ `
//   query ListRankingDespachadors(
//     $filter: ModelrankingDespachadorFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listRankingDespachadors(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idDespachador
//         idPedido
//         valor
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getPagos = /* GraphQL */ `
//   query GetPagos($id: ID!) {
//     getPagos(id: $id) {
//       id
//       codigoReferencia
//       tipo
//       monto
//       tipoTarjeta
//       idPedido
//       detalle
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listPagoss = /* GraphQL */ `
//   query ListPagoss(
//     $filter: ModelpagosFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listPagoss(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         codigoReferencia
//         tipo
//         monto
//         tipoTarjeta
//         idPedido
//         detalle
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getTranferenciaNegocio = /* GraphQL */ `
//   query GetTranferenciaNegocio($id: ID!) {
//     getTranferenciaNegocio(id: $id) {
//       id
//       codigo
//       idNegocio
//       fecha
//       descripcion
//       monto
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listTranferenciaNegocios = /* GraphQL */ `
//   query ListTranferenciaNegocios(
//     $filter: ModeltranferenciaNegocioFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listTranferenciaNegocios(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         codigo
//         idNegocio
//         fecha
//         descripcion
//         monto
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getTranferenciaDespachador = /* GraphQL */ `
//   query GetTranferenciaDespachador($id: ID!) {
//     getTranferenciaDespachador(id: $id) {
//       id
//       codigo
//       idDespachador
//       fecha
//       descripcion
//       monto
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listTranferenciaDespachadors = /* GraphQL */ `
//   query ListTranferenciaDespachadors(
//     $filter: ModeltranferenciaDespachadorFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listTranferenciaDespachadors(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         codigo
//         idDespachador
//         fecha
//         descripcion
//         monto
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getDetalleTranferenciaNegocio = /* GraphQL */ `
//   query GetDetalleTranferenciaNegocio($id: ID!) {
//     getDetalleTranferenciaNegocio(id: $id) {
//       id
//       idTransferencia
//       idPedido
//       monto
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listDetalleTranferenciaNegocios = /* GraphQL */ `
//   query ListDetalleTranferenciaNegocios(
//     $filter: ModeldetalleTranferenciaNegocioFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listDetalleTranferenciaNegocios(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idTransferencia
//         idPedido
//         monto
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getDetalleTranferenciaDespachador = /* GraphQL */ `
//   query GetDetalleTranferenciaDespachador($id: ID!) {
//     getDetalleTranferenciaDespachador(id: $id) {
//       id
//       idTransferencia
//       idPedido
//       monto
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listDetalleTranferenciaDespachadors = /* GraphQL */ `
//   query ListDetalleTranferenciaDespachadors(
//     $filter: ModeldetalleTranferenciaDespachadorFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listDetalleTranferenciaDespachadors(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         idTransferencia
//         idPedido
//         monto
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const getConfiguraciones = /* GraphQL */ `
//   query GetConfiguraciones($id: ID!) {
//     getConfiguraciones(id: $id) {
//       id
//       tarifaMensualNegocio
//       tarifaMensualRepartidor
//       comisionPedidos
//       comisionEnvios
//       kmMinimo
//       tarifaEnvioMinima
//       costoKmAdicional
//       estado
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const listConfiguracioness = /* GraphQL */ `
//   query ListConfiguracioness(
//     $filter: ModelconfiguracionesFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listConfiguracioness(
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         tarifaMensualNegocio
//         tarifaMensualRepartidor
//         comisionPedidos
//         comisionEnvios
//         kmMinimo
//         tarifaEnvioMinima
//         costoKmAdicional
//         estado
//         createdAt
//         updatedAt
//       }
//       nextToken
//     }
//   }
// `;
// export const searchDespachadoresActivoss = /* GraphQL */ `
//   query SearchDespachadoresActivoss(
//     $filter: SearchabledespachadoresActivosFilterInput
//     $sort: SearchabledespachadoresActivosSortInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     searchDespachadoresActivoss(
//       filter: $filter
//       sort: $sort
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         estado
//         location {
//           lat
//           lon
//         }
//         createdAt
//         updatedAt
//       }
//       nextToken
//       total
//     }
//   }
// `;
