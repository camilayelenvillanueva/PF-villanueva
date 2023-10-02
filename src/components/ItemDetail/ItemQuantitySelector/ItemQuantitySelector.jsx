import React from 'react'
import ItemCount from '../../ItemCount/ItemCount'
import './ItemQuantitySelector.css'

const ItemQuantitySelector = ({ max, onAdd, handleAddToCart }) => {
    return (
        <ItemCount
            max={max}
            onAdd={onAdd}
            handleAddToCart={handleAddToCart}
        />
    )
}

export default ItemQuantitySelector



