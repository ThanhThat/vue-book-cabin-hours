import authApi from '@/apis/models/authApi.js'

export default {
  async login(payload) {
    let response

    response = await authApi.signIn(payload)

    if (response?.status !== 200) {
      const error = new Error(response.message || 'login unsuccessful!')
      throw error
    }

    this.refreshToken = response.data.refreshToken
    localStorage.setItem('refreshToken', response.data.refreshToken)
  }
}
