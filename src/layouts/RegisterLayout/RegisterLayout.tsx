import React from 'react'
import RegisterHeader from '../../components/RegisterHeader'
import Footer from '../../components/Footer'

interface Iprops {
  children: React.ReactNode
}

export default function RegisterLayout({ children }: Iprops) {
  return (
    <div className='123'>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
