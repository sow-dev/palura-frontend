import { createApp } from "vue";
import index from "./index.vue";

import SplitCarousel from 'vue-split-carousel'
import '../../app.css'

// import "../../registerServiceWorker";
// import {store} from "../../store/index.js";
// import $ from "jquery";
// import {store} from "../../store/index.js";
// window.$ = $;

// Vue.config.productionTip = false;

const app = createApp(index)
// app.use(store)

app.use(SplitCarousel);
app.mount('#app')

// store, foo를 글로벌 변수로 삽입
// app.config.globalProperties.$store = store;
// app.config.globalProperties.foo = "bar";