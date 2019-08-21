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
            <v-alert v-if="errors" type="error">
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </v-alert>

            <v-alert border="left" colored-border type="info" elevation="2">EM102 JCK 123</v-alert>

            <v-text-field
              label="Account"
              name="account"
              v-model="credentials.account"
              append-icon="account_balance"
              type="text"
              :rules="rules.account"
              autocomplete="organization"
              required
            ></v-text-field>
            <v-text-field
              label="Username"
              name="username"
              v-model="credentials.username"
              append-icon="person"
              type="text"
              :rules="rules.username"
              autocomplete="username"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              name="password"
              v-model="credentials.password"
              append-icon="lock"
              type="password"
              :rules="rules.password"
              autocomplete="current-password"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text to="/login-help">Forgot Password</v-btn>
            <v-btn type="submit" :disabled="!valid" color="primary" class="mr-4">Login</v-btn>
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
        //account: [v => !!v || 'Account is required'],
        username: [v => !!v || 'Username is required'],
        password: [v => !!v || 'Password is required']
      }
    }
  },
  methods: {
    onSubmit(account, username, password) {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.$store.dispatch(LOGIN, { account, username, password }).then(() => this.$router.push({ name: 'home' }))
      //.then(() => this.$router.push({ name: 'welcome' }))
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
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
