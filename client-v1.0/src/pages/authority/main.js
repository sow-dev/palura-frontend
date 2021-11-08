import { createApp } from "vue";
import authority from "./authority.vue";
import Notifications from '@kyvg/vue3-notification'
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";

// Vue.config.productionTip = false;
import '../../app.css'
const app = createApp(authority)
// app.use(store)
app.use(Notifications)
app.mount('#app')