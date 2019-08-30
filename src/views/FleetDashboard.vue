<template>
  <v-container fill-height fluid pa-0>
    <iframe v-if="iframe.loaded" :src="iframe.src" :style="iframe.style" :height="iframe.style.height" :width="iframe.style.width"></iframe>
  </v-container>
</template>

<script>
export default {
  name: 'FleetDashboard',
  data() {
    return {
      title: 'Fleet Dashboard',
      iframe: {
        loaded: false,
        src: '',
        style: null,
        wrapperStyle: null
      }
    }
  },
  mounted() {
    this.iframe.src = process.env.VUE_APP_FLEET_DASH_URL

    this.iframe.style = {
      position: 'absolute',
      border: 'none',
      width: '100%',
      height: '100%'
    }

    this.iframe.wrapperStyle = {
      overflow: 'hidden',
      height: '100%',
      width: '100%'
    }

    this.iframe.loaded = true
  }
}
</script>

<style></style>
