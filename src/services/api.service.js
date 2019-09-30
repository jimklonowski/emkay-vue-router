import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import VueAxios from 'vue-axios'
import JwtService from './jwt.service'
import { REFRESH_TOKEN } from '@/modules/auth/store/actions.type'

const API_URL = process.env.VUE_APP_ROOT_API
//const API_URL = '//dev2.emkay.com/dev2/'

import createAuthRefreshInterceptor from './helpers/401interceptor'

const refreshAuthToken = () =>
  store
    .dispatch(REFRESH_TOKEN, JwtService.getRefreshToken())
    .then(() => Promise.resolve())

// Mock API calls
import MockService from './mock.service'
MockService.init()

const ApiService = {
  init() {
    // catch any 401s and try refresh
    createAuthRefreshInterceptor(axios, refreshAuthToken)
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${JwtService.getAccessToken()}`
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[EMKAY] ApiService GET ${error}`)
    })
  },

  get(resource, slug = '') {
    // return Axios.get(`${resource}/${slug}`)
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[EMKAY] ApiService GET ${error}`)
    })
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params)
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[EMKAY] ApiService ${error}`)
    })
  }
}

export default ApiService
