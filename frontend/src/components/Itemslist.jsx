import React from 'react'
import { Link } from 'react-router-dom'
function Itemslist({
    mainHeading,
    vegetables,
}) {
  return (
    <>
    <div className='w-full rounded-md box-border shadow-sm shadow-slate-500 text-sm font-serif font-medium text-gray-600 mb-2 bg-gradient-to-r from-green-100 to-white'>
        <div className='grid grid-rows-4 py-2 px-2 gap-1'>
            <p className='row-span-1 font-medium pt-1 pl-2.5'>{mainHeading}</p>
            <div className='row-span-3'>
                <div className='grid grid-cols-4 justify-center items-center'>
                    {vegetables.map((vegs) => (
                        <div key={vegs.id} className='col-span-1 '>
                            <div className='grid grid-rows-5 justify-center items-center text-center'>
                            <img src={`./src/assets/navbarIcons/${vegs.name}.${vegs.type}`}  width='56px' className='row-span-3 mix-blend-multiply'></img>
                            <span>{`₹${vegs.price}`}</span>
                            <span>{vegs.name}</span>
                            </div>
                        </div>
                    ))}
                    <div className='ml-4'>
                        <Link to='#' className='bg-gradient-to-tl from-gray-300 to-white rounded-md h-8 w-8 flex justify-center align-middle'>
                            <img src='./src/assets/navbarIcons/chevron-right-green-24.png' width='30px'></img>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Itemslist