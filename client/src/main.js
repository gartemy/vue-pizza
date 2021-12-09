import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import router from './router'
import {store} from './store'

axios.defaults.baseURL = 'http://localhost:8081/api/'
axios.defaults.withCredentials = true

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
