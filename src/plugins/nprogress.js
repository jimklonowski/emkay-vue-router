import Vue from 'vue'
import NProgress from 'vue-nprogress'

const options = {
  latencyThreshold: 100,
  router: true,
  http: true
}

Vue.use(NProgress, options)

const nprogress = new NProgress()
nprogress.configure({ showSpinner: false })

export default nprogress
