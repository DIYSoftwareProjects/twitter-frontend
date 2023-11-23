import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'

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
    }
  ]
})

export default router