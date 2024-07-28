import React from 'react'
import Header from './components/Header'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import WithUserHoc from './Hoc/WithUserHoc'

function Layout({totalCount,user}) {
  if(!user)return <Navigate to='/login' />
  return (
    <>
    <Header totalCount={totalCount}/>
    <div className="mt-24"></div>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default WithUserHoc(Layout)