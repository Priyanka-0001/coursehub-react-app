import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

import { Auth } from './AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

export let CartData = createContext()

const CartContext = ({ children }) => {

  let { user } = useContext(Auth)

  let [cart, setCart] = useState([])

  let getCartData = async () => {

    let result = await axios.get(
      `http://localhost:3000/cart?userId=${user?.id}`
    )

    setCart(result.data)
  }

  useEffect(() => {

    if (user) {
      getCartData()
    }
    else {
      setCart([])
    }

  }, [user])



  let addToCart = async (course) => {

    let alreadyAdded = cart.find(
      item => item.courseId === course.id
    )

    if (alreadyAdded) {
      toast.error('Course already added')
      return
    }

    let cartObject = {
      id: Date.now(),
      courseId: course.id,
      userId: user.id,
      ...course
    }

    let result = await axios.post(
      'http://localhost:3000/cart',
      cartObject
    )

    setCart([...cart, result.data])

    toast.success('Added to cart successfully')
  }

  return (
    <CartData.Provider
      value={{
        addToCart,
        cart,
        setCart
      }}
    >
      {children}
    </CartData.Provider>
  )
}

export default CartContext