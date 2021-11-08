// Vuex 때 처럼 create* 함수를 제공한다.
import { createWebHistory, createRouter } from "vue-router";

import ErrorPage from "../../midone-views/error-page/Main.vue";

import userDetail from "../../views/user/userDetail.vue";
import Artist from "../../views/artist/ArtistEnroll.vue";
import Collector from "../../views/collector/CollectorEnroll.vue";


const routes = [
  {
    path: "/wallet",
    component: userDetail,
  },
  {
    path: "/wallet/artist",
    name: "artist",
    component: Artist,
  },
  {
    path: "/wallet/collector",
    name: "collector",
    component: Collector,
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