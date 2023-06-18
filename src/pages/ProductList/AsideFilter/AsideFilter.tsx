import React from 'react'
import { Link } from 'react-router-dom'
import path from '../../../constants/path'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='capitalize font-bold'>
        Tat ca danh muc
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ul>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-orange font-semibold'>
            <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
              <polygon points='4 3.5 0 0 0 7' />
            </svg>
            Thoi Trang Nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 '>
            Thoi trang Nam
          </Link>
        </li>
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='w-3 h-4 fill-current stroke-current mr-3'
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
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className="my-5">
        <div className="">Khoan Gia</div>
        <form className='mt-2'>
          <div className="flex items-start">
            <Input
              type='text'
              // className='grow'
              name='from'
              placeholder='Tu'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
            <div className="mx-2 mt-2 shrink-0">-</div>
            <Input
              type='text'
              // className='grow'
              name='from'
              placeholder='Den'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange  mt-4'>Ap Dung</Button>
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
