import React from 'react'
import { QueryConfig } from '../../ProductList'
import { sortBy } from '../../../../constants/product'
import classNames from 'classnames'
import { ProductListConfig } from '../../../../types/product.type'
import { Link, createSearchParams } from 'react-router-dom'
import path from '../../../../constants/path'

type TProps = {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: TProps) {
  const { sort_by = sortBy.createdAt } = queryConfig
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className=''>Sap xep theo</div>
          <Link
            className={classNames('h-8 px-4  text-sm capitalize leading-[2.2]', {
              'rounded-sm bg-orange text-center text-sm text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'rounded-sm bg-white text-center text-sm text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                sort_by: sortBy.createdAt
              }).toString()
            }}
          >
            Moi Nhat
          </Link>
          <Link
            className={classNames('h-8 px-4  text-sm capitalize leading-[2.2]', {
              'rounded-sm bg-orange text-center text-sm text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'rounded-sm bg-white text-center text-sm text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                sort_by: sortBy.view
              }).toString()
            }}
          >
            Pho Bien
          </Link>

          <Link
            className={classNames('h-8 px-4  text-sm capitalize leading-[2.2]', {
              'rounded-sm bg-orange text-center text-sm text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'rounded-sm bg-white text-center text-sm text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                sort_by: sortBy.sold
              }).toString()
            }}
          >
            Ban Chay
          </Link>
          <select
            className='capitallize h-8 bg-white px-4 text-left text-sm text-black hover:bg-slate-100'
            defaultValue='Gia'
          >
            {/* <option value='' disabled>
              Gia
            </option> */}
            <option value='price:asc'>Gia: Thap den cao</option>
            <option value='price:desc'>Gia: Cao den thap</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div className=''>
            <span className='text-orange'>1</span>
            <span className=''>/2</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-8 rounded-br-sm rounded-tr-sm bg-white px-3 hover:bg-slate-100 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
