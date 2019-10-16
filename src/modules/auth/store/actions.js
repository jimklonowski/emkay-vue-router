import ApiService from '@/services/api.service'
import JwtService from '@/services/jwt.service'
import {
  LOGIN,
  LOGOUT,
  REFRESH_TOKEN,
  CHANGE_THEME,
  CHANGE_LOCALE
} from './actions.type'
import {
  SET_AUTH,
  SET_ERROR,
  PURGE_AUTH,
  SET_DARK,
  SET_LOCALE
} from './mutations.type'

export default {
  // Login action
  async [LOGIN](context, credentials) {
    console.log('auth action')
    let response = await ApiService.post('/auth/login', { user: credentials })
    if (response) {
      //debugger
      context.commit(SET_AUTH, response.data.user)
    } else {
      context.commit(SET_ERROR, response.data.errors)
    }
  },
  // Logout action
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  // Re-auth action
  async [REFRESH_TOKEN](context) {
    let response = await ApiService.post('/auth/token/refresh', {
      token: JwtService.getRefreshToken()
    })
    if (response) {
      context.commit(SET_AUTH, response.data.user)
    } else {
      context.commit(SET_ERROR, response.data.errors)
    }
  },
  [CHANGE_LOCALE](context, locale) {
    context.commit(SET_LOCALE, locale)
  },
  [CHANGE_THEME](context, dark) {
    context.commit(SET_DARK, dark)
  }
}
