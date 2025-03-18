import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCropCart } from '../context/cropCartContext';

function TopNavbar() {
    const {pin,changePin} = useCropCart();
    const [code,setCode] = useState('');
    const change = function(e){
        e.preventDefault();
        if(!code) return;
        changePin(code);
        setCode('');
    };
    const search = function(e) {

    };
  return (
    <>
    <div className='fixed top-0 left-0  w-full h-24 z-50 font-serif'>
        <div className='grid grid-cols-3 lg:grid-cols-4 justify-between align-middle mx-auto h-16 bg-gradient-to-b from-green-500 to-green-400'>
            <Link to='/' className=' text-white lg:mx-2 mr-6 box-content flex flex-row justify-center align-middle'><img src='./src/assets/navbarIcons/cropcart-high-resolution-logo.png' className='h-14 w-20 mix-blend-multiply'></img></Link> 
            <div className='flex flex-row col-span-2 justify-around my-2 mx-2 items-center text-gray-800 text-sm'>
            <div className='col-span-2 ml-16'>    
                <div className='flex flex-row justify-between align-middle gap-4 lg:gap-14'>
                <Link to='#' className='flex flex-col justify-center items-center text-sm '><img src='./src/assets/navbarIcons/search-regular-24.png' className='w-5 h-5'></img></Link>
                <Link to='/cart' className='flex flex-col justify-center items-center text-sm '><img src='./src/assets/navbarIcons/cart-regular-24.png' className='w-5 h-5'></img></Link>
                <Link to='#' className='flex flex-col justify-center items-center text-sm '><img src='./src/assets/navbarIcons/log-out-regular-24.png' className='w-5 h-5'></img></Link>
                </div>
            </div>    
        </div>        
    </div>
        <div className='flex flex-row justify-center align-middle bg-green-300 h-8 rounded-b-sm'>
            <div className='flex align-middle my-1.5 text-black font-normal text-sm'>
                <img src="./src/assets/navbarIcons/location.svg" className='w-4 h-4 mr-1' alt="location" />
                <span className='text-md font-medium'>Change Location :</span> 
                <form className='ml-2' onSubmit={change}>
                   <input className='bg-green-100 rounded-l-md placeholder:text-gray-600 px-2 max-w-20' 
                   type='text' 
                   placeholder='Zip Code'
                   onChange={(e)=>setCode(e.target.value)}
                   value={code}
                   >
                   </input>
                   <button type='submit' className='bg-gray-200 rounded-r-md px-1'>✔</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default TopNavbar