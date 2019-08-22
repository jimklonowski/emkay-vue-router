// https://github.com/gothinkster/vue-realworld-example-app/blob/a9a102d76a89e298c2471d557f2b4a469dec0b89/src/store/auth.module.js
import ApiService from '../services/api.service'
import JwtService from '../services/jwt.service'

import { LOGIN, LOGOUT, LOGIN_HELP, REGISTER, CHECK_AUTH, UPDATE_USER } from './actions.type'
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type'

/**
 * State
 */
const state = {
  errors: null,
  user: {},
  isAdmin: false,
  isAuthenticated: !!JwtService.getToken()
}

/**
 * Getters
 */
const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  isAdmin(state) {
    return state.isAdmin
  }
}

/**
 * Actions
 */
const actions = {
  async [LOGIN](context, credentials) {
    const response = await ApiService.post('users/login', { user: credentials })
    if (response) {
      context.commit(SET_AUTH, response.data.user)
    } else {
      context.commit(SET_ERROR, response.data.errors)
    }
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  async [LOGIN_HELP](context, credentials) {
    const response = await ApiService.post('users/login-help', { user: credentials })
    if (response) {
      context.commit(SET_AUTH, response.data.user)
    } else {
      context.commit(SET_ERROR, response.data.errors)
    }
  },
  async [REGISTER](context, credentials) {
    const response = await ApiService.post('users/register', { user: credentials })
    if (response) {
      context.commit(SET_AUTH, response.data.user)
    } else {
      context.commit(SET_ERROR, response.data.errors)
    }
  },
  async [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader()
      const response = await ApiService.get('user')
      if (response) {
        context.commit(SET_AUTH, response.data.user)
      } else {
        context.commit(SET_ERROR, response.data.errors)
      }
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  async [UPDATE_USER](context, payload) {
    const { account, username, password, email } = payload
    const user = { account, username, email }
    if (password) {
      user.password = password
    }
    const response = await ApiService.put('user', user)
    if (response) {
      context.commit(SET_AUTH, response.data.user)
      return user
    } else {
      context.commit(SET_ERROR, response.data.errors)
    }
  }
}

/**
 * Mutations
 */
const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true
    state.isAdmin = state.user.isAdmin
    state.user = user
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false
    state.isAdmin = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}

/**
 * Exports
 */
export default {
  state,
  actions,
  mutations,
  getters
}
