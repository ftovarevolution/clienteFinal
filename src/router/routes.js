const routes = [
  {
    path: "/",
    component: () => import("layouts/OutLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/login.vue") },
      { path: "/login", component: () => import("pages/login.vue") }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/consultarChofer",
        component: () => import("pages/consultarChofer.vue"),
        meta: {
          requiresAuth: true,
          group: ["USE"]
        }
      },
      {
        path: "/inicio",
        component: () => import("pages/index.vue"),
        meta: {
          requiresAuth: true,
          group: ["SUP"]
        }
      },

      {
        path: "/perfil",
        component: () => import("pages/perfil.vue"),
        meta: {
          requiresAuth: true,
          group: ["SUP"]
        }
      },
      {
        path: "/usuarios",
        component: () => import("pages/usuarios.vue"),
        meta: {
          requiresAuth: true,
          group: ["SUP"]
        }
      },
      {
        path: "/empresas",
        component: () => import("pages/empresas.vue"),
        meta: {
          requiresAuth: true,
          group: ["ADM"]
        }
      },
      {
        path: "/motivos",
        component: () => import("pages/motivos.vue"),
        meta: {
          requiresAuth: true,
          group: ["ADM"]
        }
      },
      {
        path: "/reportarChofer",
        component: () => import("pages/reportarChofer.vue"),
        meta: {
          requiresAuth: true,
          group: ["ADM"]
        }
      },
      {
        path: "/importar",
        component: () => import("pages/importar.vue"),
        meta: {
          requiresAuth: true,
          group: ["SUP"]
        }
      },
      {
        path: "/historialBusqueda",
        component: () => import("pages/historialBusqueda.vue"),
        meta: {
          requiresAuth: true,
          group: ["USE"]
        }
      },
      {
        path: "/historialRegistro",
        component: () => import("pages/historialRegistro.vue"),
        meta: {
          requiresAuth: true,
          group: ["USE"]
        }
      }
    ]
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
