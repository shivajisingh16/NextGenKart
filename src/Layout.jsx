import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function Layout({totalCount}) {
  return (
    <>
    <Header totalCount={totalCount}/>
    <div className="mt-24"></div>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout