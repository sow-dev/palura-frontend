// Vuex 때 처럼 create* 함수를 제공한다.
import { createWebHistory, createRouter } from "vue-router";

import SideMenu from "./layouts/side-menu/Main.vue";
import Login from "./midone-views/login/Main.vue";

import ErrorPage from "./midone-views/error-page/Main.vue";
import Register from "./midone-views/register/Main.vue";

const Admin = () => {
  return import(/*webpackChunkName: "admin" */ "./views/Admin.vue");
};
const Artist = () => {
  return import(/*webpackChunkName: "artist" */ "./views/Artist.vue");
};
const ArtistEnroll = () => {
  return import(
    /*webpackChunkName: "artist" */ "./views/artist/ArtistEnroll.vue"
  );
};
const ArtistForm = () => {
  return import(
    /*webpackChunkName: "artist" */ "./custom-components/artist/artistForm.vue"
  );
};
const Collector = () => {
  return import(/*webpackChunkName: "collector" */ "./views/Collector.vue");
};
const CollectorEnroll = () => {
  return import(
    /*webpackChunkName: "collector" */ "./views/collector/CollectorEnroll.vue"
  );
};
const CollectorForm = () => {
  return import(
    /*webpackChunkName: "collector" */ "./custom-components/collector/collectorForm.vue"
  );
};
const Customer = () => {
  return import(/*webpackChunkName: "customer" */ "./views/Customer.vue");
};
const UserDetail = () => {
  return import(
    /*webpackChunkName: "customer" */ "./views/user/userDetail.vue"
  );
};
const Product = () => {
  return import(/*webpackChunkName: "product" */ "./views/Product.vue");
};
const ProductAdd = () => {
  return import(
    /*webpackChunkName: "productAdd" */ "./views/product/ProductAdd.vue"
  );
};
const ProductEdit = () => {
  return import(
    /*webpackChunkName: "productAdd" */ "./views/product/ProductEdit.vue"
  );
};
const ProductDetail = () => {
  return import(
    /*webpackChunkName: "productAdd" */ "./views/product/ProductDetail.vue"
  );
};

const Order = () => {
  return import(/*webpackChunkName: "order" */ "./views/Order.vue");
};
const OrderEnroll = () => {
  return import(
    /*webpackChunkName: "enrollment" */ "./views/order/OrderEnroll.vue"
  );
};

const Bids = () => {
  return import(/*webpackChunkName: "bids" */ "./views/Bids.vue");
};

const CMSSlide = () => {
  return import(/*webpackChunkName: "cms" */ "./views/cms/CMS-Slide.vue");
};

const CMSCarousel = () => {
  return import(/*webpackChunkName: "cms" */ "./views/cms/CMS-Carousel.vue");
};

const CMSTetris = () => {
  return import(/*webpackChunkName: "cms" */ "./views/cms/CMS-Tetris.vue");
};

const Asset = () => {
  return import(/*webpackChunkName: "asset" */ "./views/Asset.vue");
};
const Blockchain = () => {
  return import(/*webpackChunkName: "system" */ "./views/Blockchain.vue");
};

const Contract = () => {
  return import(/*webpackChunkName: "system" */ "./views/Contract.vue");
};

const System = () => {
  return import(/*webpackChunkName: "system" */ "./views/System.vue");
};

const Test = () => {
  return import(/*webpackChunkName: "Test" */ "./views/Test.vue");
};

const routes = [
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "/admin",
        name: "Admin",
        component: Admin, // 동적 import
      },
      {
        path: "/artist",
        name: "Artist",
        component: Artist, // 동적 import
      },
      {
        path: "artist/enroll",
        name: "ArtistEnroll",
        component: ArtistEnroll,
      },
      {
        path: "/artist/edit/:nickname",
        name: "ArtistForm",
        component: ArtistForm, // 동적 import
      },
      {
        path: "/user-detail/:nickname",
        name: "UserDetail",
        component: UserDetail, // 동적 import
      },
      {
        path: "/collector",
        name: "Collector",
        component: Collector, // 동적 import
      },
      {
        path: "collector/enroll",
        name: "CollectorEnroll",
        component: CollectorEnroll,
      },
      {
        path: "/collector/edit/:nickname",
        name: "CollectorForm",
        component: CollectorForm, // 동적 import
      },
      {
        path: "/customer",
        name: "Customer",
        component: Customer,
      },
      //product list
      {
        path: "/product",
        name: "Product",
        component: Product,
      },
      //product add
      {
        path: "product/productadd",
        name: "ProductAdd",
        component: ProductAdd,
      },
      //product detail
      {
        path: "product/productdetail/:id",
        name: "ProductDetail",
        component: ProductDetail,
      },
      //product edit
      {
        path: "product/productedit/:id",
        name: "ProductEidit",
        component: ProductEdit,
      },
      {
        path: "/order",
        name: "Order",
        component: Order,
      },
      {
        path: "order/enroll",
        name: "OrderEnroll",
        component: OrderEnroll,
      },
      // order edit
      {
        path: "order/edit/:id",
        name: "OrderEdit",
        component: OrderEnroll,
      },
      {
        path: "/bids",
        name: "Bids",
        component: Bids,
      },
      {
        path: "/cms-slide ",
        name: "CMSSlide",
        component: CMSSlide,
      },
      {
        path: "/cms-carousel",
        name: "CMSCarousel",
        component: CMSCarousel,
      },
      {
        path: "/cms-tetris",
        name: "CMSTetris",
        component: CMSTetris,
      },
      {
        path: "/asset",
        name: "Asset",
        component: Asset,
      },
      {
        path: "/system",
        name: "System",
        component: System,
      },
      {
        path: "/blockchain",
        name: "Blockchain",
        component: Blockchain,
      },
      {
        path: "/contract",
        name: "Contract",
        component: Contract,
      },
      {
        path: "/test",
        name: "Test",
        component: Test,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
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

// 이렇게 해도 된다.
// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });
// export default router;

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
// export const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return savedPosition || { left: 0, top: 0 }
//   }
// })

// import Vue from "vue"
// import Router from "vue-router"
// import Home from "./views/Home.vue"

// Vue.use(Router)

// const Artist =() => {
//   return import(/*webpackChunkName: "artist" */ "./views/ArtistView.vue")
// }

//  export default new Router ({
//    mode: 'history',
//    base: process.env.BASE_URL,
//    routes: [
//      {
//        path: "/",
//        name: "home",
//        component: Home
//      },
//      {
//        path: '/artist',
//        name: 'artist',
//        component: Artist
//      }
//    ]
//  })
