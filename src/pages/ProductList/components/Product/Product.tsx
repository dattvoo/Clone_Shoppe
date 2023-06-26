import { Link } from 'react-router-dom'
import { Product as ProductTpye } from '../../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '../../../../utils/utils'
import ProductRating from '../../../../components/ProductRating'

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
            <ProductRating rating={product.rating} />
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
