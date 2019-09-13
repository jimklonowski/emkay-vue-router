export default [
  {
    path: '/reporting',
    name: 'reporting',
    component: () => import('@/views/Reporting.vue'),
    children: [
      {
        path: '/reporting/annual-expense',
        name: 'annual-expense',
        component: () => import('@/views/Reporting/AnnualExpense.vue')
      },
      {
        path: '/reporting/replacement-analysis',
        name: 'replacement-analysis',
        component: () => import('@/views/Reporting/ReplacementAnalysis.vue')
      }
    ]
  }
]
