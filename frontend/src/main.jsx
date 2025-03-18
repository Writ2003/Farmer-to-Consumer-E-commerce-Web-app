import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Transactions from './components/Transactions.jsx'
import ConsumerProfile from './components/profile/ConsumerProfile.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {
          path:'',
          element: <Home/>,
        },
        {
          path: 'message',
        },
        {
          path: 'transactions',
          element: <Transactions/>
        },
        {
          path: 'profile',
          element: <ConsumerProfile/>
        }, 
        {
          path: 'cart',
          element: <Cart/>,
        },
        {
          path:'cart/checkout',
          element: <Checkout/>
        }
      ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
