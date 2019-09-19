<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-alert
        prominent
        type="error"
      >
        <v-row>
          <v-col class="grow">The requested route has not been created yet.</v-col>
          <v-col class="shrink">
            <v-btn :to="{ path: '/' }">Home</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Todo'
}
</script>

<style>

</style>