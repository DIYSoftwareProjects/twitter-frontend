import VueCookies from "vue-cookies";

export default {
  createTweet(context, data) {
    const tweetData = {
      content: data.content,
    }

    return fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tweetData)
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to post a tweet!')
      }
    }).catch(() => {
      throw new Error('Failed to post a tweet!')
    })
  },
  loadFeedTweets(context) {
    fetch('http://localhost:8080/posts', {
      method: 'GET',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('failed to load tweets')
      }
      response.json().then((responseData) => {
        context.commit('setFeedTweets', responseData)
      })
    }).catch(() => {
      throw new Error('failed to load tweets')
    })
  }
}