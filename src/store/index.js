import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.module'

// save vuex state between browser refreshes
import createPersistedState from 'vuex-persistedstate'
// store the state in a cookie, more secure than leaving it in localStorage
import * as Cookies from 'js-cookie'

// cookie duration: 30 min = 1/48, 1 hour = 1/24, 1 day = 1
const COOKIE_TIME = 1 / 24

// when debugging, allows us to view cookie when only using http localhost
const SECURE_COOKIE = process.env.NODE_ENV === 'production' ? true : false

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: COOKIE_TIME, secure: SECURE_COOKIE }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})

export default store
