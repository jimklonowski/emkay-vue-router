import JwtService from '@/services/jwt.service'

const initLocale = () => {
  // check localstorage for a saved locale
  let locale = window.localStorage.getItem('locale') || window.navigator.language
  // default to en if none found
  return locale || 'en'
}

const initDark = () => {
  let dark = window.localStorage.getItem('dark')
  return dark || false
}

export default {
  errors: null,
  user: {},
  locale: initLocale,
  isDark: initDark,
  isAdmin: false,
  isAuthenticated: !!JwtService.getAccessToken()
}
