export default [
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
    path: '/todo',
    name: 'todo',
    component: () => import('@/views/Todo.vue'),
    meta: {
      guest: true
    }
  },
]
