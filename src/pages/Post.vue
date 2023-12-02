<template>
  <div class="post" v-if="tweet != null">
    <div>
      <img class="profile-picture" :src="getProfilePicture(tweet.profilePicture)">
    </div>
    <div class="post-info">
      <div class="post-header">
        <div class="post-username">
          <router-link class="no-router-link-styling" :to="`/profile/${tweet.userId}`">
            {{ tweet.username }}
          </router-link>
        </div>
        <div class="post-created-at">
          {{ getTimeAgo(tweet.createdAt) }}
        </div>
      </div>
      <div class="post-content">
        {{ tweet.content }}
      </div>
    </div>

  </div>
</template>

<script>
import defaultProfilePicture from '../assets/profile/bear.png'

export default {
  name: 'PostPage',
  props: ['tweet'],
  methods: {
    getTimeAgo(createdAt) {
      const now = new Date()
      const diffInMiliseconds = now - new Date(createdAt)

      const seconds = Math.floor(diffInMiliseconds / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      if (days > 0) {
        return days + 'd'
      } else if (hours > 0) {
        return hours % 24 + 'h'
      } else if (minutes > 0) {
        return minutes % 60 + 'm'
      } else if (seconds > 0) {
        return seconds % 60 + 's'
      }
      
      return ''
    },
    getProfilePicture(profileImage) {
      if (profileImage) {
        return `data:image/jpeg;base64,${profileImage}`;
      } else {
        return defaultProfilePicture
      }
    },
  }
}
</script>