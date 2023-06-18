import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import { TLoginForm, schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from '../../apis/auth.api'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import { AppContext } from '../../context/app.context'
import Button from '../../components/Button'

const loginSchema = schema.omit(['confirm_password'])
export default function Login() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<TLoginForm>({ resolver: yupResolver(loginSchema) })
  const loginAccountMutation = useMutation({
    mutationFn: (body: TLoginForm) => loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<TLoginForm>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof TLoginForm, {
                message: formError[key as keyof TLoginForm],
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
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
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
                  className='w-full uppercase bg-red-500 text-center py-4 text-white rounded-sm  hover:bg-red-600'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-sm text-slate-500'>Ban co tai khoan chua?</span>
                <Link to='/register' className='text-sm  text-red-400 ml-1'>
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
