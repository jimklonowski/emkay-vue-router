<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{ title }}</span>
          <span class="font-weight-thin">{{ subtitle }}</span>
          <v-subheader class="d-inline" dark>{{ vehicle }}</v-subheader>
        </v-toolbar-title>
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
        <v-menu transition="slide-y-transition" left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item
              v-for="(item, i) in actions"
              :key="i"
              :color="item.color"
              @click="item.action"
            >
              <component v-if="item.component" :is="item.component" />
              <template v-else>
                <v-list-item-icon>
                  <v-icon v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
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
          :loading-text="`Loading...`"
          dense
        />
      </v-card-text>
      <!-- <v-divider />
      <v-card-actions class="pa-4">
        <v-spacer />
        <report-accident />
      </v-card-actions> -->
    </v-card>
  </article>
</template>

<script>
import ReportAccident from '@/components/VehicleDashboard/Forms/ReportAccident'

export default {
  name: 'AccidentHistory',
  components: {
    ReportAccident
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title: 'Accident',
    subtitle: 'History',
    loading: false,
    search: '',
    actions: [
      {
        text: 'Export to Excel',
        icon: 'cloud_download',
        action: () => alert('download'),
        component: null
      },
      {
        text: 'Report Accident',
        icon: 'drive_eta',
        action: () => {},
        component: ReportAccident
      }
    ],
    headers: [
      {
        text: 'Loss Date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
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
