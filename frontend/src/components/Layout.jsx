import React, { useEffect, useState } from 'react'
import TopNavbar from './TopNavbar'
import BottomNavbar from './BottomNavbar'
import { Outlet } from 'react-router-dom'
import ShowMyNavbar from './ShowMyNavbar'
import { CropCartProvider } from '../context/cropCartContext'
function Layout() {
  const [pin,setPin] = useState('');
  const [cart, setCart] = useState([
    {
      id:13000222080,
      name: 'Apple',
      cartImage:'./src/assets/navbarIcons/Applecart.jpg',
      price: 220,
      quantity: 1,
      minQuantity:1,
      maxQuantity:3,
      availibilityStatus: 'In Stock',
      freshnessStatus: 'Fresh',
      description: '1Kg',
      estDeliveryTime: 'Delivery by 10:30 AM',
    },
    {
      id: 13000222081,
      name: 'Banana',
      cartImage:'./src/assets/navbarIcons/Banana.webp',
      price: 20,
      quantity: 1,
      minQuantity:1,
      maxQuantity:6,
      availibilityStatus: 'In Stock',
      freshnessStatus: 'Fresh',
      description: '4pcs.',
      estDeliveryTime: 'Delivery by 9:30 AM',
    },
    {
      id: 13000222082,
      name: 'Capsicum',
      cartImage:'./src/assets/navbarIcons/Capsicum.jpg',
      price: 20,
      quantity: 1,
      minQuantity:1,
      maxQuantity:99999,
      availibilityStatus: 'In Stock',
      freshnessStatus: 'Fresh',
      description: '200gm',
      estDeliveryTime: 'Delivery by 9 AM',
    },
    {
      id:13000222083,
      name: 'Cauliflower',
      cartImage: './src/assets/navbarIcons/Cauliflower.jpg',
      price: 28,
      quantity:2,
      minQuantity:1,
      maxQuantity:4,
      availibilityStatus:'In Stock',
      freshnessStatus:'Fresh',
      description:'Approx 400-600gm',
      estDeliveryTime: 'Delivery by 10AM'
    }
  ]);
  const [cartProdQuantity,setCartProdQuantity] = useState(1);
  const addToCart = function(product) {
    setCart((prevProds) => [product,...prevProds]);
  }
  const removeFromCart = function(id) {
    setCart((prevProds) => prevProds.filter((prods) => prods.id!=id));
  }
  const changePin = function(code){
    setPin(code);
  };
  const incrementProduct = function(id) {
    setCart((prevProds) => prevProds.map((prod) => prod.id===id? {...prod, quantity: prod.quantity+1}: prod));
    let total = cartProdQuantity;
    setCartProdQuantity(total+1);
    console.log(cart)
  };
  const decrementProduct = function(id) {
    setCart((prevProds) => prevProds.map((prod) => prod.id === id?{...prod, quantity:prod.quantity-1}:prod));
    let total = cartProdQuantity;
    if(total>0)
    setCartProdQuantity(total-1);
    console.log(cart)
  }
  useEffect(()=>{
    const pincode = JSON.parse(localStorage.getItem("pine"));
    if(pincode && pincode.length>0) {
       setPin(pincode);
    console.log(pincode);}
  },[]);
  
  useEffect(()=>{
    localStorage.setItem("pine",JSON.stringify(pin));
    let total = 0;
    cart.map(prod => total+=prod.quantity);
    setCartProdQuantity(total);
    console.log(cartProdQuantity);
  },[pin,cart]);

  return (
    <CropCartProvider value={{pin,changePin,cart,addToCart,removeFromCart,incrementProduct,decrementProduct,cartProdQuantity}}>
    <ShowMyNavbar>
    <TopNavbar/>
    </ShowMyNavbar>
    <Outlet/>
    </CropCartProvider>
  )
}

export default Layout