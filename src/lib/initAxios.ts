import axios from 'axios'

export const initAxios = (): void => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_REST_END_POINT
  axios.defaults.withCredentials = true
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common['Accept'] = 'application/json'
}
