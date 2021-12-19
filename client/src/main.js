import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from "@/axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faEdit,
  faPlus,
  faSave
} from "@fortawesome/free-solid-svg-icons";


library.add(faTrashAlt);
library.add(faEdit);
library.add(faPlus);
library.add(faSave);

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
