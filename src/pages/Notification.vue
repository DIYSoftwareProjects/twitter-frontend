<template>
  <div class="notification-section">
    <h1>Notifications</h1>
    <div class="notification" v-for="notification in notifications" :key="notification.id">
      <div>
        <img class="twitter-logo" src="../assets/twitter-logo.png">
      </div>
      <div class="notification-content">
        <router-link class="no-router-link-styling" :to="'/post-detail/' + notification.postId">
          {{ notification.message }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationPage',
  created() {
    this.loadNotifications()
  },
  computed: {
    notifications() {
      return this.$store.getters['user/notifications']
    }
  },
  methods: {
    loadNotifications() {
      try {
        this.$store.dispatch('user/loadNotifications', {});
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>