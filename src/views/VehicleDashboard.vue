<template>
  <section v-if="!$route.params.vehicle">
    <v-app-bar
      elevation="0"
      color="transparent"
      tile
      dense
      absolute
      style="position:sticky;top:100px;"
    />
    <v-container fluid>
      <v-container tag="section">
        <v-row tag="header" class="font-weight-thin display-2 pa-3">
          {{ $t('features.vehicle_dashboard') }}
        </v-row>
        <v-row
          ref="search"
          tag="form"
          class="col-md-6"
          @submit.prevent="search"
        >
          <v-text-field
            v-model="vehicle"
            name="vehicle"
            label="Search"
            placeholder="Find a vehicle..."
            hint="Enter a vehicle number"
            outlined
            autocomplete="false"
            required
            class="pa-3"
            append-outer-icon="send"
            persistent-hint
            :counter="6"
            @click:append-outer="search"
          />
        </v-row>
      </v-container>
    </v-container>
  </section>
  <section v-else>
    <vehicle-navigation :vehicle="$route.params.vehicle" />
    <router-view />
    <!-- <vehicle-navigation :vehicle="$route.params.vehicle" />
    <v-container fluid style="padding-right:200px;">
      <v-container tag="section">
        <v-row tag="header" class="font-weight-thin display-2 pa-3">
          {{ dashboardTitle }}
        </v-row>
        <router-view />
      </v-container>
    </v-container> -->
  </section>

  <!-- <v-container v-if="!$route.params.vehicle" class="content-wrap" tag="section">
    <v-row tag="header" class="font-weight-thin display-2 pa-3">
      {{ title }} {{ subtitle }}
    </v-row>
    <v-row>
      <v-form
        ref="search"
        class="col-md-6"
        justify-center
        align-center
        @submit.prevent="search"
      >
        <v-text-field
          v-model="vehicle"
          name="vehicle"
          label="Search"
          placeholder="Find a vehicle..."
          hint="Enter a vehicle number"
          outlined
          autocomplete="false"
          required
          class="pa-3"
          append-outer-icon="send"
          persistent-hint
          :counter="6"
          @click:append-outer="search"
        />
      </v-form>
    </v-row>
  </v-container>
  <section v-else>
    <vehicle-navigation :vehicle="$route.params.vehicle" />
    <v-container tag="section">
      <v-row tag="header">
        <header class="font-weight-thin display-2 pa-3">
          Vehicle Dashboard for Vehicle # {{ $route.params.vehicle }}
        </header>
      </v-row>
      <router-view />
    </v-container>
  </section> -->
</template>

<script>
import VehicleNavigation from '@/components/VehicleDashboard/VehicleNavigation'
export default {
  name: 'VehicleDashboard',
  components: {
    VehicleNavigation
  },
  data: () => ({
    title: 'Vehicle',
    subtitle: 'Dashboard',
    vehicle: ''
  }),
  computed: {
    dashboardTitle() {
      return this.$route.params.vehicle
        ? `Vehicle Dashboard for Vehicle #${this.$route.params.vehicle}`
        : `Vehicle Dashboard`
    }
  },
  methods: {
    search() {
      if (this.vehicle) {
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
