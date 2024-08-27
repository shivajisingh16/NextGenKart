import React from 'react'
import { withUserHoc } from '../Hoc/WithContextHocCreater';
import { Navigate } from 'react-router-dom';

function UserRoute({user,children}) {
 if(!user){
  return <Navigate to="/login" />
 }
 return children;
}

export default withUserHoc(UserRoute);