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
    let response = await ApiService.post('users/login', { user: credentials })
    if (response) {
      context.commit(SET_AUTH, response.data.user)
    } else context.commit(SET_ERROR, response.data.errors)
  },
  // [LOGIN](context, credentials) {
  //   return new Promise(resolve => {
  //     ApiService.post('users/login', { user: credentials })
  //       .then(({ data }) => {
  //         context.commit(SET_AUTH, data.user)
  //         resolve(data)
  //       })
  //       .catch(({ response }) => {
  //         context.commit(SET_ERROR, response.data.errors)
  //       })
  //   })
  // },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  [LOGIN_HELP](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('users/login-help', { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('users', { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader()
      ApiService.get('user')
        .then(({ data }) => {
          console.log(`[EMKAY] AuthModule: Check User ${data.user.account}, ${data.user.username}, ${data.user.token}`)
          context.commit(SET_AUTH, data.user)
        })
        .catch(({ response }) => {
          console.log(`[EMKAY] AuthModule: Error User ${response}`)
          context.commit(SET_ERROR, response.data.errors)
        })
    } else {
      console.log(`[EMKAY] AuthModule: No auth token found`)
      context.commit(PURGE_AUTH)
    }
  },
  [UPDATE_USER](context, payload) {
    const { account, username, password, email } = payload
    const user = { account, username, email }
    if (password) {
      user.password = password
    }
    return ApiService.put('user', user).then(({ data }) => {
      context.commit(SET_AUTH, data.user)
      return data
    })
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
    state.errors = null
    JwtService.saveToken(state.user.token)
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false
    state.isAdmin = false
    state.user = {}
    state.errors = null
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
