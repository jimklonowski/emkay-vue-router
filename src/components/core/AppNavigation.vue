<template>
  <nav>
    <v-system-bar v-if="authed" color="blue-grey darken-4" lights-out dark app window>
      <v-icon>mail</v-icon>
      <span v-if="messageCount > 0" style="font-family:'Roboto Condensed',sans-serif;">{{ messageCount }} unread messages</span>
      <div class="flex-grow-1"></div>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <span v-on="on" v-text="formatTime(now)"></span>
        </template>
        <span v-text="formatFullDate(now)"></span>
      </v-tooltip>
    </v-system-bar>
    <v-divider v-if="authed" dark style="width:100%;position:fixed;top:32px;z-index:6;"></v-divider>
    <v-app-bar app dark clipped-left color="blue-grey darken-2">
      <v-app-bar-nav-icon v-if="authed" @click.stop="drawer = !drawer" />
      <v-spacer class="hidden-md-and-up" />
      <v-toolbar-title class="hidden-sm-and-down">{{ title }}</v-toolbar-title>
      <v-spacer class="hidden-sm-and-down" />
      <v-layout v-if="authed" align-center style="max-width:650px;">
        <v-text-field :append-icon-cb="() => {}" append-icon="search" placeholder="Search..." single-line hide-details color="white" />
      </v-layout>
      <!-- <v-btn v-if="!authed" text outlined class="hidden-sm-and-down mr-2" to="/register">REGISTER</v-btn> -->
      <!-- <v-btn v-if="authed" text class="hidden-sm-and-down mr-2" to="/">PROTECTED</v-btn> -->
      <v-btn v-if="!authed" text class="hidden-sm-and-down" to="/login">SIGN IN</v-btn>
      <!-- <v-btn v-else text class="hidden-sm-and-down" @click="logout" color="danger">LOG OUT</v-btn> -->
    </v-app-bar>

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
        <!-- <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>domain_disabled</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log Off</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
        <!-- <v-btn tile block elevation="0" color="primary darken-1 white--text" @click="logout">Log Off</v-btn> -->
      </v-list>

      <template v-slot:append>
        <v-list dense>
          <v-divider></v-divider>
          <v-list-item link @click="logout">
            <v-list-item-action>
              <v-icon>domain_disabled</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Log Off</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import moment from 'moment'
import { LOGOUT } from '@/store/actions.type'

export default {
  name: 'AppNavigation',
  data() {
    return {
      title: 'EMKAY',
      drawer: true,
      now: Date.now(),
      // this will come from a vuex getter
      messageCount: 10,
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
  mounted() {
    this.updateNow()
    setInterval(this.updateNow.bind(this), 1000)
  },
  methods: {
    formatTime() {
      return moment(this.now).format('hh:mm A')
    },
    formatFullDate() {
      return moment(this.now).format('LLLL')
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: 'login' })
      })
    },
    updateNow() {
      this.now = Date.now()
    }
  }
}
</script>

<style></style>
