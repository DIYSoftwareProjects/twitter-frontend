import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import VueCookies from 'vue-cookies'

export default {
  async register(context, payload) {
    const registerRequest = {
      email: payload.email,
      username: payload.username,
      password: payload.password
    }

    const response = await fetch(
      `http://localhost:8080/users/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerRequest)
      }
    )

    if (!response.ok) {
      throw new Error("Registration failed")
    }
  },
  async login(context, payload) {
    const auth = getAuth()
    const { user } = await signInWithEmailAndPassword(auth, payload.email, payload.password)
    const authToken = await user.getIdToken()

    const response = await fetch(
      `http://localhost:8080/users/detail/token`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error("Failed to get user details")
    }

    const responseData = await response.json()
    VueCookies.set('bearerToken', `Bearer ${authToken}`, '7d')
    VueCookies.set('userId', responseData.id, '7d')
    VueCookies.set('isAuthenticated', true)
  },
  loadUserData(context, payload) {
    fetch(`http://localhost:8080/users/detail/${payload.userId}`, {
      method: 'GET',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load user data")
      }
      response.json().then((responseData) => {
        context.commit('setUserData', responseData)
      })
    }).catch(() => {
      throw new Error("Failed to load user data")
    })
  },
  updateProfile(context, data) {
    const formData = new FormData()
    formData.append('bannerPicture', data.bannerPicture)
    formData.append('profilePicture', data.profilePicture)
    formData.append('bio', data.bio)

    return fetch('http://localhost:8080/users', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: VueCookies.get('bearerToken')
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update profile")
      }
    }).catch(() => {
      throw new Error("Failed to update profile")
    })
  },
  follow(context, payload) {
    return fetch(`http://localhost:8080/follow/${payload.followerUserId}`, {
      method: 'POST',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to follow')
      }
    }).catch(() => {
      throw new Error("Failed to follow")
    })
  },
  unfollow(context, payload) {
    return fetch(`http://localhost:8080/follow/${payload.followerUserId}`, {
      method: 'DELETE',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to unfollow")
      }
    }).catch(() => {
      throw new Error("Failed to unfollow")
    })
  },
  loadCurrentUserData(context) {
    fetch('http://localhost:8080/users/detail/token', {
      method: 'GET',
      headers: {
        Authorization: VueCookies.get('bearerToken'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('failed to load current user data')
      }
      response.json().then((responseData) => {
        context.commit('setCurrentUserData', responseData)
      })
    }).catch(() => {
      throw new Error('failed to load current user data')
    })
  },
  getAllUsers(context) {
    fetch('http://localhost:8080/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load all users')
      }
      response.json().then((responseData) => {
        context.commit('setUsers', responseData)
      })
    }).catch(() => {
      throw new Error("Failed to load all users")
    })
  }
}