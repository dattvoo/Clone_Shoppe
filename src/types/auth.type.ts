import { User } from './user.type'
import { SuccessRepone } from './utils.type'
export type AuthRespone = SuccessRepone<{
  access_token: string
  expires: string
  user: User
}>
