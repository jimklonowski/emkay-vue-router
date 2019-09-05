<template>
  <v-app>
    <app-navigation />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view class="content-wrap" />
      </transition>
      <footer-navigation v-if="authed" />
    </v-content>
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
    return {}
  },
  computed: {
    authed() {
      return this.$store.getters.isAuthenticated
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato|Roboto+Condensed&display=swap');
#app {
  /* font-family: 'Lato', sans-serif; */
  font-family: 'Roboto', sans-serif;
}

.content-wrap {
  min-height: calc(100vh - 96px);
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
