<template>
  <nav>
    <v-navigation-drawer v-if="authed" app v-model="drawer" class="blue-grey lighten-2" clipped light>
      <v-list>
        <v-subheader color="grey darken-1">NAVIGATION</v-subheader>
        <v-list-item v-for="item in items" :key="item.text" :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>FLEET MESSAGES</v-subheader>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark color="blue-grey darken-4" clipped-left>
      <v-app-bar-nav-icon v-if="authed" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <!-- <v-btn v-if="!authed" text outlined class="hidden-sm-and-down mr-2" to="/register">REGISTER</v-btn> -->
      <v-btn v-if="authed" text class="hidden-sm-and-down mr-2" to="/welcome">PROTECTED</v-btn>
      <v-btn v-if="!authed" text class="hidden-sm-and-down" to="/login">SIGN IN</v-btn>
      <v-btn v-else text class="hidden-sm-and-down" @click="logout" color="danger">LOG OUT</v-btn>
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
      drawer: false,
      items: [
        {
          text: 'Home',
          to: '/'
        },
        {
          text: 'Fleet Dashboard'
        },
        {
          text: 'Vehicle Dashboard'
        },
        {
          text: 'Reporting'
        },
        {
          text: 'Account Management'
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
        console.log('OMG LOGGING OUT FROM APP NAVIGATION!')
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style></style>
