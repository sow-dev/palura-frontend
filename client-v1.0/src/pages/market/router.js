import { createWebHistory, createRouter , VueRouter} from "vue-router";
import Market from './market.vue'
import DetailProduct from './detailProduct.vue'


// const Market = () => {
//   return import(/*webpackChunkName: "market1" */ "./market.vue");
// };
// const DetailProduct = () => {
//   return import(/*webpackChunkName: "market1" */ "./detailProduct.vue");
// };

const routes = [
      {
        path: "/market",
        component: Market, 
      },
      {
        path: "/market/detail",
        name: "detailProduct",
        component: DetailProduct, 
      }
  ]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

