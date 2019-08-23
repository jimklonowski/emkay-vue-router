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
          <v-toolbar color="primary" dense dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert v-if="errorMessage" type="error">
              {{ errorMessage }}
            </v-alert>

            <v-alert border="left" colored-border type="info" elevation="2">
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
            <v-btn text to="/login-help">
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
