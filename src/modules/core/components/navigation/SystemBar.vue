<template>
  <v-system-bar
    :class="this.$config.SYSTEM_BAR_CLASS"
    app
    :height="height"
    style="z-index:5"
    dark
  >
    <template v-for="button in buttons">
      <v-btn
        v-if="authed"
        :key="button.text"
        :to="button.to"
        small
        text
        tile
      >
        <v-icon>{{ button.icon }}</v-icon>
        <span class="system-bar-text">
          {{ $tc(button.key, button.count) }}
        </span>
      </v-btn>
    </template>
    <div class="flex-grow-1" />
    <v-btn v-if="authed" to="/fleet-navigator" small text tile>
      <v-icon>widgets</v-icon>
      <span class="system-bar-text">{{ $t('features.fleet_navigator') }}</span>
    </v-btn>
    <omni-switch />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span v-on="on" v-text="formatTime(now)" />
      </template>
      <span v-text="formatFullDate(now)" />
    </v-tooltip>
  </v-system-bar>
</template>

<script>
import moment from 'moment'
//import LocaleSwitch from '@/modules/core/components/navigation/LocaleSwitch'
import OmniSwitch from '@/modules/core/components/navigation/OmniSwitch'

export default {
  name: 'SystemBar',
  components: {
    OmniSwitch
    //LocaleSwitch
  },
  props: {
    height: {
      type: Number,
      default: 36
    },
    authed: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    buttons: [
      {
        text: 'Unread Messages',
        key: 'notifications.unread_messages',
        to: { name: 'messaging' },
        icon: 'mail',
        count: 10
      },
      {
        text: 'Critical Alerts',
        key: 'notifications.critical_alerts',
        to: { name: 'messaging' },
        icon: 'notifications',
        count: 3
      },
      {
        text: 'Driver Order Approvals',
        key: 'notifications.driver_order_approvals',
        to: { name: 'messaging' },
        icon: 'drive_eta',
        count: 0
      },
      {
        text: 'Maintenance Approvals',
        key: 'notifications.maintenance_approvals',
        to: { name: 'messaging' },
        icon: 'report',
        count: 1
      }
    ],
    now: Date.now()
  }),
  mounted() {
    this.updateNow()
    // update time every second
    setInterval(this.updateNow.bind(this), 1000)
  },
  methods: {
    alertText(count, text) {
      return count ? `${count} ${text}` : `${text}`
    },
    formatTime() {
      return moment(this.now).format('hh:mm A')
    },
    formatFullDate() {
      return moment(this.now).format('LLLL')
    },
    updateNow() {
      this.now = Date.now()
    }
  }
}
</script>

<style scoped>
.system-bar-text {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>
