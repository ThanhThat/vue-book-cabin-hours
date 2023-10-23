import axiosClient from '../axiosClient'

const SCHEMA = 'bookings'

const bookingsApi = {
  getAll() {
    const url = `${SCHEMA}.json`
    return axiosClient.get(url)
  },

  update(data) {
    const url = `/${SCHEMA}/${data.id}.json`
    return axiosClient.patch(url, data)
  },

  deleteOne(data) {
    const url = `/${SCHEMA}/${data.id}.json`
    return axiosClient.delete(url, data)
  }
}

export default bookingsApi
