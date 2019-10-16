export default {
  currentUser: state => state.user,
  currentLocale: state => state.locale,
  isAdmin: state => state.isAdmin,
  isAuthenticated: state => state.isAuthenticated,
  isDark: state => state.isDark
}
