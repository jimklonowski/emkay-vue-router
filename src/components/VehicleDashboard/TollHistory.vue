<template>
  <section>
    <v-card>
      <v-card-title :class="this.$config.COMPONENT_HEADER_CLASS">
        <header class="text-uppercase">
          <span class="font-weight-black">
            {{ title }}
          </span>
          <span class="font-weight-thin">
            {{ subtitle }}
          </span>
        </header>
        <v-subheader dark>
          {{ vehNum }}
        </v-subheader>
        <v-spacer />
        <v-text-field
          v-model="search"
          class="font-weight-regular"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          dark
        />
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table
          :search="search"
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          :loading-text="`Loading...`"
          class="elevation-0"
          dense
        />
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-4">
        <v-spacer />
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'TollHistory',
  props: {
    vehNum: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    search: '',
    title: 'Toll',
    subtitle: 'History',
    loading: true,
    headers: [],
    items: []
  })
}
</script>

<style></style>
