<template>
  <section>
    <v-card>
      <v-card-title class="blue-grey darken-1 white--text">
        <header class="text-uppercase">
          <span class="font-weight-bold">{{ title1 }}</span>
          <span class="font-weight-thin">{{ title2 }}</span>
        </header>
        <v-spacer></v-spacer>
        <v-text-field class="font-weight-regular" v-model="search" append-icon="search" label="Search" single-line hide-details dark></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          class="elevation-0"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'LicensingHistory',
  data() {
    return {
      title1: 'Licensing',
      title2: 'History',
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
    }
  }
}
</script>

<style></style>
