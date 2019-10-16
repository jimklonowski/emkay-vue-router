<template>
  <v-app>
    <nprogress-container />
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
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import AppNavigation from '@/modules/core/components/navigation/AppNavigation'
import FooterNavigation from '@/modules/core/components/navigation/FooterNavigation'
export default {
  name: 'App',
  components: {
    AppNavigation,
    FooterNavigation,
    NprogressContainer
  },
  data() {
    return {}
  },
  computed: {
    authed() {
      return this.$store.getters.isAuthenticated
    },
  },
  created() {
    this.$vuetify.theme.dark = this.$store.getters.isDark
    this.$i18n.locale = this.$store.getters.currentLocale
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

.details-label {
  height: 16px !important;
  line-height: 16px !important;
  font-size: 12px !important;
  font-weight: 400 !important;
}
.text-label {
  height: 20px !important;
  line-height: 20px !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
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
