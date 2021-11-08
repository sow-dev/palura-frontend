import { createApp } from "vue";
import detailProduct from "./detailProduct.vue";
import Notifications from '@kyvg/vue3-notification'

// import '../../assets/@left4code/tw-starter/dist/scss/breakpoint';
// import '../../assets/@left4code/tw-starter/dist/scss/mixins/media';
// import "../../assets/@left4code/tw-starter/dist/scss/_intro.scss";

// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";
import '../../app.css'
// Vue.config.productionTip = false;

const app = createApp(detailProduct)
// app.use(store)
app.use(Notifications)
app.mount('#app')