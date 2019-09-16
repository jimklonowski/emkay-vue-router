<template>
  <nav>
    <v-system-bar
      v-if="authed"
      :class="this.$config.SYSTEM_BAR_CLASS"
      app
      dark
      height="36"
      style="z-index:5"
    >
      <v-btn small text tile dark :to="{ name: 'messaging' }">
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

    <v-app-bar
      :class="this.$config.APP_BAR_CLASS"
      height="64"
      app
      clipped-left
      dark
    >
      <v-app-bar-nav-icon
        v-if="authed"
        class="hidden-lg-and-up"
        @click.stop="drawer = !drawer"
      />
      <!-- <v-toolbar-items >
        <v-btn
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          color="rgba(255,255,255,0.7)"
          class="font-weight-regular"
          text
        >
          {{ item.text }}
        </v-btn>
      </v-toolbar-items> -->
      <v-tabs
        v-if="authed"
        class="hidden-md-and-down"
        background-color="transparent"
        show-arrows
      >
        <v-tab v-for="item in items" :key="item.text" :to="item.to">
          {{ item.text }}
        </v-tab>
      </v-tabs>
      <!-- <div class="flex-grow-1" /> -->
      <v-spacer />

      <v-toolbar-items>
        <v-text-field
          v-if="authed"
          class="py-2"
          clearable
          append-icon="search"
          hint="Search"
          placeholder="Find a vehicle, driver, or website feature..."
          hide-details
          label="Search"
          type="search"
          rounded
          solo-inverted
          style="min-width:400px;"
          color="blue-grey darken-2"
          flat
          dense
          dark
        />
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      v-if="authed"
      v-model="drawer"
      class="hidden-lg-and-up"
      mobile-break-point="9999"
      height="400"
      app
      bottom
    >
      <v-list dense nav>
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
import { LOGOUT } from '@/store/actions.type'

export default {
  name: 'AppNavigation2',
  data: () => ({
    title: 'EMKAY',
    drawer: false,
    now: Date.now(),
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
        text: 'Ordering',
        icon: 'pages',
        to: '/ordering'
      },
      {
        text: 'Reporting',
        icon: 'show_chart',
        to: '/reporting'
      },
      {
        text: 'Account Management',
        icon: 'build',
        to: '/account'
      }
    ]
  }),
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
