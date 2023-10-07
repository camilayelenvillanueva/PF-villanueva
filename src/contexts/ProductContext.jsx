
import React, { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const addToCart = productToAdd => {
    const existingProduct = cart.find(p => p.id === productToAdd.id)
    if (existingProduct) {
      setCart(prevCart => prevCart.map(p =>
        p.id === productToAdd.id
          ? { ...p, quantity: p.quantity + productToAdd.quantity }
          : p
      ))
    } else {
      setCart([...cart, productToAdd])
    }
  }

  return (

    <CartContext.Provider value={{ products, setProducts, cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
