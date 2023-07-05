/* eslint-disable prettier/prettier */
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
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  value,
  ...rest
}: IProps) {
  const registerResult = register && name ? { ...register(name, rules) } : {}
  // console.log("🚀 ~ file: Input.tsx:24 ~ registerResult:", registerResult)
  // con/sole.log('Value', value);
  // console.log('Rest', { ...rest });

  return (
    <div className={'relative ' + className}>
      <input {...registerResult} type={type} className={classNameInput} {...rest} />
      {errorMessage &&
        <div className={classNameError}>{errorMessage}</div>
      }
    </div>
  )
}
