<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{
            $t('vehicle_dashboard.accident')
          }}</span>
          <span class="font-weight-thin">{{
            $t('vehicle_dashboard.history')
          }}</span>
          <v-subheader class="d-inline" dark>{{ vehicle }}</v-subheader>
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          class="font-weight-regular"
          append-icon="search"
          :label="$t('common.search')"
          single-line
          hide-details
          dark
        />
        <v-menu transition="slide-y-transition" z-index="3" left>
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
              <component :is="item.component" v-if="item.component" />
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
        >
          <template
            v-for="header in headers"
            v-slot:[`header.${header.value}`]="{ header }"
          >
            {{ $t(header.key) }}
          </template>
        </v-data-table>
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
import ReportAccident from '@/modules/vehicle/components/Forms/ReportAccident'

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
        key: 'vehicle_dashboard.loss_date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        key: 'vehicle_dashboard.claim_number',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'claim'
      },
      {
        key: 'vehicle_dashboard.claim_type',
        width: '200px',
        align: 'left',
        sortable: true,
        value: 'type'
      },
      {
        key: 'vehicle_dashboard.claim_amount',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'claim_amount'
      },
      {
        key: 'vehicle_dashboard.subrogation_amount',
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
