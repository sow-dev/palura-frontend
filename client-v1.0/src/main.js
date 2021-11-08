import { createApp } from 'vue'
import App from './App.vue'
// import './tailwind'
// import './app.css'

alert('#### 확인 ####')
window.$ = window.jQuery = require('jquery');


Vue.use({
    install: function(Vue, options){
        Vue.prototype.$jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
    }
});

createApp(App).mount('#app')
