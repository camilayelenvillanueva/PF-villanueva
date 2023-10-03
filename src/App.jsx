import React from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartPage from './components/CartPage/CartPage'
import ItemDetail from './components/ItemDetail/ItemDetail'
import { ProductProvider, ProductContext } from './contexts/ProductContext'

function App() {
  const { cart, addToCart, removeFromCart } = React.useContext(ProductContext)

  return (
    <ProductProvider>
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
  );
}

export default App