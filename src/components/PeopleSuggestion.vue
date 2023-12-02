<template>
  <div class="people-suggestion">
    <h2>Who to follow</h2>
    <div>
      <div class="suggestion-box" v-for="user in users" :key="user.id">
        <div>
          <img class="profile-picture" :src="getProfilePicture(user)">
        </div>
        <div class="suggestion-name">
          <router-link class="no-router-link-styling" :to="`/profile/${user.id}`">
            {{ user.username }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultProfilePicture from '../assets/profile/bear.png'

export default {
  computed: {
    users() {
      return this.$store.getters['user/users']
    }
  },
  created() {
    this.fetchAllUsers()
  },
  methods: {
    fetchAllUsers() {
      try {
        this.$store.dispatch('user/getAllUsers', {})
      } catch (error) {
        window.alert(error)
      }
    },
    getProfilePicture(userData) {
      if (userData && userData.profileImage) {
        return `data:image/jpeg;base64,${userData.profileImage}`;
      } else {
        return defaultProfilePicture
      }
    },
  }
}

</script>