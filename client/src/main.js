import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from "@/axios";

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  FontAwesomeIcon,
  render: h => h(App)
}).$mount('#app')
