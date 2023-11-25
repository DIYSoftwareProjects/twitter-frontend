import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import '@fortawesome/fontawesome-free/css/all.css'
import firebase from 'firebase/compat/app'
import VueCookies from 'vue-cookies'

const firebaseConfig = {
  apiKey: "AIzaSyCpk6CsM0sOw13gfPXaxl0FAWlmyHO1zB8",
  authDomain: "twitter-840da.firebaseapp.com",
  projectId: "twitter-840da",
  storageBucket: "twitter-840da.appspot.com",
  messagingSenderId: "629450772611",
  appId: "1:629450772611:web:72ec6c9b9cba3b291c0bb6",
  measurementId: "G-WY7ETZCSGG"
};
firebase.initializeApp(firebaseConfig)

const app = createApp(App)
app.use(store)
app.use(router)

router.beforeEach((to, from, next) => {
  const isAuthenticated = VueCookies.get('isAuthenticated')
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})


app.mount('#app')

