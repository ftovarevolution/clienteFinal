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
      { path: "/page2", component: () => import("pages/page2.vue") }
    ]
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
