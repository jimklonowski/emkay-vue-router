<template>
  <v-dialog v-model="dialog" max-width="1000">
    <template #activator="{ on }">
      <div v-t="key" v-on="on" @click.stop.prevent />
    </template>

    <v-card :loading="loading">
      <v-toolbar :class="$config.TOOLBAR_CLASS">
        <v-toolbar-title class="text-uppercase font-weight-black">
          <span v-t="'vehicle_dashboard.order'" />
          <span v-t="'vehicle_dashboard.status'" class="font-weight-thin" />
          <v-subheader class="d-inline" dark v-text="vehicle" />
        </v-toolbar-title>
        <v-spacer />
        <v-btn large icon tile dark @click.prevent="dialog = false">
          <v-icon v-text="'close'" />
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-card-text class="py-0">
        <v-list dense>
          <v-row dense>
            <v-list-item
              v-for="(field, index) in fields"
              :key="index"
              class="col-md-6"
            >
              <v-list-item-content>
                <v-list-item-subtitle v-t="field.key" class="details-label" />
                <v-list-item-title
                  class="text-label blue-grey--text text--darken-2"
                  v-text="field.value"
                />
              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-list>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'OrderStatus',
  props: {
    vehicle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dialog: false,
    errorMessage: null,
    loading: false,
    icon: 'av_timer',
    key: 'vehicle_dashboard.order_status',
    fields: [
      {
        name: 'driver',
        key: 'vehicle_dashboard.driver',
        value: 'Klonowski, James'
      },
      {
        name: 'vehicle_number',
        key: 'vehicle_dashboard.vehicle_number',
        value: '123456'
      },
      {
        name: 'vehicle_description',
        key: 'vehicle_dashboard.vehicle_description',
        value: 'jeep compass'
      },
      {
        name: 'factory_order_number',
        key: 'vehicle_dashboard.factory_order_number',
        value: '111'
      },
      {
        name: 'emkay_ordered_date',
        key: 'vehicle_dashboard.emkay_ordered_date',
        value: '09-01-2019'
      },
      {
        name: 'emkay_received_date',
        key: 'vehicle_dashboard.emkay_received_date',
        value: '09-02-2019'
      },
      {
        name: 'zone_received_date',
        key: 'vehicle_dashboard.zone_received_date',
        value: '09-03-2019'
      },
      {
        name: 'serial_number',
        key: 'vehicle_dashboard.serial_number',
        value: '112'
      },
      {
        name: 'ordered_dealer',
        key: 'vehicle_dashboard.ordered_dealer',
        value: '09-04-2019'
      },
      {
        name: 'sent_to_plant',
        key: 'vehicle_dashboard.sent_to_plant',
        value: '09-05-2019'
      },
      {
        name: 'ship_to_dealer',
        key: 'vehicle_dashboard.ship_to_dealer',
        value: '09-06-2019'
      },
      {
        name: 'production_scheduled',
        key: 'vehicle_dashboard.production_scheduled',
        value: '09-07-2019'
      },
      {
        name: 'build_date',
        key: 'vehicle_dashboard.build_date',
        value: '09-08-2019'
      },
      {
        name: 'shipped_to_body_co',
        key: 'vehicle_dashboard.shipped_to_body_co',
        value: '09-09-2019'
      },
      {
        name: 'at_body_co',
        key: 'vehicle_dashboard.at_body_co',
        value: '09-10-2019'
      },
      {
        name: 'shipped_from_body_co',
        key: 'vehicle_dashboard.shipped_from_body_co',
        value: '09-11-2019'
      },
      {
        name: 'back_at_manufacturer',
        key: 'vehicle_dashboard.back_at_manufacturer',
        value: '09-12-2019'
      },
      {
        name: 'shipped_to_dealer',
        key: 'vehicle_dashboard.shipped_to_dealer',
        value: '09-13-2019'
      },
      {
        name: 'release_to_convoy',
        key: 'vehicle_dashboard.release_to_convoy',
        value: '09-14-2019'
      },
      {
        name: 'delivery_to_dealer',
        key: 'vehicle_dashboard.delivery_to_dealer',
        value: '09-15-2019'
      },
      {
        name: 'delivery_date',
        key: 'vehicle_dashboard.delivery_date',
        value: '09-16-2016'
      },
      {
        name: 'ship_to_dealer_info',
        key: 'vehicle_dashboard.ship_to_dealer_info',
        value: 'this is some info'
      },
      {
        name: 'priority_code',
        key: 'vehicle_dashboard.priority_code',
        value: '123'
      },
      {
        name: 'comments',
        key: 'vehicle_dashboard.comments',
        value: 'this is for comments'
      }
    ]
  })
}
</script>

<style></style>
