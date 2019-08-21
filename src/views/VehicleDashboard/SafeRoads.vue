<template>
  <header>{{ title }} for vehicle {{ $route.params.vehicle }}</header>
</template>

<script>
export default {
  name: 'SafeRoads',
  data() {
    return {
      title: 'SafeRoads'
    }
  }
}
</script>

<style></style>
