import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import {useCropCart} from '../context/cropCartContext'
function Cart() {
    const {cart, incrementProduct, decrementProduct,cartProdQuantity, removeFromCart} = useCropCart();
    const check = (id, quantity, minQuantity) => {
        if(quantity>0 && quantity> minQuantity) decrementProduct(id);
        else removeFromCart(id);
    }
  return (
    <>
    <div className='bg-gray-300 h-full'>
    <div className=' relative w-screen h-10 top-0 bg-green-500'>
        <div className='grid grid-cols-6 py-2 pl-2 pr-24'>
            <Link to='/'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 col-span-1 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg></Link>
            <div className='col-span-3 text-white font-medium text-md'>My Cart</div>  
        </div>
    </div>
    <div className='relative top-0 px-3 font-serif pb-14'>
        <p className='text-2xl font-extrabold leading-9 m-1 '>Cart ({cartProdQuantity})</p>
        {cart.map((prod) => (<div key={prod.id} className='grid grid-rows-1 gap-1 mt-1.5 text-sm font-medium shadow-md rounded-md bg-gradient-to-r from-green-50 to-green-200'>
            <div className='grid grid-cols-2 gap-1 px-2 py-2 '>
                <div className='flex flex-col items-center justify-center rounded-lg'><img src={prod.cartImage} alt='' className='mix-blend-multiply h-28'></img></div>
                <div className='grid grid-row-2 px-1 gap-2'>
                    <div className='flex flex-col justify-start gap-2 pl-3 py-2'>
                        <div className=''>{prod.name}</div>
                        <div>{prod.description}</div>
                    </div>
                    <div className='grid grid-row-3 justify-center gap-1.5'>
                        <div className='grid-row-1 text-center text-sm'>₹{prod.price*(prod.quantity/prod.minQuantity)} [{prod.availibilityStatus}]</div>
                        <div className='grid grid-cols-4 bg-gray-300 rounded-md'>
                            <button className='border-r border-black flex justify-center items-center outline-none hover:bg-white hover:rounded-l-md hover:scale-100 hover:pop hover:duration-150 py-0.5' onClick={()=>check(prod.id, prod.quantity,prod.minQuantity)}><img src={prod.quantity==prod.minQuantity?'./src/assets/navbarIcons/trash.svg':'./src/assets/navbarIcons/minus.svg'} className='w-3 h-2'/></button>
                            <input className='col-span-2 text-center bg-gray-300 outline-none text-sm' value={prod.quantity} readOnly/>
                            <button className='border-l border-black flex justify-center outline-none hover:bg-white hover:rounded-r-md hover:scale-100 hover:pop hover:duration-150 py-0.5' onClick={()=>incrementProduct(prod.id)}><span>+</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>))}
    </div>
    <div className='fixed z-50 bottom-2 left-0 w-screen h-10 '>
        <Link to='checkout' className='h-full bg-green-500 flex flex-row justify-center items-center text-white font-medium text-md mx-3 rounded-md'><span>Checkout</span></Link>
    </div>
    </div>
    </>
  )
}

export default Cart