import React, { InputHTMLAttributes, forwardRef, useState } from 'react'
import { UseControllerProps, useController, FieldValues, FieldPath } from 'react-hook-form'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}
// ta se ket hop them type cua InputNumber de lay {type cua inout}
// Neu xem lai khong hieu tim lai video 196
function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProps) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)

  // Neu nguoi dung khong nhap value thi ta se co value khoi tao.
  const [localValue, setLocalValue] = useState<string>(field.value as string)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = e.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      // Cap nhat Local state
      setLocalValue(valueFromInput)
      // Goi field.onChange de cap nhat state trong react-hook-form
      field.onChange(e)
      // Thuc thi Onchange Callback tu ben ngoai ruye nvao props
      onChange && onChange(e)
    }
  }

  return (
    <div className=''>
      <input
        {...rest}
        {...field}
        className={classNameInput}
        onChange={handleChange}
        value={field.value || localValue}
      />
      {fieldState.error?.message && <div className={classNameError}>{fieldState.error?.message}</div>}
    </div>
  )
}
export default InputV2
