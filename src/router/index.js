import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/Home.vue"),
    redirect: "login",
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/components/login/Login.vue"),
      },
      {
        path: "view",
        name: "view",
        component: () => import("@/components/sensor/table/View.vue"),
      },
      {
        path: "graph",
        name: "graph",
        component: () => import("@/components/sensor/graph/Parent.vue"),
        children: [
          {
            path: "1",
            name: "CO2",
            component: () => import("@/components/sensor/graph/View.vue"),
          },
          {
            path: "2",
            name: "Temp",
            component: () => import("@/components/sensor/graph/View.vue"),
          },
          {
            path: "3",
            name: "Humidity",
            component: () => import("@/components/sensor/graph/View.vue"),
          },
          {
            path: "4",
            name: "Light",
            component: () => import("@/components/sensor/graph/View.vue"),
          },
          {
            path: "5",
            name: "Soil Moisture",
            component: () => import("@/components/sensor/graph/View.vue"),
          },
          {
            path: "6",
            name: "Soil NPK",
            component: () => import("@/components/sensor/graph/View.vue"),
          },
          {
            path: "7",
            name: "Soil pH",
            component: () => import("@/components/sensor/graph/View.vue"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
