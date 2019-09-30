<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <header>{{ title }}</header>
        <v-subheader>{{ subtitle }}</v-subheader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Messaging',
  data: () => ({
    title: 'Fleet',
    subtitle: 'Messenger'
  })
}
</script>

<style></style>
