import axios from 'axios'

const API_KEY = import.meta.env.VITE_VUE_APP_API_KEY_FIREBASE

const authApi = {
  signIn(data) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    return axios.post(url, data)
  }
}

export default authApi
