<template>
  <div class="singup-container">
    <h1>Sign Up</h1>
    <div class="signup-field">
      <span class="signup-span">
        Email
      </span>
      <input class="signup-input" type="text" required>
    </div>

    <div class="signup-field">
      <span class="signup-span">
        Username
      </span>
      <input class="signup-input" type="text" required>
    </div>

    <div class="signup-field">
      <span class="signup-span">
        Password
      </span>
      <input class="signup-input" type="password" required>
    </div>

    <div class="signup-field">
      <button class="signup-botton" type="submit">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpPage'
}
</script>