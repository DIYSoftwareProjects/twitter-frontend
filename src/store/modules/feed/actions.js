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
  },
  likePost(context, data) {
    let method = data.like ? 'POST' : 'DELETE';

    return fetch(`http://localhost:8080/like/${data.tweetId}`, {
      method: method,
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to like a post')
      }
    }).catch(() => {
      throw new Error('Failed to like a post')
    })
  },
  getTweetById(context, payload) {
    fetch(`http://localhost:8080/posts/${payload.postId}`, {
      method: 'GET',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('failed to fetch tweet by ID')
      }
      response.json().then((responseData) => {
        context.commit('setTweet', responseData)
      })
    }).catch(() => {
      throw new Error('failed to fetch tweet by ID')
    })
  },
  getCommentsByPostId(context, payload) {
    fetch(`http://localhost:8080/comments/${payload.postId}`, {
      method: 'GET',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('failed to fetch comments by post ID')
      }
      response.json().then((responseData) => {
        context.commit('setComments', responseData)
      })
    }).catch(() => {
      throw new Error('failed to fetch comments by post ID')
    })
  },
  createComment(context, data) {
    const commentData = {
      comment: data.comment,
    }

    return fetch(`http://localhost:8080/comments/${data.postId}`, {
      method: 'POST',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add new comment')
      }
    }).catch(() => {
      throw new Error('Failed to add new comment')
    })
  },
  loadUserTweets(context, payload) {
    fetch(`http://localhost:8080/posts/users/${payload.userId}`, {
      method: 'GET',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('failed to fetch user tweets')
      }
      response.json().then((responseData) => {
        context.commit('setUserTweets', responseData)
      })
    }).catch(() => {
      throw new Error('failed to fetch user tweets')
    })
  },
}