
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ItemDetail.css'
import Description from './Description/Description'
import ItemQuantitySelector from './ItemQuantitySelector/ItemQuantitySelector'
import AddItemButton from './AddItemButton/AddItemButton'
import { doc, getDoc } from 'firebase/firestore'
import { db } from "../../firebase/client"
import ColorSelector from './ColorSelector/ColorSelector'

const ItemDetail = ({ addToCart }) => {
    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeColor, setActiveColor] = useState(null)
    const [selectedQuantities, setSelectedQuantities] = useState({})
    const colors = ['brown', 'darkslategray', 'black', 'burlywood']
    const [activeImage, setActiveImage] = useState('')

    const handleAddToCart = (producto) => {
        const quantity = selectedQuantities[producto.id] || 1
        addToCart({ ...producto, quantity: quantity })
    };

    const handleQuantityChange = (productId, quantity) => {
        setSelectedQuantities({
            ...selectedQuantities,
            [productId]: quantity
        })
    }

    useEffect(() => {
        if (product && product.mainImage) {
            setActiveImage(product.mainImage)
        }
    }, [product])

    const handleThumbnailClick = (imageUrl) => {
        setActiveImage(imageUrl);
    }

    useEffect(() => {
        const fetchProductFromFirestore = async () => {
            try {
                const productRef = doc(db, 'products', productId)
                const productDoc = await getDoc(productRef)

                if (productDoc.exists()) {
                    setProduct({ id: productDoc.id, ...productDoc.data() })
                } else {
                    console.error("No se encontró el producto")
                }
                setLoading(false)
            } catch (error) {
                console.error("Error:", error)
                setLoading(false)
            }
        }

        fetchProductFromFirestore()
    }, [productId])

    if (loading || !product) return <p>Cargando detalles del producto...</p>;

    return (
        <div className="product-detail">
            <div className="product-images-section">
                <div className="main-image">
                    <img src={activeImage} alt={product.title} />
                </div>

                <div className="thumbnails">
                    {product.images.map((imgUrl, idx) => (
                        <img
                            key={idx}
                            src={imgUrl}
                            alt={`Thumbnail ${idx}`}
                            onClick={() => handleThumbnailClick(imgUrl)}
                            className={imgUrl === activeImage ? 'active-thumbnail' : ''}
                        />
                    ))}
                </div>
            </div>

            <div className="product-info">
                <Description product={product} />

                <ColorSelector
                    colors={colors}
                    activeColor={activeColor}
                    onColorSelect={setActiveColor}
                />

                <ItemQuantitySelector
                    max={10}
                    onAdd={(quantity) => handleQuantityChange(product.id, quantity)}
                    onAddToCart={() => handleAddToCart(product)}
                />

                <AddItemButton product={product} handleAddToCart={handleAddToCart} />
            </div>
        </div>
    )
}

export default ItemDetail
