import { createApp } from "vue";
import jos from "./jos.vue";
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";
import '../../../app.css'
// Vue.config.productionTip = false;

const app = createApp(jos)
// app.use(store)
app.mount('#app')