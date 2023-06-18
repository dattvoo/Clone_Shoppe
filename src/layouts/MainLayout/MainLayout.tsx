import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface IProps {
  children: React.ReactNode
}
export default function MainLayout({ children }: IProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
