<template>
  <v-container fluid fill-height style="max-height:100vh;" class="home">
    <v-layout column justify-center align-center pa-5>
      <h1 class="display-4">{{ title }}</h1>
      <v-subheader class="display-1">{{ subtitle }}</v-subheader>
      <v-alert type="warning">{{ loginDetails }}</v-alert>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      title: 'EMKAY, Inc.',
      subtitle: 'simple. better. different.'
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    loginDetails() {
      let user = this.$store.getters.currentUser

      return `[DEBUG] Account: ${user.account}, User: ${user.username}, isAdmin: ${user.isAdmin}`
    }
  }
}
</script>
<style>
.home {
  background: url(~@/assets/whitebg.jpg);
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
