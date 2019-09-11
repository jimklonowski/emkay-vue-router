<template>
  <v-container fluid class="content-wrap">
    <v-row>
      <v-col xs="12">
        <header class="font-weight-thin display-2 pa-3">
          {{ title }}
        </header>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
          dense
          class="ma-3"
        >
          Enter any vehicle number, this is not real data
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-form ref="form" @submit.prevent="search">
          <v-text-field
            v-model="vehicle"
            name="vehicle"
            label="Vehicle Number"
            :counter="6"
            required
            shaped
            outlined
            class="pa-3"
          />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'VehicleDashboard',
  data: () => ({
    title: 'Vehicle Dashboard',
    vehicle: ''
  }),
  methods: {
    search() {
      if (this.vehicle) {
        //if(ok)
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
