// Vuex 때 처럼 create* 함수를 제공한다.
import { createWebHistory, createRouter } from "vue-router";

import ErrorPage from "../../midone-views/error-page/Main.vue";

import Order from "../../views/order/OrderEnroll.vue";


const routes = [
  {
    path: "/order",
    component: Order,
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});