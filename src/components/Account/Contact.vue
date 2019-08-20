<template>
  <v-layout>
    <v-flex xs12>
      <v-form ref="form" @submit.prevent="submitForm">
        <v-card flat class="ma-2" style="background-color:transparent;">
          <v-card-text>
            <v-text-field
              ref="fname"
              v-model="fname"
              type="text"
              :rules="[() => !!fname || 'This field is required']"
              label="First Name"
              required
            ></v-text-field>
            <v-text-field
              ref="lname"
              type="text"
              v-model="lname"
              :rules="[() => !!lname || 'This field is required']"
              label="Last Name"
              required
            ></v-text-field>
            <v-text-field
              ref="phone"
              v-model="phone"
              type="phone"
              :rules="[() => !!phone || 'This field is required']"
              label="Phone"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
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
  }),
  methods: {
    submitForm() {
      if (!this.$refs.form.validate()) {
        return false
      }
      alert('Form Submit')
    }
  }
}
</script>

<style></style>
