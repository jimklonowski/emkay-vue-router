<template>
  <v-app>
    <app-navigation></app-navigation>
    <v-content transition="slide-x-transition">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation'
export default {
  name: 'App',
  components: {
    AppNavigation
  },
  data() {
    return {
      authenticated: false,
      mockAccount: {
        account: 'EM102',
        username: 'JCK',
        password: '123'
      }
    }
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ path: 'login' })
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status
    },
    logout() {
      this.authenticated = false
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato|Roboto+Condensed&display=swap');
#app {
  font-family: 'Lato', sans-serif;
}
</style>
