import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL_FIREBASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
