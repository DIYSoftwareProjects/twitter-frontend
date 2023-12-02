export default {
  setFeedTweets(state, payload) {
    state.feedTweets = payload
  },
  setTweet(state, payload) {
    state.tweet = payload
  },
  setComments(state, payload) {
    state.comments = payload
  }
}