import React from 'react'
import './AddItemButton.css'

const AddItemButton = ({ product, handleAddToCart }) => {
    return (
        <button className="add-button" onClick={() => handleAddToCart(product)}>
            Agregar al Carrito
        </button>
    )
}

export default AddItemButton