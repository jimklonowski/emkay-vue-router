import ApiService from '@/services/api.service'
import JwtService from '@/services/jwt.service'
import {
  SET_ERROR,
  SET_AUTH,
  PURGE_AUTH,
  SET_LOCALE,
  SET_DARK
} from './mutations.type'

export default {
  // Mutate error state
  [SET_ERROR](state, error) {
    state.errors = error
  },
  // Mutate authentication state
  [SET_AUTH](state, user) {
    state.isAuthenticated = true
    state.isAdmin = user.isAdmin
    state.isDark = user.isDark
    state.locale = user.locale
    state.user = user
    state.errors = {}
    JwtService.saveAccessToken(state.user.access_token)
    JwtService.saveRefreshToken(state.user.refresh_token)
    ApiService.setHeader()
  },
  // Purge authentication state
  [PURGE_AUTH](state) {
    state.isAdmin = false
    state.isAuthenticated = false
    state.isDark = false
    state.locale = 'en'
    state.user = {}
    state.errors = {}
    JwtService.destroyAccessToken()
  },
  [SET_DARK](state, dark) {
    window.localStorage.setItem('dark', dark)
    state.isDark = dark
  },
  [SET_LOCALE](state, locale) {
    window.localStorage.setItem('locale', locale)
    state.locale = locale
  }
}
