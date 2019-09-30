export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/auth/views/Login.vue'),
    meta: {
      guest: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/login-help',
    name: 'login-help',
    component: () => import('@/modules/auth/views/LoginHelp.vue'),
    meta: {
      guest: true,
      onlyWhenLoggedOut: true
    }
  }
]
