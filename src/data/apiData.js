export function getProducts(skip){
 return fetch(`https://dummyjson.com/products?skip=${skip*30}`).then(res=>res.json())
}
export function getProductsId(productid){
  return fetch(`https://dummyjson.com/products/${productid}`).then(res=>res.json())
}