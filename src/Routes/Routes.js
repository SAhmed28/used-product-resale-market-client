import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Main from '../layout/Main';
import CategoryItems from '../Pages/CategoryItems/CategoryItems';
import AddProducts from '../Pages/Dashboard/AddProducts/AddProducts';
import Home from '../Pages/Home/Home/Home'
import Login from '../Pages/Login/Login';
import DisplayError from '../Pages/Shared/DisplayError/DisplayError';
import SignUp from '../Pages/SignUp/SignUp';
import PrivateRoute from '../Routes/PrivateRoute/PrivateRoute'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/category/:id',
            element: <CategoryItems></CategoryItems>
        },
        {
            path:'/login',
            element: <Login></Login>
        },
        {
            path:'/signup',
            element: <SignUp></SignUp>
        },
        
      ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
          {
            path:'/dashboard/admin',
          },
          {
            path:'/dashboard/seller',
            element: <AddProducts></AddProducts>
          },
          {
            path:'/dashboard/buyer',
          },
        ]
    }
  ]);

export default router;