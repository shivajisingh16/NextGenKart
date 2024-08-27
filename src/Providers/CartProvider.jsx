// import React, { useEffect,useMemo,useState} from 'react'
// import { toast } from 'react-toastify';
// import { cartContext } from "../contexts"; 
// import { getCart, getProductsByIds, saveCart } from '../data/apiData';
// import { withUserHoc } from '../Hoc/WithContextHocCreater';
// import Loading from '../components/Loading';

// function CartProvider({isLoggedIn,children}) {
//   const [cart, setCart] = useState([]); 
//   let [loading,setLoading]= useState(true);
//   const [quantityMap,setQuantityMap] =useState({});
//   useEffect(()=>{
//     if(!isLoggedIn){
//       let storedCart = localStorage.getItem("cart") || "{}";
//       let cartData = JSON.parse(storedCart);

//       setQuantityMap(cartData)
//     }
//     else{
//       getCart().then((response)=>{
//         let newQuantityMap = response.reduce((map,item)=>{
//           return {...map, [item.product.id]:item.quantity}
//         },{})
//         setQuantityMap(newQuantityMap)
//       }).catch(()=>{
//         console.log("error for map");
//       })
//     }
//   },[isLoggedIn])
//     useEffect(()=>{
//       if(isLoggedIn){
//         getCart().then((response)=>{
//           setCart(response);
//           setLoading(false)
//         }).catch((error)=>{
//           console.log("errro for response")
//           setLoading(false)
//         })
//       }
//       else{
//         console.log("qunatitymap", quantityMap)

//         let ids = Object.keys(quantityMap);
//         getProductsByIds(ids).then((response)=>{
//           let savedCart = response.map((product)=>{
//             return {product:product,quantity:quantityMap[product.id]}
//           })
//           setCart(savedCart)
//           setLoading(false)
//         }).catch(()=>{
//           console.log("error for local")
//         })
//       }
//     },[quantityMap,isLoggedIn])
 
//     function finalSubmit(map,isLoggedIn){
//       if(isLoggedIn){
//         saveCart(map)
//       }
//       else{
//         localStorage.setItem("cart", JSON.stringify(map));
//       }
//     }

//   function addProductToCart(productId, count) {
//     if(count==0){
//       toast.warn("Add atleast one Product.")
//       return;
//     }
//     if(quantityMap[productId]&&count==quantityMap[productId]){
//       toast.info(`Already added ${count} Product.`)
//       return;
//     }
//     let newQuantityMap = { ...quantityMap,[productId]:count };

//     setQuantityMap(newQuantityMap);
//     finalSubmit(newQuantityMap,isLoggedIn)
    
//     toast.success(`${count} Product added succesfully`);
//   }
//   let totalCount = useMemo(()=>{
//     return Object.keys(quantityMap).reduce((total, current) => {
//       return total + quantityMap[current];
//     }, 0);
//   },[quantityMap,isLoggedIn])


//   function deleteItem(id) {
//     let newQuantityMap= {...quantityMap};
//     delete newQuantityMap[id];
//     setQuantityMap(newQuantityMap);
//     finalSubmit(newQuantityMap,isLoggedIn)
//     toast.error("Product deleted succesfully.")
//   }
//   function updateCart(setChanged, givenQuantityMap) {
//     setQuantityMap(givenQuantityMap)
//    finalSubmit(givenQuantityMap,isLoggedIn)
//     setChanged(false);
//     toast.success("Cart updated succesfully.")
//   }
//   if(loading)return <Loading/>
//   return <cartContext.Provider value={{cart,setCart,quantityMap,setQuantityMap,addProductToCart,updateCart,totalCount,deleteItem}}>{children}</cartContext.Provider>
// }

// export default withUserHoc(CartProvider)











import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { cartContext } from "../contexts"; 
import { getCart, getProductsByIds, saveCart } from '../data/apiData';
import { withUserHoc } from '../Hoc/WithContextHocCreater';
import Loading from '../components/Loading';

function CartProvider({ isLoggedIn, children }) {
  const [cart, setCart] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [loaded,setloaded] =useState(true);
  const [quantityMap, setQuantityMap] = useState({});

  useEffect(() => {
    async function fetchCart() {
      setloaded(false);
      if (!isLoggedIn) {
        let storedCart = localStorage.getItem("cart") || "{}";
        let cartData = JSON.parse(storedCart);
        setQuantityMap(cartData);
        // setLoading(false);\
        setloaded(true);
      } else {
        try {
          const response = await getCart();
          const newQuantityMap = response.reduce((map, item) => ({
            ...map,
            [item.product.id]: item.quantity
          }), {});
          setQuantityMap(newQuantityMap);
        } catch (error) {
          console.log("Error fetching cart data", error);
        } finally {
          // setLoading(false);
          setloaded(true);
        }
      }
    }

    fetchCart();
  }, [isLoggedIn]);

  useEffect(() => {
    async function fetchProducts() {
      if (!loaded) return;
      
      if (isLoggedIn) {
        try {
          const response = await getCart();
          setCart(response);
        } catch (error) {
          console.log("Error fetching cart", error);
        } finally {
          setLoading(false);
        }
      } else {
        const ids = Object.keys(quantityMap);
        try {
          const response = await getProductsByIds(ids);
          const savedCart = response.map(product => ({
            product: product,
            quantity: quantityMap[product.id]
          }));
          setCart(savedCart);
        } catch (error) {
          console.log("Error fetching local cart products", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchProducts();
  }, [quantityMap, isLoggedIn, loading]);

  function finalSubmit(map, isLoggedIn) {
    if (isLoggedIn) {
      saveCart(map).catch(error => console.log("Error saving cart", error));
    } else {
      localStorage.setItem("cart", JSON.stringify(map));
    }
  }

  function addProductToCart(productId, count) {
    if (count === 0) {
      toast.warn("Add at least one product.");
      return;
    }

    if (quantityMap[productId] && count === quantityMap[productId]) {
      toast.info(`Already added ${count} product(s).`);
      return;
    }

    const newQuantityMap = { ...quantityMap, [productId]: count };
    setQuantityMap(newQuantityMap);
    finalSubmit(newQuantityMap, isLoggedIn);
    toast.success(`${count} product(s) added successfully.`);
  }

  const totalCount = useMemo(() => {
    return Object.keys(quantityMap).reduce((total, current) => total + quantityMap[current], 0);
  }, [quantityMap]);

  function deleteItem(id) {
    const newQuantityMap = { ...quantityMap };
    delete newQuantityMap[id];
    setQuantityMap(newQuantityMap);
    finalSubmit(newQuantityMap, isLoggedIn);
    toast.error("Product deleted successfully.");
  }

  function updateCart(setChanged, givenQuantityMap) {
    setQuantityMap(givenQuantityMap);
    finalSubmit(givenQuantityMap, isLoggedIn);
    setChanged(false);
    toast.success("Cart updated successfully.");
  }

  if (loading) return <Loading />;
  
  return (
    <cartContext.Provider value={{ cart, setCart, quantityMap, setQuantityMap, addProductToCart, updateCart, totalCount, deleteItem }}>
      {children}
    </cartContext.Provider>
  );
}

export default withUserHoc(CartProvider);
