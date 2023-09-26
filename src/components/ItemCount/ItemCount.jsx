import React, { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({ initial = 1, min = 1, max, product, onAdd, handleAddToCart }) => {
    const [count, setCount] = useState(initial)

    const handleAdd = () => {
        if (count < max) {
            setCount(count + 1)
            onAdd(count + 1)
        }
    }

    const handleSubtract = () => {
        if (count > min) {
            setCount(count - 1)
            onAdd(count - 1)
        }
    }

    return (
        <div className="item-count-container">
            <button onClick={handleSubtract}>-</button>
            <span>{count}</span>
            <button onClick={handleAdd}>+</button>
        </div>
    )
}

export default ItemCount