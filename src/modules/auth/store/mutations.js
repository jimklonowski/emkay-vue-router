import ApiService from '@/services/api.service'
import JwtService from '@/services/jwt.service'
import { SET_ERROR, SET_AUTH, PURGE_AUTH } from './mutations.type'

export default {
  // Mutate error state
  [SET_ERROR](state, error) {
    state.errors = error
  },
  // Mutate authentication state
  [SET_AUTH](state, user) {
    state.isAuthenticated = true
    state.isAdmin = state.user.isAdmin
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
    state.user = {}
    state.errors = {}
    JwtService.destroyAccessToken()
  }
}
