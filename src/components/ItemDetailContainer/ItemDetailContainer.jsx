import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from "../../firebase/client"

const ItemDetailContainer = () => {
    const { products, setProducts } = useContext(ProductContext)
    const { productId } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProductFromFirestore = async () => {
            try {
                const productRef = doc(db, 'products', productId)
                const productDoc = await getDoc(productRef)

                if (productDoc.exists()) {
                    setProduct({ id: productDoc.id, ...productDoc.data() })
                } else {
                    console.error("No se encontró el producto ")
                }
            } catch (error) {
                console.error("Error: ", error)
            }
        }

        if (products && products.length) {
            const productData = products.find(p => p.id === parseInt(productId))
            setProduct(productData)
        } else {
            fetchProductFromFirestore()
        }
    }, [productId, products])

    return <ItemDetail product={product} />
}

export default ItemDetailContainer