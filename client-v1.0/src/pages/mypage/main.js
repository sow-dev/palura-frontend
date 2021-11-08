import { createApp } from "vue";
import Notifications from '@kyvg/vue3-notification';
import mypage from "./mypage.vue";
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";

// Vue.config.productionTip = false;
import '../../app.css'
const app = createApp(mypage)
app.use(Notifications)

// app.use(store)
app.mount('#app')