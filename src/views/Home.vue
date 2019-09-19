<template>
  <v-container fluid fill-height class="home">
    <v-row dense>
      <v-col cols="12">
        <header class="display-4 font-weight-black">
          {{ title }}
        </header>
      </v-col>
      <v-col cols="12">
        <v-subheader class="display-1 font-italic font-weight-thin">
          {{ $t('navigation.tagline') }}
        </v-subheader>
      </v-col>
      <v-col md="5">
        <v-alert type="warning">
          {{ loginDetails }}
        </v-alert>
      </v-col>
    </v-row>
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
