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
    </div>
  </div>
</template>