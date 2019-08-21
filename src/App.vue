<template>
  <v-app>
    <app-navigation></app-navigation>
    <v-content transition="slide-x-transition">
      <router-view />
    </v-content>
    <footer-navigation v-if="authed"></footer-navigation>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/core/AppNavigation'
import FooterNavigation from '@/components/core/FooterNavigation'
export default {
  name: 'App',
  components: {
    AppNavigation,
    FooterNavigation
  },
  computed: {
    authed() {
      return this.$store.getters.isAuthenticated
    }
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato|Roboto+Condensed&display=swap');
#app {
  /* font-family: 'Lato', sans-serif; */
  font-family: 'Roboto', sans-serif;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

input:-webkit-autofill {
  &,
  &:hover,
  &:focus,
  &:active {
    transition-delay: 9999s;
    transition-property: background-color, color;
  }
}
</style>
