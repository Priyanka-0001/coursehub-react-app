import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from '../context/AuthContext'
import { CartData } from '../context/CartContext'
import toast from 'react-hot-toast'

const Course = (props) => {

  let {
    cname,
    course_image,
    course_fee,
    course_duration,
    course_author,
    id,
    onDelete
  } = props;

  let { user } = useContext(Auth)
  let { addToCart, cart } = useContext(CartData)

  return (

    <div className="flex w-[280px] flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}
      <img
        src={course_image}
        alt={cname}
        className="h-48 w-full object-contain bg-gray-100 p-4"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">

        <h3 className="mb-1 text-lg font-semibold text-gray-800">
          {cname}
        </h3>

        <p className="text-sm text-gray-500">
          By {course_author}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Duration: {course_duration}
        </p>

        {/* Push footer to bottom */}
        <div className="mt-auto flex items-center justify-between pt-4">

          <span className="text-lg font-bold text-blue-600">
            ₹{course_fee}
          </span>

          {/* Admin Buttons */}
          {user?.role === 'admin' ? (

            <div className="flex gap-2">

              <NavLink
                to={`/update/${id}`}
                className="rounded-md border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Update
              </NavLink>

              <button
                onClick={() => onDelete(id)}
                className="rounded-md border border-red-600 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                Delete
              </button>

            </div>

          ) : (

            <>
              {/* View Button */}
              <NavLink
                to={`/course/${id}`}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                View
              </NavLink>

              {/* Go To Cart Button */}
              {user && cart.some(item => item.courseId === id) ? (

                <NavLink
                  to="/cart"
                  className="rounded-md bg-yellow-500 px-3 py-1.5 text-sm text-white hover:bg-yellow-600"
                >
                  Go to Cart
                </NavLink>

              ) : (

                /* Add To Cart Button */
                <button
                  onClick={() => {

                    if (!user) {
                      toast.error('Please login first');
                      return
                    }

                    addToCart(props)

                  }}

                  className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
                >
                  Add to Cart
                </button>

              )}

            </>

          )}

        </div>

      </div>

    </div>

  )

}

export default Course

// http://localhost:5173/update/101