
import React from 'react'
import './ColorSelector.css'

const ColorSelector = ({ colors, activeColor, onColorSelect }) => {
    return (
        <div className="color-options">
            {colors.map(color => (
                <div
                    key={color}
                    className={`color-circle ${color === activeColor ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => onColorSelect(color)}
                ></div>
            ))}
        </div>
    );
}

export default ColorSelector
