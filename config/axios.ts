import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.172:3000',
  timeout: 1000
})
