import React, { useContext } from "react";
import { userContext } from "../contexts"; 
import { cartContext } from "../contexts"; 


function WithContextHocCreater(provider) {
  return function withContextHoc(IncomingComponent){
    return function OutgoingComponent(props) {
      const contextData = useContext(provider);
      return <IncomingComponent {...props} {...contextData} />;
    };
  };
  
}

export default WithContextHocCreater;
export const withUserHoc= WithContextHocCreater(userContext);
export const withCartHoc= WithContextHocCreater(cartContext);