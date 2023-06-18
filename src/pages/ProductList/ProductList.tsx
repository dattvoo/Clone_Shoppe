import React from 'react'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import Product from './Product/Product'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../apis/product.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  console.log(queryParams);

  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProductList(queryParams)
    }
  })
  console.log('Data  ve` lang', data);

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <Product key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
