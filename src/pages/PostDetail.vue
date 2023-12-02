<template>
  <div class="profile-section">
    <div class="posts">
      <Post :tweet="tweet" />
    </div>
    <div class="reply-tweet">
      <div class="reply-box">
        <div>
          <img class="profile-picture" :src="getProfilePicture(currentUserData)">
        </div>
        <textarea class="reply-textarea" v-model="comment" placeholder="Tweet your reply"></textarea>
      </div>
      <div class="reply-button-box">
        <button class="reply-button" @click="createComment">Reply</button>
      </div>
    </div>
    <div class="comments">
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <div>
          <img class="profile-picture" :src="getProfilePicture(comment)">
        </div>
        <div class="comment-info">
          <div class="comment-header">
            <div class="comment-username">
              <router-link class="no-router-link-styling" :to="`/profile/${comment.userId}`">
                {{ comment.username }}
              </router-link>
            </div>
            <div class="comment-created-at">
              {{ getTimeAgo(comment.createdAt) }}
            </div>
          </div>
          <div class="comment-content">
            {{ comment.comment }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from './Post.vue'
import defaultProfilePicture from '../assets/profile/bear.png'

export default {
  props: ['postId'],
  components: {
    Post,
  },
  data() {
    return {
      comment: ''
    }
  },
  created() {
    this.loadTweetById()
    this.loadCommentsByPostId()
    this.loadCurrentUserData()
  },
  computed: {
    tweet() {
      return this.$store.getters['feed/tweet']
    },
    comments() {
      return this.$store.getters['feed/comments']
    },
    currentUserData() {
      return this.$store.getters['user/currentUserData']
    }
  },
  methods: {
    loadTweetById() {
      try {
        this.$store.dispatch('feed/getTweetById', {
          postId: this.postId
        })
      } catch (error) {
        window.alert(error)
      }
    },
    createComment() {
      this.$store.dispatch('feed/createComment', {
        postId: this.postId,
        comment: this.comment
      }).then(() => {
        this.comment = ''
        this.loadTweetById()
        this.loadCommentsByPostId()
      }).catch(error => {
        window.alert(error)
      })
    },
    loadCommentsByPostId() {
      try {
        this.$store.dispatch('feed/getCommentsByPostId', {
          postId: this.postId
        })
      } catch(error) {
        window.alert(error)
      }
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
    getProfilePicture(comment) {
      if (comment && comment.profileImage) {
        return `data:image/jpeg;base64,${comment.profileImage}`;
      } else {
        return defaultProfilePicture
      }
    },
    loadCurrentUserData() {
      try {
        this.$store.dispatch('user/loadCurrentUserData', {})
      } catch(error) {
        window.alert(error)
      }
    },
  }
}
</script>