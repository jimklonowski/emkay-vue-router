<template>
  <nav>
    <v-navigation-drawer v-if="authed" v-model="drawer" app clipped light>
      <v-list dense>
        <v-subheader>NAVIGATION</v-subheader>
        <v-list-item v-for="item in items" :key="item.text" :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn tile block elevation="0" color="primary darken-1 white--text" @click="logout">
            Log Off
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app dark clipped-left color="blue-grey darken-3 white--text">
      <v-app-bar-nav-icon v-if="authed" @click.stop="drawer = !drawer" />
      <v-spacer class="hidden-md-and-up" />
      <v-toolbar-title class="hidden-sm-and-down">
        {{ title }}
      </v-toolbar-title>
      <v-spacer class="hidden-sm-and-down" />
      <v-layout v-if="authed" align-center style="max-width:650px;">
        <v-text-field :append-icon-cb="() => {}" append-icon="search" placeholder="Search..." single-line hide-details color="white" />
      </v-layout>
      <!-- <v-btn v-if="!authed" text outlined class="hidden-sm-and-down mr-2" to="/register">REGISTER</v-btn> -->
      <!-- <v-btn v-if="authed" text class="hidden-sm-and-down mr-2" to="/">PROTECTED</v-btn> -->
      <v-btn v-if="!authed" text class="hidden-sm-and-down" to="/login">
        SIGN IN
      </v-btn>
      <!-- <v-btn v-else text class="hidden-sm-and-down" @click="logout" color="danger">LOG OUT</v-btn> -->
    </v-app-bar>
  </nav>
</template>

<script>
import { LOGOUT } from '@/store/actions.type'

export default {
  name: 'AppNavigation',
  data() {
    return {
      title: 'EMKAY',
      drawer: true,
      items: [
        {
          text: 'Home',
          icon: 'home',
          to: '/'
        },
        {
          text: 'Fleet Dashboard',
          icon: 'dashboard',
          to: '/fleet-dashboard'
        },
        {
          text: 'Vehicle Dashboard',
          icon: 'table_chart',
          to: '/vehicle'
        },
        {
          text: 'Reporting',
          icon: 'show_chart',
          to: '/reporting'
        },
        {
          text: 'Ordering',
          icon: 'pages',
          to: '/ordering'
        },
        {
          text: 'Account Management',
          icon: 'build',
          to: '/account'
        }
      ]
    }
  },
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
