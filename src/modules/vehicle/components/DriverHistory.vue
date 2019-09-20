<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{ $t('vehicle_dashboard.driver') }}</span>
          <span class="font-weight-thin">{{ $t('vehicle_dashboard.history') }}</span>
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
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
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
    </v-card>
  </article>
</template>

<script>
export default {
  name: 'DriverHistory',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title: 'Driver',
    subtitle: 'History',
    search: '',
    loading: false,
    actions: [
      {
        text: 'Export to Excel',
        icon: 'cloud_download',
        action: () => alert('download')
      },
      {
        text: 'Change Driver Effective Date',
        icon: 'date_range',
        action: () => alert('change driver effective date')
      }
    ],
    headers: [
      {
        text: 'Effective Date',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        text: 'End Date',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'end_date'
      },
      {
        text: 'Driver',
        width: 'auto',
        align: 'left',
        sortable: true,
        value: 'driver'
      }
    ],
    items: []
  })
}
</script>

<style>

</style>