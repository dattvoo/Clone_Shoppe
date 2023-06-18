import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
// import authApi from '../../apis/auth.api' '../../apis/auth.api'
import Input from '../../components/Input'
import { TFormSchema, rules, schema } from '../../utils/rules'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import authApi from '../../apis/auth.api'
export interface IForm {
  email: string
  password: string
  confirm_password: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues
  } = useForm<TFormSchema>({ resolver: yupResolver(schema) })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<TFormSchema, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<IForm, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<IForm, 'confirm_password'>, {
                message: formError[key as keyof Omit<IForm, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'server'
          //   })
          // }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <p className='text-2xl'>Đăng Kí</p>
              <Input
                name='email'
                className='mt-8'
                register={register}
                // rules={rules.email}
                type='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                className='mt-2'
                register={register}
                // rules={rules.password}
                type='password'
                placeholder='Password'
                errorMessage={errors.password?.message}
              />
              <div className='mt-2'>
                <input
                  {...register('confirm_password', {
                    ...rules.confirm_password,
                    validate: (value) => value === getValues('password') || 'Password and Confirm Password not match!'
                  })}
                  type='password'
                  autoComplete='on'
                  placeholder='Confirm Password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full uppercase bg-red-500 text-center py-4 text-white rounded-sm  hover:bg-red-600'
                >
                  Đăng Nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-sm text-slate-500'>Ban da co tai khoan?</span>
                <Link to='/login' className='text-sm  text-red-400 ml-1'>
                  Dang Nhap
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
