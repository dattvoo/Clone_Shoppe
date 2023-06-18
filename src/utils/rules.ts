import { type RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'
type TRules = { [key in 'email' | 'password' | 'confirm_password']: RegisterOptions }
export const rules: TRules = {
  email: {
    required: {
      value: true,
      message: 'Email is required!'
    },
    pattern: {
      value: /(.+)@(.+){2,}\.(.+){2,}/,
      message: 'Invalid email'
    },
    minLength: {
      value: 5,
      message: 'Email length from 5-160 characters'
    },
    maxLength: {
      value: 160,
      message: 'Email length from 5-160 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    minLength: {
      value: 5,
      message: 'Password length from 5-160 characters'
    },
    maxLength: {
      value: 160,
      message: 'Password length from 5-160 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    minLength: {
      value: 5,
      message: 'Password length from 5-160 characters'
    },
    maxLength: {
      value: 160,
      message: 'Password length from 5-160 characters'
    }
  }
}
export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email')
      .min(5, 'Email length from 5-160 characters')
      .max(160, 'Email length from 5-160 characters'),
    password: yup.string().required('Password is required').min(5, 'Password lenght from 5-100 characters'),
    confirm_password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password lenght from 5-100 characters')
      .oneOf([yup.ref('password')], 'Confirm Password not Match')
  })
  .required()
const loginSchema = schema.omit(['confirm_password'])
export type TFormSchema = yup.InferType<typeof schema>
export type TLoginForm = yup.InferType<typeof loginSchema>
