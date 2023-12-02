<template>
  <div class="feed-section">
    <div class="create-tweet">
      <div class="tweet-box">
        <div>
          <img class="profile-picture" :src="getProfilePicture(currentUserData)">
        </div>
        <textarea class="tweet-textarea" v-model="content" placeholder="What's happening?"></textarea>
      </div>
      <div class="tweet-button-box">
        <button class="tweet-button" @click="createTweet">Tweet</button>
      </div>
    </div>
    <div class="posts">
      <div v-for="tweet in feedTweets" :key="tweet.id">
        <Post :tweet="tweet" />
      </div>
    </div>
  </div>
</template>

<script>
import defaultProfilePicture from '../assets/profile/bear.png'
import Post from './Post.vue'

export default {
  name: 'FeedPage',
  components : {
    Post
  },
  data() {
    return {
      content: ''
    }
  },
  created() {
    this.loadCurrentUserData();
    this.loadFeedTweets()
  },
  computed: {
    currentUserData() {
      return this.$store.getters['user/currentUserData']
    },
    feedTweets() {
      return this.$store.getters['feed/feedTweets']
    }
  },
  methods: {
    createTweet() {
      this.$store.dispatch('feed/createTweet', {
        content: this.content
      }).then(() => {
        this.content = ''
        this.loadFeedTweets()
      }).catch(error => {
        window.alert(error)
      })
    },
    getProfilePicture(userData) {
      if (userData && userData.profileImage) {
        return `data:image/jpeg;base64,${userData.profileImage}`;
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
    loadFeedTweets() {
      try {
        this.$store.dispatch('feed/loadFeedTweets', {})
      } catch (error) {
        window.alert(error)
      }
    }
  }
}
</script>