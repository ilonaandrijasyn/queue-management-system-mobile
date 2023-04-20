import axios from 'axios'
import { API_URL } from '../helpers/consts'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000
})
