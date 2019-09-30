<template>
  <article>
    <v-card>
      <v-toolbar :class="this.$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-black">{{
            $t('vehicle_dashboard.vehicle')
          }}</span>
          <span class="font-weight-thin">{{
            $t('vehicle_dashboard.notes')
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
    </v-card>
  </article>
</template>

<script>
import AddNote from '@/modules/vehicle/components/Forms/AddNote'
export default {
  name: 'VehicleNotes',
  components: {
    AddNote
  },
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title: 'Notes',
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
        text: 'Add Note',
        icon: 'note',
        action: () => {},
        component: AddNote
      }
    ],
    headers: [
      {
        key: 'common.date',
        width: '150px',
        align: 'left',
        sortable: true,
        value: 'date'
      },
      {
        key: 'vehicle_dashboard.subject',
        width: '250px',
        align: 'left',
        sortable: true,
        value: 'subject'
      },
      {
        key: 'vehicle_dashboard.notes',
        width: '350px',
        align: 'left',
        sortable: true,
        value: 'notes'
      }
    ],
    items: []
  })
}
</script>

<style></style>
