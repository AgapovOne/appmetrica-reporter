// @flow
import axios from 'axios'
import {env} from 'process'

const apiRequest = axios.create({
  baseURL: 'https://api.appmetrica.yandex.ru',
  headers: {
    Accept: 'application/json',
  },
})

apiRequest.interceptors.request.use(
  config => {
    const token = env.TOKEN
    if (token) {
      config.headers.Authorization = 'OAuth ' + token
    }

    return config
  },
  error => Promise.reject(error)
)

export {apiRequest}
