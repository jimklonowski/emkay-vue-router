<template>
  <nav>
    <system-bar v-if="authed" />
    <main-navbar v-if="authed" :items="items" />
  </nav>
</template>

<script>
import VBtn from 'vuetify/lib/components/VBtn'

import SystemBar from '@/components/core/navigation/SystemBar'

import FleetManagementMegaMenu from '@/components/core/navigation/FleetManagementMegaMenu'
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
        icon: 'home',
        to: '/',
        component: VBtn
      },
      {
        text: 'Fleet Dashboard',
        icon: 'dashboard',
        to: '/fleet-dashboard',
        component: VBtn
      },
      {
        text: 'Vehicle Dashboard',
        icon: 'table_chart',
        to: '/vehicle',
        component: VBtn
      },
      {
        text: 'Ordering',
        icon: 'pages',
        to: '/ordering',
        component: VBtn
      },
      {
        text: 'Reporting',
        icon: 'show_chart',
        to: '/reporting',
        component: VBtn
      },
      {
        text: 'Fleet Management',
        icon: 'build',
        to: '/fleet-management',
        ripple: false,
        component: FleetManagementMegaMenu,
        hasMegaMenu: true
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
