<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar dark>
        <v-btn icon @click="goBack">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-divider inset vertical />&nbsp; Account Management
      </v-toolbar>
    </v-flex>
    <v-flex xs12 md4 lg4 xl3 pa-10>
      <account-navigation />
    </v-flex>

    <v-flex xs12 md8 lg8 xl9 pa-10>
      <!-- <header class="display-3">{{ title }}</header> -->
      <router-view />
    </v-flex>
  </v-layout>
</template>

<script>
import AccountNavigation from '@/components/Account/AccountNavigation'

export default {
  name: 'Account',
  components: {
    AccountNavigation
  },
  data() {
    return {
      title: 'Account Management'
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style></style>
