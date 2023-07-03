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
function testMinMaxPrice(this: yup.TestContext<yup.AnyObject>) {
  // const price_max = value
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
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
      .oneOf([yup.ref('password')], 'Confirm Password not Match'),
    price_min: yup.string().test({
      name: 'price-not-allowed',
      message: 'Price not allow',
      test: testMinMaxPrice
    }),
    price_max: yup.string().test({
      name: 'price-not-allowed',
      message: 'Price not allow',
      test: testMinMaxPrice
    }),
    name: yup.string().required('Ten San Pham Phai Bat Buoc:').trim()
  })
  .required()
const loginSchema = schema.omit(['confirm_password'])
export type TFormSchema = yup.InferType<typeof schema>
export type TLoginForm = yup.InferType<typeof loginSchema>
