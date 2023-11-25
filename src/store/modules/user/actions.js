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
  }
}