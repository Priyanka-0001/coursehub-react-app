import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from '../context/AuthContext';

const Navbar = () => {
  let { user, logout } = useContext(Auth)
  console.log(user);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
      : 'text-gray-700 hover:text-blue-600'

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <NavLink to="/">
            <h1 className="text-2xl font-extrabold tracking-wide text-blue-600">
              Course<span className="text-gray-800">Hub</span>
            </h1>
          </NavLink>
          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-medium">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative transition-all duration-300 ${isActive
                  ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              Courses
            </NavLink>

            {user?.role === 'admin' && (
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `relative transition-all duration-300 ${isActive
                    ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                Add Courses
              </NavLink>
            )}

            {user?.role === 'user' && (
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative transition-all duration-300 ${isActive
                    ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                Cart
              </NavLink>
            )}

            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={logout}
                className="rounded-md border border-red-500 px-3 py-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Login
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/signup"
                className="rounded-md border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
              >
                Sign Up
              </NavLink>
            )}

            {/* User Avatar */}
            {user && (
              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold uppercase text-white">
                  {user?.username?.charAt(0)}
                </div>

                <span className="font-medium text-gray-700">
                  Hi, {user.username}
                </span>

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  )

}

export default Navbar
