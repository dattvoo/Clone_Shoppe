import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthRespone } from '../types/auth.type'
import { clearAccessToken, getAccessTokenFromLS, saveAccessTokenToLS, setProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Add Access_Token to Header when we request server
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a respone interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === 'register') {
          const data = response.data as AuthRespone
          this.accessToken = (response.data as AuthRespone).data.access_token
          saveAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccessToken()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
