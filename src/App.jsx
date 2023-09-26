
import React, { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartPage from './components/CartPage/CartPage'
import ItemDetail from './components/ItemDetail/ItemDetail'
import { ProductProvider } from './contexts/ProductContext'

function App() {
  const [cart, setCart] = useState([])

  const removeFromCart = (productId) => {
    console.log("Intentando eliminar el producto con ID:", productId)
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const addToCart = productToAdd => {
    const existingProduct = cart.find(p => p.id === productToAdd.id);
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
  return (<ProductProvider>
    <Router>
      <div className="App">
        <NavBar cart={cart} />

        <Routes>
          <Route path="/" element={<ItemListContainer cart={cart} addToCart={addToCart} />} />
          <Route path="/category/:categoryID" element={<ItemListContainer cart={cart} addToCart={addToCart} />} />

          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/product/:productId" element={<ItemDetail addToCart={addToCart} />} />
        </Routes>
      </div>
    </Router>
  </ProductProvider>

  )
}
export default App