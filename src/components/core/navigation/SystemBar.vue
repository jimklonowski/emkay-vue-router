<template>
  <v-system-bar
    :class="this.$config.SYSTEM_BAR_CLASS"
    app
    dark
    :height="height"
    style="z-index:5"
  >
    <v-btn
      v-for="button in buttons"
      :key="button.text"
      :to="button.to"
      small
      text
      tile
      dark
    >
      <v-icon>{{ button.icon }}</v-icon>
      <span style="font-family:'Roboto Condensed', sans-serif;">
        {{ alertText(button.count, button.text) }}
      </span>
    </v-btn>
    <div class="flex-grow-1" />
    <v-btn
      to="/fleet-navigator"
      small
      text
      tile
      dark
    >
      <v-icon>widgets</v-icon>
      <span style="font-family:'Roboto Condensed', sans-serif;">Fleet Navigator</span>
    </v-btn>
    <locale-switch />
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <span v-on="on" v-text="formatTime(now)" />
      </template>
      <span v-text="formatFullDate(now)" />
    </v-tooltip>
  </v-system-bar>
</template>

<script>
import moment from 'moment'
import LocaleSwitch from '@/components/core/navigation/LocaleSwitch'

export default {
  name: 'SystemBar',
  components: {
    LocaleSwitch
  },
  props: {
    height: {
      type: Number,
      default: 36
    }
  },
  data: () => ({
    buttons: [
      {
        text: 'Unread Messages',
        to: { name: 'messaging' },
        icon: 'mail',
        count: 10
      },
      {
        text: 'Critical Alerts',
        to: { name: 'messaging' },
        icon: 'notifications',
        count: 3
      },
      {
        text: 'Driver Order Approvals',
        to: { name: 'messaging' },
        icon: 'drive_eta',
        count: 0
      },
      {
        text: 'Maintenance Approvals',
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

<style></style>
