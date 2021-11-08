import { createApp } from "vue";
import khj from "./khj.vue";


// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";
import '../../../app.css'
// Vue.config.productionTip = false;

const app = createApp(khj)
// app.use(store)
app.mount('#app')