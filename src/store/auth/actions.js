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

    console.log(response)
    localStorage.setItem('refreshToken', response.data.refreshToken)
  },

  async verifyRefreshToken() {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken')
    }
    const response = await authApi.refreshToken(data)

    console.log(response)

    if (response.status !== 200) {
      localStorage.removeItem('refreshToken')
      this.refreshToken = null
    } else if (response.status === 200) {
      localStorage.setItem('refreshToken', response.data.refresh_token)
      this.refreshToken = response.data.refresh_token
    }
  }
}
