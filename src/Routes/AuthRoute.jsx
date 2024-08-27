import React from 'react'
import { withUserHoc } from '../Hoc/WithContextHocCreater';
import { Navigate } from 'react-router-dom'

function AuthRoute({user,children}) {
 if(user){
  return <Navigate to="/" />
 }
 return children;
}

export default withUserHoc(AuthRoute)