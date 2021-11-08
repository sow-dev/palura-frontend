import { createApp } from "vue";
import otherpage from "./otherpage.vue";
// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";

// Vue.config.productionTip = false;
import '../../app.css'
const app = createApp(otherpage)
// app.use(store)
app.mount('#app')