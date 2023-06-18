import React, { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  errorMessage,
  name,
  placeholder,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'
}: IProps) {
  const registerResult = register && name ? { ...register(name) } : {}
  return (
    <div className=''>
      <input {...registerResult} type={type} placeholder={placeholder} className={classNameInput} />
      {errorMessage &&
        <div className={classNameError}>{errorMessage}</div>
      }
    </div>
  )
}
