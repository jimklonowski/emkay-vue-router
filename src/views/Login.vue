<template>
  <v-container fluid fill-height class="login">
    <v-layout row wrap align-center justify-center>
      <v-card elevation="12" width="600px" :loading="loading">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="onSubmit(credentials.account, credentials.username, credentials.password)"
        >
          <v-card-title class="blue-grey darken-1 white--text">
            <header class="text-uppercase">
              <span class="font-weight-black">{{ title1 }}</span>
              <span class="font-weight-thin">{{ title2 }}</span>
            </header>
            <v-subheader dark>{{ subtitle }}</v-subheader>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-alert v-if="errorMessage" type="error">
              {{ errorMessage }}
            </v-alert>

            <v-alert border="left" type="info" color="primary lighten-2" dense>
              EM102 JCK 123
            </v-alert>

            <v-text-field
              v-model="credentials.account"
              label="Account"
              name="account"
              append-icon="account_balance"
              type="text"
              :rules="rules.account"
              autocomplete="organization"
              required
            />
            <v-text-field
              v-model="credentials.username"
              label="Username"
              name="username"
              append-icon="person"
              type="text"
              :rules="rules.username"
              autocomplete="username"
              required
            />
            <v-text-field
              v-model="credentials.password"
              label="Password"
              name="password"
              append-icon="lock"
              type="password"
              :rules="rules.password"
              autocomplete="current-password"
              required
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text to="/login-help" tabindex="-1">
              Forgot Password
            </v-btn>
            <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4">
              Login
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { LOGIN } from '@/store/actions.type'

export default {
  name: 'Login',
  data() {
    return {
      errorMessage: '',
      loading: false,
      title1: 'Login',
      title2: 'Client',
      subtitle: '',
      valid: false,
      credentials: {
        account: '',
        username: '',
        password: ''
      },
      rules: {
        account: [v => !!v || 'Account is required'],
        username: [v => !!v || 'Username is required'],
        password: [v => !!v || 'Password is required']
      }
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit(account, username, password) {
      this.loading = true
      if (!this.$refs.form.validate()) {
        this.loading = false
        return false
      }

      this.$store
        .dispatch(LOGIN, { account, username, password })
        .then(() => {
          console.log('Login success, routing to /home')
          this.$router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('Login failure')
          this.errorMessage = e.message //(e.response.data || {}).errors[0] || e.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.login {
  /* background: url(~@/assets/loginbg.jpg); */
  background: url(~@/assets/servicebg.jpg);
  background-position-x: 50%;
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
