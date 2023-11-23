<template>
  <div class="twitter">
    <div class="content-section">
      <router-view v-slot="slotProps">
        <component :is="slotProps.Component"></component>
      </router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  @import '@/styles/app.css';
  @import '@/styles/feed.css';
  @import '@/styles/login.css';
  @import '@/styles/notification.css';
  @import '@/styles/people_suggestion.css';
  @import '@/styles/post_detail.css';
  @import '@/styles/profile.css';
  @import '@/styles/global.css';
  @import '@/styles/sidebar.css';
  @import '@/styles/signup.css';
</style>
