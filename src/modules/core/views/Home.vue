<template>
  <v-container fluid fill-height class="home">
    <v-card class="pa-4" elevation="0" max-width="750">
      <v-container>
        <v-row>
          <header class="display-4 font-weight-black" v-text="title" />
        </v-row>
        <v-row>
          <v-subheader class="display-1 font-italic font-weight-thin" v-t="'navigation.tagline'" />
        </v-row>
        <v-row>
          <v-alert type="warning">
            {{ loginDetails }}
          </v-alert>
        </v-row>
      </v-container>
    </v-card>
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
  /* min-height: calc(100vh - 96px - 40px); */
  /* width: 100%;
  height: 100%; */
}
</style>
