<template>
  <section>
    <v-card>
      <v-card-title :class="this.$config.COMPONENT_HEADER_CLASS">
        <header class="text-uppercase">
          <span class="font-weight-black">{{ title1 }}</span>
          <span class="font-weight-thin">{{ title2 }}</span>
        </header>
        <v-subheader dark>{{ vehNum }}</v-subheader>
        <v-spacer />
        <v-text-field v-model="search" class="font-weight-regular" append-icon="search" label="Search" single-line hide-details dark />
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
  </section>
</template>

<script>
export default {
  name: 'LicensingHistory',
  props: {
    vehNum: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title1: 'Licensing',
    title2: 'History',
    loading: false,
    search: '',
    headers: [
      {
        text: 'Expiration Date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'exp_date'
      },
      {
        text: 'Plate',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'plate'
      },
      {
        text: 'Status',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'status'
      },
      {
        text: 'Needs',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'needs'
      }
    ],
    items: []
  })
}
</script>

<style></style>
