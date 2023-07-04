import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFormNameId, rateSale } from '../../utils/utils'
import InputNumber from '../../components/InputNumber/InputNumber'
import { ProductListConfig } from '../../types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from '../../components/QuantityController'

export default function ProductDetail() {
  const { nameId } = useParams()
  const [buyCount, setBuyCount] = useState(1)
  const id = getIdFormNameId(nameId as string)
  const { data: productDetail } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetail?.data.data
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  // Get Product tuong tu
  const queryConfig: ProductListConfig = { page: 1, limit: 20, category: product?.category._id }
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 5 * 60 * 1000
  })
  // console.log(product?.category);

  const imageRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (product && product.image.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])
  const chooseImageActive = (img: string) => {
    setActiveImage(img)
  }

  if (!product) return null
  const handleNext = () => {
    if (currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
      // setActiveImage(currentIndexImages[0].toString())
    }
  }
  const handlePrev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
      // setActiveImage(currentIndexImages[0].toString())
    }
  }
  // Khi Hover vao Image ta se lay gia tri goc' cua Image
  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const domRect = e.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    const { offsetX, offsetY } = e.nativeEvent
    const top = offsetX * (1 - naturalHeight / domRect.height)
    const left = offsetY * (1 - naturalWidth / domRect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    // Luc Css minh da~ set Max-Width: 100%, neen khi hover ta se set lai Max-Width
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              {/* Them over-flow Hidden de khi ta hover vao anh se khong bi tran ra ngoai */}
              <div
                className='relative w-full overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  className='pointer-events-none absolute left-0 top-0 h-full bg-white object-cover hover:cursor-zoom-in'
                  src={activeImage}
                  alt={product.name}
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white '
                  onClick={handlePrev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'
                    />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='relative w-full pt-[100%]'
                      key={img}
                      onMouseEnter={() => {
                        chooseImageActive(img)
                      }}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white '
                  onClick={() => handleNext()}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange text-orange h-4 2-4'
                    nonActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div className=''>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Da ban</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange '>₫{formatCurrency(product.price)}</div>
                <div className='break ml-4 whitespace-nowrap rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white '>
                  {rateSale(product.price_before_discount, product.price)} giam
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>So Luong</div>
                {/* Quantity Controller */}
                <QuantityController
                  value={buyCount}
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} co san</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm  hover:bg-orange/10'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-[10px] h-4 w-4 fill-current  text-orange '
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  Them vao Gio Hang
                </button>
                <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rouned bg-gray-50 p-4 text-lg capitalize text-slate-700'> Mo Ta San Pham</div>
          <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
            <div
              className=''
              dangerouslySetInnerHTML={{
                __html: product.description
              }}
            ></div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='container'>
            <h1 className='capitalize '>San Pham tuong tu</h1>
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {productData &&
                productData.data.data.products.map((product) => <Product key={product._id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
