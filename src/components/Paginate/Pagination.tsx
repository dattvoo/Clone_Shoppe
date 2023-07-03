import classNames from 'classnames'
import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import path from '../../constants/path'
import { QueryConfig } from '../../hooks/useQueryConfig'

type IProps = {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: IProps) {
  const currentPage = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm ' key={index}>
            ...
          </button>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm ' key={index}>
            ...
          </button>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // Render ... button
        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotBefore(index)
        } else if (currentPage > RANGE * 2 + 1 && currentPage < pageSize - RANGE * 2) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (currentPage >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
          return renderDotBefore(index)
        }
        // Render number button
        return (
          <Link
            className={classNames('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === currentPage,
              'border-transparent': pageNumber !== currentPage
            })}
            key={index}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
          // onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <Link
        className={`mx-2 rounded border bg-white px-3 py-2 shadow-sm ${currentPage === 1 ? 'cursor-not-allowed disabled' : ''}`}
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            page: (Number(queryConfig.page) - 1).toString()
          }).toString()
        }}
      >
        Prev
      </Link>
      {renderPagination()}
      <Link
        className={`mx-2 rounded border bg-white px-3 py-2 shadow-sm ${currentPage === pageSize ? 'cursor-not-allowed disabled:' : ''
          }`}
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            page: (Number(queryConfig.page) + 1).toString()
          }).toString()
        }}
      >
        Next
      </Link>
    </div>
  )
}
