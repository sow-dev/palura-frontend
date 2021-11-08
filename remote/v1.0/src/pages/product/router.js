// Vuex 때 처럼 create* 함수를 제공한다.
import { createWebHistory, createRouter } from "vue-router";

import ErrorPage from "../../midone-views/error-page/Main.vue";

import Product from "../../views/Product.vue";
import ProductAdd from "../../views/product/ProductAdd.vue";
import ProductEdit from "../../views/product/ProductEdit.vue";
import ProductDetail from "../../views/product/ProductDetail.vue";


const routes = [
  {
    path: "/product",
    component: Product,
  },
  {
    path: "/product/add",
    name: "add",
    component: ProductAdd,
  },
  {
    path: "/product/edit",
    name: "edit",
    component: ProductEdit,
  },
  {
    path: "/product/detail",
    name: "detail",
    component: ProductDetail,
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