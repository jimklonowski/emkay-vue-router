import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

//import { ID_TOKEN_KEY } from './services/jwt.service'
import { LOGOUT } from '@/store/actions.type'

Vue.use(Router)

const router = new Router({
  //mode: 'hash',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      alias: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        requiresAuth: false,
        onlyWhenNotLoggedIn: true
      }
    },
    {
      path: '/login-help',
      name: 'login-help',
      component: () => import('@/views/LoginHelp.vue'),
      meta: {
        requiresAuth: false,
        onlyWhenNotLoggedIn: true
      }
    },
    {
      path: '/fleet-dashboard',
      name: 'fleet-dashboard',
      component: () => import('@/views/FleetDashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/vehicle',
      name: 'vehicle-search',
      component: () => import('@/views/VehicleSearch.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/vehicle/:vehicle',
      name: 'vehicle-dashboard',
      component: () => import('@/views/VehicleDashboard.vue'),
      meta: {
        requiresAuth: true
      },
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
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ordering',
      name: 'ordering',
      component: () => import('@/views/Ordering.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/Account.vue'),
      meta: {
        requiresAuth: true
      },
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Yes this route requires authentication. See if user is authenticated
    if (store.getters.isAuthenticated) {
      // User is authenticated, we allow access
      console.log(`[ROUTER]: User is authenticated`)
      next()
    } else {
      console.log(`[ROUTER]: User is NOT authenticated, but trying to access AUTH route ---> /login`)
      // User is not authenticated and accessing a restricted page.  Redirect to login
      next('/login')
    }
  } else {
    // path requires no user auth
    if (to.matched.some(record => record.meta.onlyWhenNotLoggedIn)) {
      if (store.getters.isAuthenticated) {
        console.log(`[ROUTER]: User is authenticated AND wants to access LOGIN/REGISTER page ---> Logging out then /login`)
        store.dispatch(LOGOUT).then(() => next('/login'))
        //next('/home')
      } else {
        console.log(`[ROUTER]: User is NOT authenticated and wants to access LOGIN/REGISTER page ---> allow it`)
        next()
      }
    }
    console.log(`[ROUTER]: Auth not required, passing along route`)
    next()
  }
})

export default router
