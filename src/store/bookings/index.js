import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

const useBookingsStore = defineStore('bookings', {
  state: () => ({
    bookingList: []
  }),

  getters,
  actions
})

export default useBookingsStore
