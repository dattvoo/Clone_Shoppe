import { AuthRespone } from '../types/auth.type'
import http from '../utils/http'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthRespone>('/register', body),
  loginAccount: (body: { email: string; password: string }) => http.post<AuthRespone>('/login', body),
  logout: () => http.post('/logout')
}

export default authApi
