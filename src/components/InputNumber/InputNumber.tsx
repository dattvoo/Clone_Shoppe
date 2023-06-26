import React, { InputHTMLAttributes, forwardRef } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  ref?: React.Ref<HTMLInputElement>
}

const InputNumber = forwardRef<HTMLInputElement, IProps>(function InputNumberInner(
  {
    errorMessage,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }

  return (
    <div className=''>
      <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} />
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
})
export default InputNumber