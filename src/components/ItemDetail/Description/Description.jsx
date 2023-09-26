import React from 'react'
import './Description.css'


const Description = ({ product }) => {
    return (
        <div className="description">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className="product-price">Precio: ${product.price}</p>
            <div className="product-extra-info">
                <p><i className="material-icons">security</i> Garantía - 12 meses</p>
                <p><i className="material-icons">done</i> Stock disponible</p>
                <p><i className="material-icons">local_shipping</i> Envíos a todo el país.</p>
            </div>
        </div>
    )
}

export default Description