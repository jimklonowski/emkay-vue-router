import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import { LOGOUT } from '@/store/actions.type'

import baseRoutes from '@/modules/base/router'
import accountRoutes from '@/modules/account/router'
import fleetRoutes from '@/modules/fleet/router'
import messagingRoutes from '@/modules/messaging/router'
import orderingRoutes from '@/modules/ordering/router'
import reportingRoutes from '@/modules/reporting/router'
import vehicleRoutes from '@/modules/vehicle/router'

Vue.use(Router)

// Merge all the routes
const routes = baseRoutes.concat(
  accountRoutes,
  fleetRoutes,
  vehicleRoutes,
  messagingRoutes,
  orderingRoutes,
  reportingRoutes
)

/**
 * @type {import('vue-router').RouterOptions}
 * */
const options = {
  base: process.env.BASE_URL,
  mode: 'history',
  routes: routes,
  // Scroll to the top of each view upon routing.
  // setTimeout: Since there's a 300ms page transition on every route in App.vue, scrollTop AFTER this transition occurs (looks better)
  scrollBehavior() {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 300)
    )
  }
}

// Create the Router
const router = new Router(options)

// Global Router Navigation Guard: role-based protection on each route
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (to.matched.some(record => record.meta.onlyWhenLoggedOut)) {
      if (store.getters.isAuthenticated) {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    // this is an authenticated route, check auth status before proceeding
    if (store.getters.isAuthenticated) {
      // user is authenticated, pass route through
      console.log(`IsAuthed -> ${to.path}`)
      console.log(store)
      next()
    } else {
      // user is not authenticated and trying to access auth route -> send to login
      console.log(`Not authed -> ${to.path}`)
      store.dispatch(LOGOUT).then(() => next('/login'))
    }
  }
})

export default router
