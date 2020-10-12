// @flow
import axios from 'axios'
import {environment} from '../env'

const apiRequest = axios.create({
  baseURL: 'https://api.appmetrica.yandex.ru',
  headers: {
    Accept: 'application/json',
  },
})

apiRequest.interceptors.request.use(
  config => {
    const token = environment.accessToken
    if (token) {
      config.headers.Authorization = 'OAuth ' + token
    }

    return config
  },
  error => Promise.reject(error)
)

export {apiRequest}
