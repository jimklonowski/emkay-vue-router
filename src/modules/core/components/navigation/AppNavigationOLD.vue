<template>
  <nav>
    <v-system-bar
      v-if="authed"
      :class="this.$config.SYSTEM_BAR_CLASS"
      app
      dark
      height="36"
    >
      <v-btn
        small
        text
        tile
        color="rgba(255,255,255,0.7)"
        :to="{ name: 'messaging' }"
      >
        <v-icon>mail</v-icon>
        <span
          v-if="messageCount > 0"
          style="font-family:'Roboto Condensed',sans-serif;"
        >
          {{ messageCount }} unread messages
        </span>
      </v-btn>
      <div class="flex-grow-1" />
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <span v-on="on" v-text="formatTime(now)" />
        </template>
        <span v-text="formatFullDate(now)" />
      </v-tooltip>
    </v-system-bar>
    <v-divider
      v-if="authed"
      dark
      style="width:100%;position:fixed;top:36px;z-index:6;"
    />
    <v-app-bar :class="this.$config.APP_BAR_CLASS" app dark clipped-left>
      <v-app-bar-nav-icon v-if="authed" @click.stop="drawer = !drawer" />
      <v-spacer class="hidden-md-and-up" />
      <v-toolbar-title class="hidden-sm-and-down">{{ title }}</v-toolbar-title>
      <v-spacer class="hidden-sm-and-down" />
      <v-layout v-if="authed" align-center style="max-width:650px;">
        <v-text-field
          append-icon="search"
          placeholder="Search..."
          single-line
          hide-details
          color="white"
        />
      </v-layout>
      <v-btn v-if="!authed" text class="hidden-sm-and-down" to="/login"
      >SIGN IN</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer v-if="authed" v-model="drawer" app fixed light clipped>
      <v-list dense nav>
        <v-subheader>NAVIGATION</v-subheader>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="item.to"
          active-class="primary--text"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider />
        <v-list dense nav>
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
import { LOGOUT } from '@/modules/auth/store/actions.type'

export default {
  name: 'AppNavigation2',
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
          to: { name: 'fleet-dashboard' }
        },
        {
          text: 'Vehicle Dashboard',
          icon: 'table_chart',
          to: { name: 'vehicle-dashboard' }
        },
        {
          text: 'Ordering',
          icon: 'pages',
          to: { name: 'ordering' }
        },
        {
          text: 'Reporting',
          icon: 'show_chart',
          to: { name: 'reporting' }
        },
        {
          text: 'Fleet Management',
          icon: 'build',
          to: { name: 'fleet-management' }
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
