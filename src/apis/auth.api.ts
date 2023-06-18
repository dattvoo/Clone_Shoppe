import { AuthRespone } from '../types/auth.type'
import http from '../utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthRespone>('/register', body)
export const loginAccount = (body: { email: string; password: string }) => http.post<AuthRespone>('/login', body)
export const logout = () => http.post('/logout')
