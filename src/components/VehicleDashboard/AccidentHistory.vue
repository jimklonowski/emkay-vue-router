<template>
  <section>
    <v-card>
      <v-card-title :class="this.$config.COMPONENT_HEADER_CLASS">
        <header class="text-uppercase">
          <span class="font-weight-black">
            {{ title1 }}
          </span>
          <span class="font-weight-thin">
            {{ title2 }}
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
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          :sort-by="['date']"
          :sort-desc="[true]"
          :loading="loading"
          class="elevation-0"
          dense
        />
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-4">
        <v-spacer />
        <report-accident />
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
import ReportAccident from '@/components/VehicleDashboard/Forms/ReportAccident'

export default {
  name: 'AccidentHistory',
  components: {
    ReportAccident
  },
  props: {
    vehNum: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title1: 'Accident',
    title2: 'History',
    loading: false,
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
  })
}
</script>

<style></style>
