import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router.js";
import { store } from "../src/store/index.js";

// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css"
// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css";
import VueClipboard from "vue-clipboard2";
import globalComponents from "./global-components";
import customComponents from "./custom-components";
import utils from "./utils";
import "./libs";
import SplitCarousel from "vue-split-carousel";

import { MediaInfo } from "json-mediainfo";
// import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import "vue3-timepicker/dist/VueTimepicker.css";
// Import the CSS or use your own!

// SASS Theme
import "./assets/sass/app.scss";
const toastOpt = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

const app = createApp(App)
  // .use(store)
  .use(router)
  .use(MediaInfo)
  // .use(Toast, toastOpt)
  .use(VueClipboard)
  .use(SplitCarousel, { prefix: "El" });

// .use(SetupCalendar, {})
// Use the components
// .component('Calendar', Calendar)
// .component('DatePicker', DatePicker)
globalComponents(app);
customComponents(app);
utils(app);

app.mount("#app");

// app.config.globalProperties.$store = store;
// app.config.globalProperties.foo = "bar";
