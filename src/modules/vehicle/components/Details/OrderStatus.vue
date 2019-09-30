<template>
  <v-dialog v-model="dialog" max-width="1000" persistent>
    <template v-slot:activator="{ on }">
      <v-btn text tile color="primary" v-on="on" @click.stop.prevent>
        <v-icon left>av_timer</v-icon>
        {{ $t('vehicle_dashboard.order_status') }}
      </v-btn>
    </template>

    <v-card :loading="loading">
      <v-card-title :class="this.$config.TOOLBAR_CLASS">
        <header class="text-uppercase">
          <span class="font-weight-black">ORDER</span>
          <span class="font-weight-thin">STATUS!</span>
        </header>
        <v-spacer />
        <v-btn large icon tile dark @click.prevent="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-list dense>
          <v-row dense>
            <v-list-item
              v-for="(field, index) in fields"
              :key="index"
              class="col-md-6"
            >
              <v-list-item-content>
                <v-list-item-subtitle
                  class="details-label"
                  v-text="$t(field.key)"
                />
                <v-list-item-title
                  class="text-label blue-grey--text text--darken-2"
                  v-text="$t(field.value)"
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
    loading: false,
    fields: [
      {
        name: 'driver',
        key: 'vehicle_dashboard.driver',
        value: ''
      },
      {
        name: 'vehicle_number',
        key: 'vehicle_dashboard.vehicle_number',
        value: ''
      },
      {
        name: 'vehicle_description',
        key: 'vehicle_dashboard.vehicle_description',
        value: ''
      },
      {
        name: 'factory_order_number',
        key: 'vehicle_dashboard.factory_order_number',
        value: ''
      },
      {
        name: 'emkay_ordered_date',
        key: 'vehicle_dashboard.emkay_ordered_date',
        value: ''
      },
      {
        name: 'emkay_received_date',
        key: 'vehicle_dashboard.emkay_received_date',
        value: ''
      },
      {
        name: 'zone_received_date',
        key: 'vehicle_dashboard.zone_received_date',
        value: ''
      },
      {
        name: 'serial_number',
        key: 'vehicle_dashboard.serial_number',
        value: ''
      },
      {
        name: 'ordered_dealer',
        key: 'vehicle_dashboard.ordered_dealer',
        value: ''
      },
      {
        name: 'sent_to_plant',
        key: 'vehicle_dashboard.sent_to_plant',
        value: ''
      },
      {
        name: 'ship_to_dealer',
        key: 'vehicle_dashboard.ship_to_dealer',
        value: ''
      },
      {
        name: 'production_scheduled',
        key: 'vehicle_dashboard.production_scheduled',
        value: ''
      },
      {
        name: 'build_date',
        key: 'vehicle_dashboard.build_date',
        value: ''
      },
      {
        name: 'shipped_to_body_co',
        key: 'vehicle_dashboard.shipped_to_body_co',
        value: ''
      },
      {
        name: 'at_body_co',
        key: 'vehicle_dashboard.at_body_co',
        value: ''
      },
      {
        name: 'shipped_from_body_co',
        key: 'vehicle_dashboard.shipped_from_body_co',
        value: ''
      },
      {
        name: 'back_at_manufacturer',
        key: 'vehicle_dashboard.back_at_manufacturer',
        value: ''
      },
      {
        name: 'shipped_to_dealer',
        key: 'vehicle_dashboard.shipped_to_dealer',
        value: ''
      },
      {
        name: 'release_to_convoy',
        key: 'vehicle_dashboard.release_to_convoy',
        value: ''
      },
      {
        name: 'delivery_to_dealer',
        key: 'vehicle_dashboard.delivery_to_dealer',
        value: ''
      },
      {
        name: 'delivery_date',
        key: 'vehicle_dashboard.delivery_date',
        value: ''
      },
      {
        name: 'ship_to_dealer_info',
        key: 'vehicle_dashboard.ship_to_dealer_info',
        value: ''
      },
      {
        name: 'priority_code',
        key: 'vehicle_dashboard.priority_code',
        value: ''
      },
      {
        name: 'comments',
        key: 'vehicle_dashboard.comments',
        value: ''
      }
    ]
  })
}
</script>

<style></style>
