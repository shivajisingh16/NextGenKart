import React from 'react'
import WithUserHoc from '../Hoc/WithUserHoc'
import { Navigate } from 'react-router-dom';

function UserRoute({user,children}) {
 if(!user){
  return <Navigate to="/login" />
 }
 return children;
}

export default WithUserHoc(UserRoute);