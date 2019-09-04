import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

//import { ID_TOKEN_KEY } from './services/jwt.service'
import { LOGOUT } from '@/store/actions.type'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/public',
      name: 'public',
      component: () => import('@/views/Public.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/home',
      name: 'home',
      alias: '/',
      component: () => import('@/views/Home.vue'),
      meta: {
        guest: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        guest: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/login-help',
      name: 'login-help',
      component: () => import('@/views/LoginHelp.vue'),
      meta: {
        guest: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/fleet-dashboard',
      name: 'fleet-dashboard',
      component: () => import('@/views/FleetDashboard.vue')
    },
    {
      path: '/vehicle',
      name: 'vehicle-search',
      component: () => import('@/views/VehicleSearch.vue')
    },
    {
      path: '/vehicle/:vehicle',
      name: 'vehicle-dashboard',
      component: () => import('@/views/VehicleDashboard.vue'),
      children: [
        {
          path: '/vehicle/:vehicle/dashboard',
          name: 'dashboard',
          component: () => import('@/views/VehicleDashboard/Dashboard.vue')
        },
        {
          path: '/vehicle/:vehicle/documents',
          name: 'documents',
          component: () => import('@/views/VehicleDashboard/Documents.vue')
        },
        {
          path: '/vehicle/:vehicle/saferoads',
          name: 'saferoads',
          component: () => import('@/views/VehicleDashboard/SafeRoads.vue')
        },
        {
          path: '/vehicle/:vehicle/transport-storage',
          name: 'transport-storage',
          component: () => import('@/views/VehicleDashboard/TransportStorage.vue')
        }
      ]
    },
    {
      path: '/reporting',
      name: 'reporting',
      component: () => import('@/views/Reporting.vue'),
      children: [
        { path: '/reporting/annual-expense', name: 'annual-expense', component: () => import('@/views/Reporting/AnnualExpense.vue') },
        {
          path: '/reporting/replacement-analysis',
          name: 'replacement-analysis',
          component: () => import('@/views/Reporting/ReplacementAnalysis.vue')
        }
      ]
    },
    {
      path: '/ordering',
      name: 'ordering',
      component: () => import('@/views/Ordering.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/Account.vue'),
      children: [
        {
          path: '/account/contact-information',
          name: 'contact-information',
          component: () => import('@/components/Account/Contact.vue')
        },
        {
          path: '/account/change-password',
          name: 'change-password',
          component: () => import('@/components/Account/Password.vue')
        }
      ]
    }
  ]
})

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
      next()
    } else {
      // user is not authenticated and trying to access auth route -> send to login
      store.dispatch(LOGOUT).then(() => next('/login'))
    }
  }
})

export default router
