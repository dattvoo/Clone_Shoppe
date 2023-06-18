import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
interface IProps {
  type: React.HTMLInputTypeAttribute
  name: string
  errorMessage?: string
  placeholder?: string
  className: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({ type, errorMessage, name, placeholder, register, rules, className }: IProps) {
  return (
    <div className={className}>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>

    </div>
  )
}
