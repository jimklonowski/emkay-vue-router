<template>
  <nav>
    <system-bar :authed="authed" />
    <main-navbar v-if="authed" :items="items" />
    <drawer v-if="authed" :items="items" />
  </nav>
</template>

<script>
import SystemBar from '@/modules/core/components/navigation/SystemBar'
import Drawer from '@/modules/core/components/navigation/Drawer'
import MainNavbar from '@/modules/core/components/navigation/MainNavbar'

import { LOGOUT } from '@/modules/auth/store/actions.type'

export default {
  name: 'AppNavigation',
  components: {
    SystemBar,
    Drawer,
    MainNavbar
  },
  data: () => ({
    title: 'EMKAY',
    // array of menu items. this is passed to the main bar AND the mobile bottom drawer
    items: [
      { key: 'navigation.home', icon: 'home', to: '/' },
      { key: 'navigation.fleet_dashboard', icon: 'dashboard', to: '/fleet' },
      {
        key: 'navigation.vehicle_dashboard',
        icon: 'table_chart',
        to: '/vehicle'
      },
      {
        key: 'navigation.ordering',
        icon: 'pages',
        to: '/ordering',
        hasMegaMenu: true,
        ref: 'ordering',
        visible: false,
        categories: [
          {
            key: 'navigation.orders',
            items: [
              { key: 'navigation.place_factory_orders', to: '/todo' },
              { key: 'navigation.place_stock_orders', to: '/todo' },
              { key: 'navigation.view_order_requests', to: '/todo' }
            ]
          },
          {
            key: 'navigation.driver_orders',
            items: [
              { key: 'navigation.manage_driver_order_settings', to: '/todo' },
              { key: 'navigation.allow_drivers_to_order', to: '/todo' },
              { key: 'navigation.approve_driver_orders', to: '/todo' }
            ]
          },
          {
            key: 'navigation.selectors',
            items: [
              { key: 'navigation.manage_your_selectors', to: '/todo' },
              { key: 'navigation.manage_your_selector_groups', to: '/todo' }
            ]
          }
        ]
      },
      {
        key: 'navigation.reporting',
        icon: 'show_chart',
        to: '/reporting',
        hasMegaMenu: true,
        ref: 'reporting',
        visible: false,
        categories: [
          {
            key: 'navigation.fleet',
            items: [
              { key: 'navigation.inventory', to: '/todo' },
              { key: 'vehicle_dashboard.order_status', to: '/todo' },
              { key: 'navigation.replacement_analysis', to: '/todo' },
              { key: 'navigation.sold_vehicle_analysis', to: '/todo' },
              { key: 'navigation.driver_performance', to: '/todo' },
              { key: 'navigation.vehicle_inspection', to: '/todo' },
              { key: 'navigation.fuel_efficiency', to: '/todo' }
            ]
          },
          {
            key: 'navigation.expenses',
            items: [
              { key: 'navigation.maintenance_detail', to: '/todo' },
              { key: 'navigation.fuel_detail', to: '/todo' },
              { key: 'navigation.expense_summary', to: '/todo' },
              { key: 'navigation.short_term_rental_detail', to: '/todo' },
              { key: 'navigation.toll_detail', to: '/todo' }
            ]
          },
          {
            key: 'navigation.custom',
            items: [
              { key: 'navigation.vehicle_and_driver', to: '/todo' },
              { key: 'navigation.maintenance', to: '/todo' },
              { key: 'navigation.fuel', to: '/todo' },
              { key: 'navigation.invoice', to: '/todo' },
              { key: 'navigation.expense_summary', to: '/todo' },
              { key: 'navigation.insurance_claim', to: '/todo' },
              { key: 'navigation.violation', to: '/todo' }
            ]
          },
          {
            key: 'navigation.invoicing',
            items: [
              { key: 'vehicle_dashboard.invoice_history', to: '/todo' },
              { key: 'navigation.custom_invoicing', to: '/todo' }
            ]
          },
          {
            key: 'navigation.services',
            items: [
              { key: 'navigation.evoucher', to: '/todo' },
              { key: 'navigation.license_renewal', to: '/todo' },
              { key: 'navigation.driver_360_mileage', to: '/todo' },
              { key: 'navigation.accident_claim', to: '/todo' }
            ]
          },
          {
            key: 'navigation.safety_and_telematics',
            items: [
              { key: 'navigation.saferoads_fleet_summary', to: '/todo' },
              { key: 'navigation.saferoads_trip_detail', to: '/todo' },
              { key: 'navigation.engine_faults', to: '/todo' },
              { key: 'navigation.driver_safety', to: '/todo' },
              { key: 'navigation.driver_record', to: '/todo' }
            ]
          }
        ]
      },
      {
        key: 'navigation.fleet_management',
        icon: 'build',
        to: '/fleet-management',
        hasMegaMenu: true,
        ref: 'fleetmanagement',
        visible: false,
        categories: [
          {
            key: 'navigation.category',
            items: [
              { key: 'navigation.manage_your_online_users', to: '/todo' },
              { key: 'navigation.manage_your_fleet_policies', to: '/todo' },
              { key: 'navigation.customize_your_fleet_labels', to: '/todo' },
              { key: 'navigation.manage_your_drivers', to: '/todo' },
              { key: 'navigation.manage_your_driver_fuel_pins', to: '/todo' },
              { key: 'navigation.manage_your_enotifications', to: '/todo' },
              { key: 'navigation.manage_your_cases', to: '/todo' },
              { key: 'navigation.view_your_fuel_auth_profiles', to: '/todo' }
            ]
          },
          {
            key: 'navigation.category',
            items: [
              { 
                key: 'navigation.approve_your_maintenance_repairs',
                to: '/todo'
              },
              { key: 'navigation.approve_your_driver_orders', to: '/todo' },
              { key: 'navigation.request_an_mvr', to: '/todo' },
              { key: 'navigation.upload_your_odometers', to: '/todo' }
            ]
          },
          {
            key: 'navigation.tools',
            items: [
              { key: 'navigation.locate_preferred_shops', to: '/todo' },
              { key: 'navigation.quote_a_transport', to: '/todo' },
              { key: 'navigation.lcca', to: '/todo' }
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
      console.log('logout!')
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: 'login' })
      })
      // this.$store.dispatch(LOGOUT).then(() => {
      //   this.$router.push({ name: 'login' })
      // })
    }
  }
}
</script>

<style></style>
