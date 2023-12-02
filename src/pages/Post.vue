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

      <div class="post-actions">
        <div class="like-action">
          <i :class="getLikeIcon(tweet.hasLiked)" @click="likePost(tweet.id, tweet.hasLiked)"></i>
          <span class="like-count">{{ tweet.likeCount }}</span>
        </div>
        <div class="comment-action">
          <router-link class="no-router-link-styling" :to="'/post-detail/' + tweet.id">
            <i class="fa-regular fa-comment"></i>
            <span class="comment-count">{{ tweet.commentCount }}</span>
          </router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import defaultProfilePicture from '../assets/profile/bear.png'

export default {
  name: 'PostPage',
  props: ['tweet', 'reloadTweet'],
  methods: {
    getLikeIcon(hasLiked) {
      if (hasLiked) {
        return "fa-solid fa-heart"
      }
      return "fa-regular fa-heart"
    },
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
    likePost(tweetId, like) {
      this.$store.dispatch('feed/likePost', {
        tweetId: tweetId,
        like: !like
      }).then(() => {
        this.reloadTweet()
      }).catch(error => {
        window.alert(error)
      })
    }
  }
}
</script>