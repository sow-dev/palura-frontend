import { createApp } from "vue";
import signup from "./signup.vue";
import Notifications from '@kyvg/vue3-notification'
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";

// Vue.config.productionTip = false;
import '../../app.css'
const app = createApp(signup)
// app.use(store)
app.use(Notifications)
app.mount('#app')