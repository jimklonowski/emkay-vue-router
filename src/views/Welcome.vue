<template>
  <v-container>
    <v-layout row wrap justify-center>
      <header class="display-2 xs12">Welcome, {{ currentUser.username }}!</header>
      <v-subheader>isAdmin: {{ currentUser.isAdmin }}</v-subheader>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Welcome',
  computed: {
    ...mapGetters(['currentUser'])
    // user() {
    //   return this.$store.getters.currentUser
    // },
    // isAdmin() {
    //   return this.$store.getters.isAdmin
    // }
  }
}
</script>

<style></style>
