import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router.js'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import '@babel/polyfill'

//import { CHECK_AUTH } from './store/actions.type'
import ApiService from './services/api.service'

Vue.config.productionTip = false

ApiService.init()

// Ensure we checked auth before each page load
//router.beforeEach((to, from, next) => Promise.all([store.dispatch(CHECK_AUTH)]).then(next))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
