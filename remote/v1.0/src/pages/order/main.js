import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router.js";

import VueClipboard from "vue-clipboard2";
import globalComponents from "../../global-components";
import customComponents from "../../custom-components";
import utils from "../../utils";
import "../../libs";
import SplitCarousel from "vue-split-carousel";

import { MediaInfo } from "json-mediainfo";

import "vue3-timepicker/dist/VueTimepicker.css";
// Import the CSS or use your own!

// SASS Theme
import "../../assets/sass/app.scss";
const toastOpt = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

const app = createApp(App)
  
  .use(router)
  .use(MediaInfo)
  
  .use(VueClipboard)
  .use(SplitCarousel, { prefix: "El" });

globalComponents(app);
customComponents(app);
utils(app);

app.mount("#app");
