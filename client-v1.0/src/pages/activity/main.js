import { createApp } from "vue";
import activity from "./activity.vue";
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";

// Vue.config.productionTip = false;
import '../../app.css'

const app = createApp(activity)
// app.use(store)
app.mount('#app')