import React from 'react'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import path from '../../../constants/path'
import Button from '../../../components/Button'
import { Category } from '../../../types/category.type'
import { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import InputNumber from '../../../components/InputNumber/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { TFormSchema, schema } from '../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefineField } from '../../../types/utils.type'
interface ICategory {
  categories: Category[]
  queryConfig: QueryConfig
}
// export type TFormData = {
//   price_min: string
//   price_max: string
// }
type TFormData = NoUndefineField<Pick<TFormSchema, 'price_min' | 'price_max'>>
const priceSchema = schema.pick(['price_min', 'price_max'])
export default function AsideFilter({ categories, queryConfig }: ICategory) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<TFormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })
  return (
    <div className='py-4'>
      <Link to={path.home} className='font-bold capitalize'>
        Tat ca danh muc
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2 ', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit='10'
            ></polyline>
          </g>
        </svg>
        Bo loc Tim Kiem
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='my-5'>
        <div className=''>Khoan Gia</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  placeholder='Tu'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )}
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  placeholder='Tu'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                />
              )}
            />
          </div>
          {errors && (
            <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600 text-red-700'>
              {errors.price_min?.message}
            </div>
          )}
          <Button className='mt-4 w-full bg-orange p-2 text-sm uppercase text-white  hover:bg-orange' type='submit'>
            Ap Dung
          </Button>
          <div className='my-4 h-[1px] bg-gray-300' />
          <Button
            // onClick={handleRemoveAll}
            className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
          >
            Xóa tất cả
          </Button>
        </form>
      </div>
    </div>
  )
}
