import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'
import Signup from '../pages/Signup.vue'
import Login from '../pages/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Feed,
      meta: { requiresAuth: true }
    },
    {
      path: '/feed',
      component: Feed,
      meta: { requiresAuth: true }
    },
    {
      path: "/signup",
      component: Signup,
      meta: { requiresAuth: false }
    },
    {
      path: "/login",
      component: Login,
      meta: { requiresAuth: false }
    }
  ]
})

export default router