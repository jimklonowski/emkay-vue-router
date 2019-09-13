export default [
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
