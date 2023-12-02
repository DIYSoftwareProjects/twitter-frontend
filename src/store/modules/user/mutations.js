export default {
  setUserData(state, payload) {
    state.user = payload
  },
  setCurrentUserData(state, payload) {
    state.currentUserData = payload
  },
  setUsers(state, payload) {
    state.users = payload
  },
  setNotifications(state, payload) {
    state.notifications = payload
  }
}