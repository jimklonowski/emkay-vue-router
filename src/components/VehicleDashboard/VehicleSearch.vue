<template>
  <v-container>
    <v-row>
      <v-col xs="12">
        <header class="font-weight-light display-2 py-5 mr-auto">
          Vehicle Dashboard
        </header>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-alert border="left" colored-border type="info" elevation="2" dense>
          Enter any vehicle number, this is not real data
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-form ref="form" @submit.prevent="search">
          <v-text-field v-model="vehicle" name="vehicle" label="Vehicle Number" :counter="6" required filled shaped outlined />
        </v-form>
      </v-col>
    </v-row>
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
        // check to make sure we're allowed to drill into this vehicle#
        // ...
        this.$router.push({
          name: 'dashboard',
          params: { vehicle: this.vehicle }
        })
      }
    }
  }
}
</script>

<style></style>
