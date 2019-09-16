// Vehicle Dashboard Routes

export default [
  // // vehicle dashboard search
  // {
  //   path: '/vehicle',
  //   name: 'vehicle-search',
  //   component: () => import('@/views/VehicleSearch.vue')
  // },

  // https://github.com/vuejs/vue-router/issues/235#issuecomment-245447122
  // vehicle dashboard (the '?' makes the vehicle parameter optional)
  {
    path: '/vehicle/:vehicle?',
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
        path: '/vehicle/:vehicle/inspections',
        name: 'inspections',
        component: () => import('@/views/VehicleDashboard/Inspections.vue')
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
  }
]
