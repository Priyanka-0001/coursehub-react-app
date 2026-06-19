import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/layout'
import CourseList from './pages/CourseList'
import SignUp from './pages/Signup'
import UpdateCourse from './pages/UpdateCourse'
import AddCourse from './pages/AddCourse'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProtectedRoutes from './route/ProtectedRoutes'
import SingleCourse from './pages/SingleCourse'
import AdminRoute from './route/AdminRoute'
import UserRoute from "./route/UserRoute"

const App = () => {
  let myRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <CourseList />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <SignUp />
        },
        {
          path: '/cart',
          element: <UserRoute><Cart /></UserRoute>
        },
        {
          path: '/add',
          element:
            <AdminRoute>
              <AddCourse />
            </AdminRoute>
        },
        {
          path: '/update/:id',    // :id i.e configuring protectedrouter
          element:
            <AdminRoute>
              <UpdateCourse />
            </AdminRoute>
        },
        {
          path: '/course/:id',
          element: <SingleCourse />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={myRouter}></RouterProvider>
  )
}

export default App



