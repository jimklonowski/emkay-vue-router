<template>
  <v-container fluid fill-height>
    <v-layout row wrap align-center justify-center>
      <v-card elevation="12" width="600px" :loading="loading">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="onSubmit(credentials.account, credentials.email)"
        >
          <v-toolbar color="primary" dense dark flat>
            {{ title }}
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="credentials.account"
              label="Account"
              name="account"
              append-icon="account_balance"
              type="text"
              autocomplete="organization"
              :rules="rules.account"
              required
            />
            <v-text-field
              v-model="credentials.email"
              label="Email"
              name="email"
              append-icon="email"
              type="email"
              autocomplete="email"
              :rules="rules.email"
              required
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn type="submit" :disabled="!valid">
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { LOGIN_HELP } from '@/store/actions.type'

export default {
  name: 'Register',
  data() {
    return {
      title: 'Forgot Login Credentials',
      loading: false,
      valid: false,
      rules: {
        account: [v => !!v || 'Account is required'],
        email: [v => /.+@.+/.test(v) || 'Invalid Email address']
      },
      credentials: {
        account: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit(account, email) {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.$store
        .dispatch(LOGIN_HELP, { account, email })
        .then(() => this.$router.push({ name: 'home' }))
    }
  }
}
</script>

<style></style>
