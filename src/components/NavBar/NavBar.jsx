import React, { useState, useEffect } from 'react'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../../firebase/client"

const NavBar = ({ cart }) => {
  const cartItemCount = cart.length
  const [categories, setCategories] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchCategoriesFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'))
        const productsData = querySnapshot.docs.map(doc => doc.data())

        const uniqueCategories = [...new Set(productsData.map(product => product.categoryID))]
        
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchCategoriesFromFirestore()
  }, [])

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev)
  }
  
  return (
    <nav className="navbar">
      <span className="menu-icon material-icons" onClick={handleMenuToggle}>
        menu
      </span>
      <ul className={isMenuOpen ? 'active' : ''}>
        <li>
          <Link to="/"><span className="material-icons">home</span></Link>
        </li>
        {categories.map(categoryID => (
          <li key={categoryID}>
            <Link to={`/category/${categoryID}`}>{categoryID}</Link>
          </li>
        ))}
        <li><CartWidget itemCount={cartItemCount} /></li>
      </ul>
    </nav>
  )
}

export default NavBar


