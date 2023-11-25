<template>
  <div class="singup-container">
    <h1>Sign Up</h1>
    <div class="signup-field">
      <span class="signup-span">
        Email
      </span>
      <input id="email" class="signup-input" type="text" v-model="email" required>
    </div>

    <div class="signup-field">
      <span class="signup-span">
        Username
      </span>
      <input id="username" class="signup-input" type="text" v-model="username" required>
    </div>

    <div class="signup-field">
      <span class="signup-span">
        Password
      </span>
      <input id="password" class="signup-input" type="password" v-model="password" required>
    </div>

    <div class="signup-field">
      <button class="signup-botton" type="submit" @click="register">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpPage',
  data() {
    return {
      email: "",
      password: "",
      username: ""
    }
  },
  methods: {
    register() {
      this.$store.dispatch('user/register', {
        email: this.email,
        password: this.password,
        username: this.username
      }).then(() => {
        this.$router.push('/login')
      }).catch(error => {
        window.alert(error)
      })
    }
  }
}
</script>