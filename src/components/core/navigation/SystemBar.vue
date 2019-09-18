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

export default {
  name: 'SystemBar',
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
      return `${count} ${text}`
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
