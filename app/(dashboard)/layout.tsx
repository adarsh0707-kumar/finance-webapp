
import React from 'react'
import { Header } from '@/components/Header'

type Props = {
  children: React.ReactNode
}

const DashboaardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className='px-3 lg:px-14'>{children}</main>
    </>
  )
}

export default DashboaardLayout
