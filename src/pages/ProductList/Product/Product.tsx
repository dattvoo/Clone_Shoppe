import { Link } from 'react-router-dom'
import { Product as ProductTpye } from '../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '../../../utils/utils'

interface IProps {
  product: ProductTpye
}

export default function Product({ product }: IProps) {
  return (
    <Link to='/'>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden '>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span>{product.price_before_discount}</span>
              <span className='text-xs'>đ</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span>{formatCurrency(product.price)}</span>
              <span className='text-xs'>đ</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <div className='flex items-center'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div className='relative' key={index}>
                    <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                      <svg
                        enableBackground='new 0 0 15 15'
                        viewBox='0 0 15 15'
                        x={0}
                        y={0}
                        className='w-3 h-3 fill-yellow-500 text-yellow-300'
                      >
                        <polygon
                          points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                      </svg>
                    </div>
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='h-3 w-3 fill-current text-gray-300'
                    >
                      <polygon
                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeMiterlimit={10}
                      />
                    </svg>
                  </div>
                ))}
            </div>
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Da ban</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
