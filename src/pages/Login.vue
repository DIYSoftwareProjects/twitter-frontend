<template>
  <div class="login-container">
    <h1>Log in</h1>
    <div class="login-field">
      <span class="login-span">
        Email
      </span>
      <input class="login-input" type="text" v-model="email" required>
    </div>

    <div class="login-field">
      <span class="login-span">
        Password
      </span>
      <input class="login-input" type="password" v-model="password" required>
    </div>

    <div class="login-field">
      <button class="login-button" type="submit" @click="login">Log in</button>
    </div>

    <div class="sign-up">
      <p>Don't have an account?</p>
      <router-link to="/signup">Sign up</router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/feed')
      }).catch(error => {
        window.alert(error)
      })
    }
  }
}
</script>