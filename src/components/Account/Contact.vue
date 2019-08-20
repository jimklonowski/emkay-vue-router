<template>
  <v-layout>
    <v-flex xs12>
      <v-card ref="form" flat class="ma-2" style="background-color:transparent;">
        <v-card-text>
          <v-text-field ref="fname" v-model="fname" :rules="[() => !!fname || 'This field is required']" label="First Name" required></v-text-field>
          <v-text-field ref="lname" v-model="lname" :rules="[() => !!lname || 'This field is required']" label="Last Name" required></v-text-field>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ContactInformation',
  data: () => ({
    title: 'Contact Information',
    fname: '',
    lname: '',
    address: '',
    phone: ''
  })
}
</script>

<style></style>
