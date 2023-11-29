<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img class="twitter-logo" src="../assets/twitter-logo.png">
    </div>

    <div class="sidebar-nav">
      <div class="sidebar-link">
        <router-link class="sidebar-link-router" to="/feed">
          <i class="fa-solid fa-house sidebar-icon"></i>
          <span class="sidebar-text">Home</span>
        </router-link>
      </div>

      <div class="sidebar-link">
        <router-link class="sidebar-link-router" to="/profile/self">
          <i class="fa-solid fa-user sidebar-icon"></i>
          <span class="sidebar-text">Profile</span>
        </router-link>
      </div>

      <div class="sidebar-link">
        <div class="sidebar-link-router" @click="logout">
          <i class="fa-solid fa-right-from-bracket sidebar-icon"></i>
          <span class="sidebar-text">Logout</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"
import VueCookies from 'vue-cookies'

export default {
  methods: {
    async logout() {
      try {
        const auth = getAuth()
        signOut(auth).then(() => {
          VueCookies.remove('bearerToken')
          VueCookies.remove('userId')
          VueCookies.remove('isAuthenticated')
        }).catch((error) => {
          window.alert(error)
        })
        this.$router.push('/login')
      } catch (error) {
        window.alert(error)
      }
    }
  }
}

</script>