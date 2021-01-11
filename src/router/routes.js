/* eslint-disable semi */
/* eslint-disable quotes */
const routes = [
  {
    path: "/",
    component: () => import("layouts/OutLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/inicio.vue") },
      { path: "/registro", component: () => import("pages/registro.vue") },
      {
        path: "/verificacion",
        component: () => import("pages/verificacion.vue")
      },
      { path: "/login", component: () => import("pages/login.vue") },
      {
        path: "/forgotpassword",
        component: () => import("pages/forgotpassword.vue")
      },
      {
        path: "/verificapassword",
        component: () => import("pages/verificapassword.vue")
      },
      {
        path: "/page1",
        component: () => import("pages/page1.vue")
      }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/home.vue") },
      {
        path: "/valorizacion",
        component: () => import("pages/valorizacion.vue")
      },
      { path: "/services", component: () => import("pages/servicios.vue") },
      { path: "/restaurant", component: () => import("pages/restaurant.vue") },
      { path: "/item", component: () => import("pages/Menu.vue") },
      { path: "/cart", component: () => import("pages/Cart.vue") },
      { path: "/myAcount", component: () => import("pages/myAcount.vue") },
      {
        path: "/historialPedidos",
        component: () => import("pages/historialPedidos.vue")
      },

      {
        path: "/seguimientoPedido",
        component: () => import("pages/seguimientoPedido.vue")
      }
    ]
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
