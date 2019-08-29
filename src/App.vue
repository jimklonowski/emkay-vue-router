<template>
  <v-app>
    <app-navigation />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
    <footer-navigation v-if="authed" />
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
  data() {
    return {
      authenticated: false
    }
  },
  computed: {
    authed() {
      return this.$store.getters.isAuthenticated
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.v-data-table tbody tr:nth-of-type(odd) {
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
