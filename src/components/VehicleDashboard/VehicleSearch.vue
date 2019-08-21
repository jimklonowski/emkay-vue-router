<template>
  <v-container>
    <v-layout column>
      <header class="font-weight-light display-2 py-5">Vehicle Dashboard</header>
      <v-alert border="left" colored-border type="info" elevation="2">Enter any vehicle number, not real data</v-alert>
      <v-form ref="form" @submit.prevent="search">
        <v-flex xs12 md6>
          <v-text-field name="vehicle" v-model="vehicle" label="Vehicle Number" :counter="6" required filled shaped outlined></v-text-field>
        </v-flex>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'VehicleSearch',
  data() {
    return {
      vehicle: ''
    }
  },
  methods: {
    search() {
      if (this.vehicle) {
        this.$router.push({ name: 'dashboard', params: { vehicle: this.vehicle } })
      }
    }
  }
}
</script>

<style></style>
