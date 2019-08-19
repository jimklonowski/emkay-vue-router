import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import { ID_TOKEN_KEY } from './services/jwt.service'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
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
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        requiresAuth: false,
        onlyWhenNotLoggedIn: true
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Welcome.vue'),
      meta: {
        requiresAuth: true
      }
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
        console.log(`[ROUTER]: User is authenticated AND wants to access LOGIN/REGISTER page ---> /welcome`)
        next('/welcome')
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
