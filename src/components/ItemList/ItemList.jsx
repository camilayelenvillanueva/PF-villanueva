
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ItemList.css'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from "../../firebase/client"

const ItemList = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryID } = useParams()

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
        try {
            let productsQuery;

            if (categoryID) {
                productsQuery = query(collection(db, 'products'), where('categoryID', '==', categoryID))
            } else {
                productsQuery = collection(db, 'products')
            }

            const querySnapshot = await getDocs(productsQuery)
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setProductos(productsData)
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setLoading(false)
        }
    };

    fetchProductsFromFirestore()
  }, [categoryID])

  if (loading) {
      return <div>Cargando productos...</div>
  }

  return (
      <div className="item-list-container">
          <ul className="product-list">
              {productos.map(producto => (
                  <li key={producto.id} className="product-item">
                      <img src={producto.mainImage} alt={producto.title} className="product-image" />
                      <h2 className="product-title">{producto.title}</h2>
                      <p className="product-description">{producto.description}</p>
                      <Link to={`/product/${producto.id}`} className="details-link">Ver detalles</Link>
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default ItemList