import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'
import Signup from '../pages/Signup.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Feed
    },
    {
      path: '/feed',
      component: Feed
    },
    {
      path: "/signup",
      component: Signup
    }
  ]
})

export default router