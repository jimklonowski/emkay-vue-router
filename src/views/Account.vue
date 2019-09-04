<template>
  <v-container fluid class="content-wrap pt-0">
    <v-row>
      <v-toolbar dark>
        <v-btn icon @click="goBack">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-divider inset vertical />&nbsp; Account Management
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" lg="4" xl="3" pa-10>
        <account-navigation />
      </v-col>

      <v-col cols="12" md="8" lg="8" xl="9" pa-10>
        <!-- <header class="display-3">{{ title }}</header> -->
        <router-view />
      </v-col>
    </v-row>
  </v-container>
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
