import axios from 'axios'

const API_KEY = import.meta.env.VITE_VUE_APP_API_KEY_FIREBASE

const authApi = {
  signIn(data) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    return axios.post(url, data)
  },

  refreshToken(data) {
    const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`

    return axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export default authApi
