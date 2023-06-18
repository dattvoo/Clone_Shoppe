import { User } from '../types/user.type'

export const saveAccessTokenToLS = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}
export const clearAccessToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}
export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
