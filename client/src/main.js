import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from "@/axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faEdit,
  faPlus,
  faSave,
  faTimes,
  faSort
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);
library.add(faEdit);
library.add(faPlus);
library.add(faSave);
library.add(faTimes);
library.add(faSort);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  FontAwesomeIcon,
  render: h => h(App)
}).$mount('#app')
