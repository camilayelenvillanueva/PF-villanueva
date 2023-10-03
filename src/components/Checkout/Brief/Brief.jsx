
import React, { useState, useEffect } from 'react'
import './Brief.css'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const Brief = ({ localCart, calculateTotal }) => {
    const [loading, setLoading] = useState(false)
    const [purchaseId, setPurchaseId] = useState(null)
    const [purchaseCompleted, setPurchaseCompleted] = useState(false)

    useEffect(() => {
        if (loading && !purchaseId) {

            setTimeout(() => {

                setPurchaseId(`ID-${Math.floor(Math.random() * 1000000)}`)
                setLoading(false)
                setPurchaseCompleted(true)

                Toastify({
                    text: "Compra finalizada con éxito. Gracias por su compra 💜",
                    duration: 3000,
                    gravity: "top",
                    backgroundColor: "#a9a9a9",
                }).showToast()
            }, 3000)
        }
    }, [loading, purchaseId])

    const finalizePurchase = () => {
        setLoading(true)
    }

    return (
        <div className="order-summary">
            <h2>Detalle de tu Compra</h2>
            {localCart.map((product, index) => (
                <div key={`${product.id}-${index}`}>
                    <span>{product.title}</span>
                    <span>${product.price} x {product.quantity}</span>
                    <span>Total: ${product.price * product.quantity}</span>
                </div>
            ))}
            <strong>Total a pagar: ${calculateTotal()}</strong>

            {loading && <p>Generando código ID de compra...</p>}
            {purchaseId && !loading && <p className="purchase-id">Código de compra: {purchaseId}</p>}

            {!purchaseCompleted && <button onClick={finalizePurchase}>Finalizar Compra</button>}


            {purchaseCompleted && <p className="purchase-id" >Gracias por su compra 💜</p>}
        </div>
    )
}

export default Brief