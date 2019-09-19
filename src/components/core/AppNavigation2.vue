<template>
  <nav>
    <system-bar v-if="authed" />
    <main-navbar v-if="authed" :items="items" />
  </nav>
</template>

<script>
import SystemBar from '@/components/core/navigation/SystemBar'

import MainNavbar from '@/components/core/navigation/MainNavbar'
import { LOGOUT } from '@/store/actions.type'

export default {
  name: 'AppNavigation2',
  components: {
    SystemBar,
    MainNavbar
  },
  data: () => ({
    title: 'EMKAY',
    drawer: false,
    messageCount: 10,
    items: [
      {
        text: 'Home',
        key: 'navigation.home',
        icon: 'home',
        to: '/'
      },
      {
        text: 'Fleet Dashboard',
        key: 'navigation.fleet_dashboard',
        icon: 'dashboard',
        to: '/fleet-dashboard'
      },
      {
        text: 'Vehicle Dashboard',
        key: 'navigation.vehicle_dashboard',
        icon: 'table_chart',
        to: '/vehicle'
      },
      {
        text: 'Ordering',
        key: 'navigation.ordering',
        icon: 'pages',
        to: '/ordering',
        hasMegaMenu: true,
        ref: 'ordering',
        visible: false,
        categories: [
          {
            text: 'Orders',
            items: [
              {
                text: 'Place Factory Orders',
                to: '/todo'
              },
              {
                text: 'Place Stock Orders',
                to: '/todo'
              },
              {
                text: 'View Order Requests',
                to: '/todo'
              }
            ]
          },
          {
            text: 'Driver Orders',
            items: [
              {
                text: 'Manage Driver Order Settings',
                to: '/todo'
              },
              {
                text: 'Allow Drivers To Order',
                to: '/todo'
              },
              {
                text: 'Approve Driver Orders',
                to: '/todo'
              }
            ]
          },
          {
            text: 'Selectors',
            items: [
              {
                text: 'Manage Your Selectors',
                to: '/todo'
              },
              {
                text: 'Manage Your Selector Groups',
                to: '/todo'
              }
            ]
          }
        ]
      },
      {
        text: 'Reporting',
        key: 'navigation.reporting',
        icon: 'show_chart',
        to: '/reporting',
        hasMegaMenu: true,
        ref: 'reporting',
        visible: false,
        categories: [
          {
            text: 'Fleet',
            items: [
              {
                text: 'Inventory',
                to: '/todo'
              },
              {
                text: 'Order Status',
                to: '/todo'
              },
              {
                text: 'Replacement Analysis',
                to: '/todo'
              },
              {
                text: 'Sold Vehicle Analysis',
                to: '/todo'
              },
              {
                text: 'Driver Performance',
                to: '/todo'
              },
              {
                text: 'Vehicle Inspection',
                to: '/todo'
              },
              {
                text: 'MPG / KPL Analysis',
                to: '/todo'
              },
            ]
          },
          {
            text: 'Expense',
            items: [
              {
                text: 'Maintenance Detail',
                to: '/todo'
              },
              {
                text: 'Fuel Detail',
                to: '/todo'
              },
              {
                text: 'Expense Summary',
                to: '/todo'
              },
              {
                text: 'Short Term Rental Detail',
                to: '/todo'
              },
              {
                text: 'Toll Detail',
                to: '/todo'
              },
            ]
          },
          {
            text: 'Custom',
            items: [
              {
                text: 'Vehicle and Driver',
                to: '/todo'
              },
              {
                text: 'Maintenance',
                to: '/todo'
              },
              {
                text: 'Fuel',
                to: '/todo'
              },
              {
                text: 'Invoice',
                to: '/todo'
              },
              {
                text: 'Expense Summary',
                to: '/todo'
              },
              {
                text: 'Insurance Claim',
                to: '/todo'
              },
              {
                text: 'Violation',
                to: '/todo'
              },
            ]
          },
          {
            text: 'Invoicing',
            items: [
              {
                text: 'Invoice History',
                to: '/todo'
              },
              {
                text: 'Custom Invoicing',
                to: '/todo'
              },
            ]
          },
          {
            text: 'Services',
            items: [
              {
                text: 'eVoucher',
                to: '/todo'
              },
              {
                text: 'License Renewal',
                to: '/todo'
              },
              {
                text: 'Driver 360 Mileage',
                to: '/todo'
              },
              {
                text: 'Accident Claim',
                to: '/todo'
              },
            ]
          },
          {
            text: 'Safety and Telematics',
            items: [
              {
                text: 'SafeRoads Fleet Summary',
                to: '/todo'
              },
              {
                text: 'SafeRoads Trip Detail',
                to: '/todo'
              },
              {
                text: 'Engine Faults',
                to: '/todo'
              },
              {
                text: 'Driver Safety',
                to: '/todo'
              },
              {
                text: 'Driver Record',
                to: '/todo'
              },
            ]
          }
        ]
      },
      {
        text: 'Fleet Management',
        key: 'navigation.fleet_management',
        icon: 'build',
        to: '/fleet-management',
        hasMegaMenu: true,
        ref: 'fleetmanagement',
        visible: false,
        categories: [
          {
            text: 'Category X',
            items: [
              {
                text: 'Manage Your Online Users',
                to: '/todo'
              },
              {
                text: 'Manage Your Fleet Policies',
                to: '/todo'
              },
              {
                text: 'Customize Your Fleet Labels',
                to: '/todo'
              },
              {
                text: 'Manage Your Drivers',
                to: '/todo'
              },
              {
                text: 'Manage Your Driver Fuel PINs',
                to: '/todo'
              },
              {
                text: 'Manage Your eNotifications',
                to: '/todo'
              },
              {
                text: 'Manage Your Cases',
                to: '/todo'
              },
              {
                text: 'View Your Fuel Auth Profiles',
                to: '/todo'
              }
            ]
          },
          {
            text: 'Category Y',
            items: [
              {
                text: 'Approve Your Maintenance Repairs',
                to: '/todo'
              },
              {
                text: 'Approve Your Driver Prders',
                to: '/todo'
              },
              {
                text: 'Request an MVR',
                to: '/todo'
              },
              {
                text: 'Upload Your Odometers',
                to: '/todo'
              }
            ]
          },
          {
            text: 'Tools',
            items: [
              {
                text: 'Locate Preferred Shops',
                to: '/todo'
              },
              {
                text: 'Quote a Transport',
                to: '/todo'
              },
              {
                text: 'LCCA',
                to: '/todo'
              }
            ]
          }
        ]
      }
    ]
  }),
  computed: {
    authed() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style></style>
