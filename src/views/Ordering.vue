<template>
  <v-container fluid class="content-wrap">
    <v-row>
      <v-col xs="12">
        <header class="font-weight-thin display-2 pa-3">{{ title }}</header>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Ordering',
  data() {
    return {
      title: 'Vehicle Ordering / Selectors'
    }
  }
}
</script>
<style></style>
