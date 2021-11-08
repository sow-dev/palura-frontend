import { createApp } from "vue";
import buycomplete from "./buycomplete.vue";
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";
import '../../app.css'
// Vue.config.productionTip = false;

const app = createApp(buycomplete)
// app.use(store)
app.mount('#app')