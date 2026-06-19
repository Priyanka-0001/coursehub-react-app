import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '../context/AuthContext'
import axios from 'axios'
import { CartData } from '../context/CartContext'
import toast from 'react-hot-toast'

const Cart = () => {
  let { user } = useContext(Auth)
  let { cart, setCart } = useContext(CartData)
  // let [allCart, setAllCart] = useState([])

  // Fetch cart items
  // let getCart = async () => {
  //   let result = await axios.get(`http://localhost:3000/cart?userId=${user.id}`)
  //   setAllCart(result.data)
  // }

  // useEffect(() => {
  //   if (user) getCart()
  // }, [user])

  // Remove item from cart
  let removeFromCart = async (id) => {

    await axios.delete(
      `http://localhost:3000/cart/${id}`
    )

    let updatedCart = cart.filter(
      item => item.id !== id
    )

    setCart(updatedCart)

    toast.success('Removed from cart')
  }

  // Calculate total price
  let totalPrice = cart.reduce((sum, item) => sum + Number(item.course_fee), 0)

  return (
    <div className="mx-auto max-w-5xl p-6">

      <h2 className="mb-8 text-center text-3xl font-bold">
        My Cart
      </h2>

      {cart.length === 0 ? (

        <p className="text-center text-gray-500">
          Your cart is empty
        </p>

      ) : (

        <>
          {cart.map(item => (

            <div
              key={item.id}
              className="mb-5 flex items-center gap-4 rounded-lg border p-4 shadow-sm"
            >

              <img
                src={item.course_image}
                alt={item.cname}
                className="h-24 w-36 rounded object-cover"
              />

              <div className="flex-1">

                <h3 className="text-lg font-semibold">
                  {item.cname}
                </h3>

                <p className="text-gray-500">
                  By {item.course_author}
                </p>

                <p className="text-gray-500">
                  Duration: {item.course_duration}
                </p>

              </div>

              <div className="text-right">

                <p className="text-lg font-bold text-blue-600">
                  ₹{item.course_fee}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          <div className="mt-8 border-t pt-4 text-right">

            <h3 className="text-2xl font-bold">
              Total: ₹{totalPrice}
            </h3>

          </div>

        </>
      )}

    </div>
  )
}

export default Cart





