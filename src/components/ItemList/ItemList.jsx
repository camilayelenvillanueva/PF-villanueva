import React from 'react'
import { Link } from 'react-router-dom'
import './ItemList.css'

const ItemList = ({ productos, isLoading }) => {

    if (isLoading) {
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
    )
}

export default ItemList