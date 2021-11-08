import { createApp } from "vue";
// import App from './App.vue'
import market from "./market.vue";
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";
// import { router } from "./router.js";

// Vue.config.productionTip = false;
import '../../app.css'
import dayjs from 'dayjs'


const app = createApp(market)
    // .use(router)
// app.use(store)
app.config.globalProperties.$dayjs = dayjs
app.mount('#app')