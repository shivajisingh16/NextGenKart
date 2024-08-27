import axios from "axios"

export function getProducts({sortBy,sortType,search,page}){
  let params={}
  if(sortBy)params.sortBy=sortBy
  if(sortType)params.sortType=sortType
  if(search)params.search=search
  if(page)params.page=page
 return axios.get('https://myeasykart.codeyogi.io/products',{
  params,
 }).then((response)=>{
  return response.data;
 })
}
export function getProductsId(productid){
  return axios.get(`https://myeasykart.codeyogi.io/product/${productid}`).then(res=>res.data)
}

export function getProductsByIds(ids){
  let commaSeperatedIds = ids.join();
  return axios.get(`https://myeasykart.codeyogi.io/products/bulk`,{
    params:{
      ids:commaSeperatedIds,
    }
  }).then((response)=>{
    return response.data;
  })
}

export function getCart(){
  return axios.get(`https://myeasykart.codeyogi.io/carts`,{
    headers:{
      Authorization:localStorage.getItem("token"),
    }
  }).then(response=>{
    return response.data;
  })
}

export function saveCart(cart){
  return axios.post(`https://myeasykart.codeyogi.io/carts`,{data:cart},{
    headers:{
      Authorization:localStorage.getItem("token")
    }
  })
}