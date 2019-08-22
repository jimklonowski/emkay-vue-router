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
          dense
        ></v-data-table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined tile color="error"> <v-icon left>drive_eta</v-icon>&nbsp;Report Accident </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'AccidentHistory',
  data() {
    return {
      title1: 'Accident',
      title2: 'History',
      search: '',
      headers: [
        {
          text: 'Loss Date',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'loss_date'
        },
        {
          text: 'Claim #',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'claim'
        },
        {
          text: 'Claim Type',
          width: '200px',
          align: 'left',
          sortable: true,
          value: 'type'
        },
        {
          text: 'Claim Amount',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'claim_amount'
        },
        {
          text: 'Subrogation Amount',
          width: '150px',
          align: 'left',
          sortable: true,
          value: 'subrogated_amount'
        }
      ],
      items: []
    }
  }
}
</script>

<style></style>
