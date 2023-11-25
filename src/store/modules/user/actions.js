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
  }
}