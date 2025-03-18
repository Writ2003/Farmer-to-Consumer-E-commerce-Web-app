import React from 'react'
import {NavLink} from 'react-router-dom'
function BottomNavbar() {
  return (
    <div className='fixed left-0 bottom-0 w-full h-12 z-50 rounded-t-lg bg-gradient-to-t from-green-400 to-green-300 font-serif'>
        <div className='grid grid-cols-4 mx-auto max-w-lg text-black my-1'>
            <NavLink  to='/' className={({isActive})=>`inline-flex flex-col items-center justify-center text-sm ${isActive ? 'bg-white rounded-3xl text-gray-500 ml-1':''}`}>
            <img src='./src/assets/navbarIcons/home-regular-24.png' className='w-5 h-5' id='homeimg'></img>
            <span>Home</span>
            </NavLink>
            <NavLink  to='/message' className={({isActive})=>`inline-flex flex-col items-center justify-center text-sm ${isActive ? 'bg-white rounded-3xl text-gray-500':''}` }>
            <img src='./src/assets/navbarIcons/message-square-dots-regular-24.png' className='w-5 h-5' id='messageimg'></img>
            <span>Message</span>
            </NavLink>
            <NavLink to='/transactions' className={({isActive})=>`inline-flex flex-col items-center justify-center text-sm ${isActive ? 'bg-white rounded-3xl text-gray-500':''}`}>
            <img src='./src/assets/navbarIcons/transfer-alt-regular-24.png' className='w-5 h-5'></img>
            <span>History</span>
            </NavLink>
            <NavLink to='/profile' className={({isActive})=>`inline-flex flex-col items-center justify-center text-sm ${isActive ? 'bg-white rounded-3xl text-gray-500 mr-1':''}`}>
            <img src='./src/assets/navbarIcons/user-circle-regular-24.png' className='w-5 h-5'></img>
            <span>Profile</span>
            </NavLink>
        </div>
    </div>

  )
}

export default BottomNavbar