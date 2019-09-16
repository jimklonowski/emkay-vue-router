<template>
  <article>
    <v-card>
      <v-card-title :class="this.$config.COMPONENT_HEADER_CLASS">
        <header class="text-uppercase">
          <span class="font-weight-black">{{ title }}</span>
          <span class="font-weight-thin">{{ subtitle }}</span>
        </header>
        <v-subheader dark>{{ vehNum }}</v-subheader>
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
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          class="elevation-0"
        />
      </v-card-text>
    </v-card>
  </article>
</template>

<script>
export default {
  name: 'OdometerHistory',
  props: {
    vehNum: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title: 'Odometer',
    subtitle: 'History',
    search: '',
    loading: true,
    headers: [],
    items: []
  })
}
</script>

<style></style>
