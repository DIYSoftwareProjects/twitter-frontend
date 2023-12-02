import { createStore } from 'vuex'

import userModule from './modules/user/index.js'
import feedModule from './modules/feed/index.js'

const store = createStore({
  modules: {
    user: userModule,
    feed: feedModule
  }
})

export default store