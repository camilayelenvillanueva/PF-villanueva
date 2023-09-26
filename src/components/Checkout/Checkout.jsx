import React from 'react'
import './styles.css' 

const Checkout = ({ localCart, handleRemoveSingleItem, shippingInfo, setShippingInfo, paymentInfo, setPaymentInfo, handleInputChange, handleCheckout }) => {
    
    return (
        <div className="checkout-section">
            <h1>Tu Carrito</h1>
            <ul>
                {localCart.map((product, index) => (
                    <li key={`${product.id}-${index}`}>
                        <img src={product.mainImage} alt={product.title} width={50} />
                        <span>{product.title}</span>
                        <span>${product.price}</span>
                        <span>Cantidad: {product.quantity}</span>
                        <button onClick={() => handleRemoveSingleItem(product.id)}>Eliminar una unidad</button>
                    </li>
                ))}
            </ul>
            <div className="shipping-details">
                <h3>Detalles de Envío</h3>
              
                        <input type="text" name="name" placeholder="Nombre" value={shippingInfo.name} onChange={(e) => handleInputChange(e, setShippingInfo)} />
                        <input type="text" name="lastName" placeholder="Apellido" value={shippingInfo.lastName} onChange={(e) => handleInputChange(e, setShippingInfo)} />
                        <input type="text" name="address" placeholder="Dirección" value={shippingInfo.address} onChange={(e) => handleInputChange(e, setShippingInfo)} />
                        <input type="text" name="city" placeholder="Ciudad" value={shippingInfo.city} onChange={(e) => handleInputChange(e, setShippingInfo)} />
                        <input type="text" name="state" placeholder="Estado/Provincia" value={shippingInfo.state} onChange={(e) => handleInputChange(e, setShippingInfo)} />
                        <input type="text" name="postalCode" placeholder="Código Postal" value={shippingInfo.postalCode} onChange={(e) => handleInputChange(e, setShippingInfo)} />
                        <input type="text" name="country" placeholder="País" value={shippingInfo.country} onChange={(e) => handleInputChange(e, setShippingInfo)} />
                
            </div>

            <div className="payment-details">
                <h3>Detalles de Pago</h3>
                        <input type="text" name="cardNumber" placeholder="Número de Tarjeta" value={paymentInfo.cardNumber} onChange={(e) => handleInputChange(e, setPaymentInfo)} />
                        <input type="text" name="expiryDate" placeholder="Fecha de Expiración (MM/YY)" value={paymentInfo.expiryDate} onChange={(e) => handleInputChange(e, setPaymentInfo)} />
                        <input type="text" name="cvv" placeholder="CVV" value={paymentInfo.cvv} onChange={(e) => handleInputChange(e, setPaymentInfo)} />
                        <input type="text" name="cardName" placeholder="Nombre en la Tarjeta" value={paymentInfo.cardName} onChange={(e) => handleInputChange(e, setPaymentInfo)} />
                   
            </div>

            <button onClick={handleCheckout}>Finalizar Compra</button>
        </div>
    )
}

export default Checkout











