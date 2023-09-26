
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { getDocs, collection, query, where } from "firebase/firestore"
import { db } from "../../firebase/client"

function ItemListContainer() {
  const { categoryID } = useParams()
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      try {
        let productsQuery

        if (categoryID) {
          productsQuery = query(collection(db, 'products'), where('categoryID', '==', categoryID))
        } else {
          productsQuery = collection(db, 'products')
        }

        const querySnapshot = await getDocs(productsQuery)
        const products = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        });

        setAllProducts(products)
      } catch (error) {
        console.error("Error: ", error)
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    }

    fetchProductsFromFirestore()
  }, [categoryID])
  
  const handleQuickAddToCart = (producto) => {
    alert(`Producto "${producto.title}" ha sido agregado al carrito!`)
  }

  if (isLoading) {
    return <div className="loadingStyle">Cargando...</div>
  }

  return (
    <div className="item-list-container">
        <ItemList productos={allProducts} onAddToCart={handleQuickAddToCart} />
    </div>
);

}

export default ItemListContainer