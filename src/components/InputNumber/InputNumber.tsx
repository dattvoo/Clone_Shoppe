import React, { InputHTMLAttributes, forwardRef, useState } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  // Neu nguoi dung khong nhap value thi ta se co value khoi tao.
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '')) {
      // Thuc thi Onchange Callback tu ben ngoai ruye nvao props
      onChange && onChange(e)
      // setLocalValue()
    }
  }

  return (
    <div className=''>
      <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} value={value || localValue} />
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
})
export default InputNumber
