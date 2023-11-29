<template>
  <div class="profile-section">
    <div class="profile-header-section">
      <div class="profile-banner-box">
        <img class="profile-banner-image" :src="bannerPicture">
      </div>

      <div class="profile-image-box">
        <img class="profile-image" :src="profilePicture">
      </div>
    </div>

    <div v-if="isCurrentUser" class="profile-action">
      <button class="profile-action-button" @click="openModal">Edit</button>
    </div>

    <div v-if="!isCurrentUser && !isFollowing" class="profile-action">
      <buttom class="profile-action-button" @click="follow">Follow</buttom>
    </div>

    <div v-if="!isCurrentUser && isFollowing" class="profile-action">
      <buttom class="profile-action-button" @click="unfollow">Unfollow</buttom>
    </div>

    <div class="profile-detail-section" v-if="userData">
      <h2 v-text="userData.username"></h2>
      <p class="bio" v-text="userData.bio"></p>
      <div class="joined-info">
        <i class="fa-solid fa-calendar-days"></i>
        <p class="joined-date" v-text="getJoinedDate(userData.registeredDate)"></p>
      </div>

      <div class="follow-info">
        <div class="follower-count">
          <span class="follower-number" v-text="userData.followers"></span> followers
        </div>

        <div class="following-count">
          <span class="follower-number" v-text="userData.followees"></span> followees
        </div>
      </div>
    </div>

    <div class="modal" v-if="isPopUpOpen">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit Profile</h2>
          <span class="close-icon" @click="closeModal">&times;</span>
        </div>
        <div class="modal-body">
          <label for="profilePicture">Profile Picture</label>
          <input type="file" accept="image/*" id="profilePicture" ref="profilePictureInput" @change="handleProfilePictureUpload">
          <label for="bannerPicture">Banner Picture</label>
          <input type="file" accept="image/*" id="bannerPicture" ref="bannerPictureInput" @change="handleBannerPictureUpload">
          <label for="bio">Bio:</label>
          <textarea id="bio" placeholder="Enter your bio" v-model="bio"></textarea>
        </div>
        <div class="modal-footer">
          <button class="save-button" @click="updateProfile">Save</button>
          <button class="close-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import defaultBannerPicture from '../assets/banner/Mountain.jpg'
import defaultProfilePicture from '../assets/profile/bear.png'
import VueCookies from 'vue-cookies'

export default {
  props: ['userId'],
  name: 'ProfilePage',
  data() {
    return {
      profilePicture: defaultProfilePicture,
      bannerPicture: defaultBannerPicture,
      isPopUpOpen: false,
      bio: '',
      bannerPictureUpload: null,
      profilePictureUpload: null,
      profileUserId: '',
      following: false
    }
  },
  created() {
    this.loadUserData()
  },
  computed: {
    userData() {
      return this.$store.getters['user/userData']
    },
    isCurrentUser() {
      return VueCookies.get('userId') == this.profileUserId
    },
    isFollowing() {
      return this.following
    }
  },
  watch: {
    userData: function(data) {
      if (data && data.bannerImage) {
        this.bannerPicture = `data:image/jpeg;base64,${data.bannerImage}`;
      }

      if (data && data.profileImage) {
        this.profilePicture = `data:image/jpeg;base64,${data.profileImage}`;
      }
      this.profileUserId = data.id
      this.following = data.following
    },
    userId: function() {
      this.loadUserData()
    }
  },
  methods: {
    loadUserData() {
      try {
        this.$store.dispatch('user/loadUserData', {
          userId: this.userId
        })
      } catch (error) {
        window.alert(error)
      }
    },
    getJoinedDate(registeredDate) {
      const options = { year: 'numeric', month: 'long' }
      const formattedDate = new Date(registeredDate).toLocaleDateString(undefined, options)
      return 'Joined ' + formattedDate
    },
    openModal() {
      this.isPopUpOpen = true
    },
    closeModal() {
      this.isPopUpOpen = false
      this.resetForm()
    },
    handleBannerPictureUpload() {
      this.bannerPictureUpload = this.$refs.bannerPictureInput.files[0]
    },
    handleProfilePictureUpload() {
      this.profilePictureUpload = this.$refs.profilePictureInput.files[0]
    },
    resetForm() {
      this.bio = ''
      this.bannerPictureUpload = null
      this.profilePictureUpload = null
    },
    updateProfile() {
      this.$store.dispatch('user/updateProfile', {
        profilePicture: this.profilePictureUpload,
        bannerPicture: this.bannerPictureUpload,
        bio: this.bio
      }).then(() => {
        this.closeModal()
        this.loadUserData()
      }).catch(error => {
        window.alert(error)
      })
    },
    follow() {
      this.$store.dispatch('user/follow', {
        followerUserId: this.profileUserId,
      }).then(() => {
        this.loadUserData()
      }).catch(error => {
        window.alert(error)
      })
    },
    unfollow() {
      this.$store.dispatch('user/unfollow', {
        followerUserId: this.profileUserId,
      }).then(() => {
        this.loadUserData()
      }).catch(error => {
        window.alert(error)
      })
    }
  }
}

</script>