import { createApp } from "vue";
import kjh from "./kjh.vue";
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";
import '../../../app.css'
// Vue.config.productionTip = false;

const app = createApp(kjh)
// app.use(store)
app.mount('#app')