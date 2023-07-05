import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import { TLoginForm, schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import { AppContext } from '../../context/app.context'
import Button from '../../components/Button'
import { setProfileToLS } from '../../utils/auth'

// const loginSchema = schema.omit(['confirm_password'])
type FormData = Pick<TLoginForm, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log('checkin')

    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfileToLS(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        console.log('asdasdasd')
        if (isAxiosUnprocessableEntityError<ErrorResponse<TLoginForm>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  // const value = watch()

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <p className='text-2xl'>Đăng Nhập</p>
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
                className='mt-3'
                register={register}
                // rules={rules.password}
                type='password'
                placeholder='Password'
                errorMessage={errors.password?.message}
              />

              <div className='mt-3'>
                <Button
                  type='submit'
                  onClick={onSubmit}
                  className='w-full rounded-sm bg-red-500 py-4 text-center uppercase text-white  hover:bg-red-600'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-sm text-slate-500'>Ban co tai khoan chua?</span>
                <Link to='/register' className='ml-1  text-sm text-red-400'>
                  Dang Ki
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
