import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'
import Signup from '../pages/Signup.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import PostDetail from '../pages/PostDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: "Home",
      component: Feed,
      meta: { requiresAuth: true }
    },
    {
      path: '/feed',
      name: "Feed",
      component: Feed,
      meta: { requiresAuth: true }
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
      meta: { requiresAuth: false }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: "/profile/:userId",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: true },
      props: true
    }, 
    {
      path: "/post-detail/:postId",
      name: "PostDetail",
      component: PostDetail,
      props: true,
      meta: { requiresAuth: true }
    }
  ]
})

export default router