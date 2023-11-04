import getters from './getters'
import actions from './actions'
import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      userId: localStorage.getItem('userId') || null,
      refreshToken: localStorage.getItem('refreshToken') || null
    }
  },
  getters,
  actions
})

export default useAuthStore
