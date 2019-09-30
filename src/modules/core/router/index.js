export default [
  {
    path: '/public',
    name: 'public',
    component: () => import('@/modules/core/views/Public.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/home',
    name: 'home',
    alias: '/',
    component: () => import('@/modules/core/views/Home.vue'),
    meta: {
      guest: false
    }
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@/modules/core/views/Todo.vue'),
    meta: {
      guest: true
    }
  }
]
