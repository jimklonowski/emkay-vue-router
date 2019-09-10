import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router.js'
import store from '@/store'
import axios from 'axios'
import vuetify from '@/plugins/vuetify'
import '@babel/polyfill'

Vue.prototype.$http = axios
Vue.config.productionTip = false

import vueConfig from 'vue-config'
import config from './settings/config'
Vue.use(vueConfig, config)

//import { CHECK_AUTH } from './store/actions.type'
import ApiService from './services/api.service'
ApiService.init()

// Ensure we checked auth before each page load
//router.beforeEach((to, from, next) => Promise.all([store.dispatch(CHECK_AUTH)]).then(next))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
