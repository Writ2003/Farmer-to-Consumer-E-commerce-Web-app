import React, { useState } from 'react'
import { IconButton, Stack } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { green , grey} from '@mui/material/colors'
import Itemslist from './Itemslist'
function Home() {
  const [recentVegetable,setRecenetVegetable] = useState([
    {
      id:Date.now(),
      name:'Potato',
      price:'20',
      type:'jpg',
    },
    {
      id: Date.now(),
      name:'Onion',
      price:'40',
      type:'jpg'
    },
    {
      id:Date.now(),
      name:'Tomato',
      price:'30',
      type:'jpg'
    }
  ]);
  const [regionalVegitable,setRegionalVegetable] = useState([
    {
      id:Date.now(),
      name:'Cucumber',
      price:'20',
      type:'webp',
    },
    {
      id:Date.now(),
      name:'Carrot',
      price:'25',
      type:'jpg',
    },
    {
      id:Date.now(),
      name:'Capsicum',
      price:'100',
      type:'jpg',
    }
  ]);
  const [fruits,setFruits] = useState([
    {
      id:Date.now(),
      name:'Mango',
      price:'20',
      type:'jpg',
    },
    {
      id:Date.now(),
      name:'Apple',
      price:'80',
      type:'jpg'
    },
    {
      id:Date.now(),
      name:'Banana',
      price:'69',
      type:'webp',
    }
  ])
  return (
    <div className='relative top-24 px-3 bg-slate-200 pt-2'>
      <Itemslist mainHeading='Recently Purchased' vegetables={recentVegetable}/>
      <Itemslist mainHeading='Regional Vegetables' vegetables={regionalVegitable}/>
      <Itemslist mainHeading='Fruits' vegetables={fruits}/>
      <Itemslist mainHeading='Recently Purchased' vegetables={recentVegetable}/>
      <Itemslist mainHeading='Regional Vegetables' vegetables={regionalVegitable}/>
      <Itemslist mainHeading='Fruits' vegetables={fruits}/>
      <IconButton aria-lebel='ChatIcon' style={{position:'sticky', bottom:45, left:2400, backgroundColor:grey['800'], padding:12}}>
        <ChatIcon style={{color: green['A200']}}/>
      </IconButton>
    </div>
  )
}

export default Home