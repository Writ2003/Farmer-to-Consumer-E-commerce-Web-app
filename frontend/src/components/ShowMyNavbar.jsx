import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
function ShowMyNavbar({children}) {
    const [showNav, setShowNav] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === '/' )
           setShowNav(true);
        else
            setShowNav(false);
    },[location])
  return (
    <>{showNav && children}</>
  )
}

export default ShowMyNavbar