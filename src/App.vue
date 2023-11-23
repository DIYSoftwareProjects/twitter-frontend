<template>
  <div class="twitter">
    <SideBar />
    <div class="content-section">
      <router-view v-slot="slotProps">
        <component :is="slotProps.Component"></component>
      </router-view>
    </div>
    <PeopleSuggestion />
  </div>
</template>

<script>
import PeopleSuggestion from './components/PeopleSuggestion.vue';
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',
  components: {
    PeopleSuggestion, 
    SideBar
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
