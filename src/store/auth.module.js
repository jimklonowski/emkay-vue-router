// https://github.com/gothinkster/vue-realworld-example-app/blob/master/src/store/auth.module.js
import ApiService from '../services/api.service'
import JwtService from '../services/jwt.service'
import { LOGIN, LOGOUT, REFRESH_TOKEN } from './actions.type'
import { SET_AUTH, SET_ERROR, PURGE_AUTH } from './mutations.type'

const state = {
  errors: null,
  user: {},
  isAdmin: false,
  isAuthenticated: !!JwtService.getAccessToken()
}

const getters = {
  currentUser(state) {
    return state.user
  },
  isAdmin(state) {
    return state.isAdmin
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  }
}

const actions = {
  async [LOGIN](context, credentials) {
    let response = await ApiService.post('/auth/login', { user: credentials })
    if (response) {
      context.commit(SET_AUTH, response.data.user)
    } else {
      context.commit(SET_ERROR, response.data.errors)
    }
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  async [REFRESH_TOKEN](context) {
    let response = await ApiService.post('/auth/token/refresh', { token: JwtService.getRefreshToken() })
    if (response) {
      context.commit(SET_AUTH, response.data.user)
    } else {
      context.commit(SET_ERROR, response.data.errors)
    }
  }
}

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true
    state.isAdmin = state.user.isAdmin
    state.user = user
    state.errors = {}
    JwtService.saveAccessToken(state.user.access_token)
    JwtService.saveRefreshToken(state.user.refresh_token)
    ApiService.setHeader()
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false
    state.isAdmin = false
    state.user = {}
    state.errors = {}
    JwtService.destroyAccessToken()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
