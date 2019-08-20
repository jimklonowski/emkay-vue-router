<template>
  <v-layout row>
    <v-flex xs12>
      <v-toolbar dark>
        <v-btn to="/" icon>
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-divider inset vertical></v-divider>&nbsp; Account Management
      </v-toolbar>
    </v-flex>
    <v-flex xs12 md4 lg3 pa-10>
      <account-navigation />
    </v-flex>

    <v-flex xs12 md8 lg9 pa-10>
      <header class="display-3">{{ title }}</header>
      <router-view />
    </v-flex>
  </v-layout>
</template>

<script>
import AccountNavigation from '@/components/Account/AccountNavigation'

export default {
  name: 'Account',
  data() {
    return {
      title: 'Account Management'
    }
  },
  components: {
    AccountNavigation
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style></style>
