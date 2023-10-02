import React, { useState, useEffect } from 'react'
import Brief from '../Checkout/Brief/Brief'
import Checkout from '../Checkout/Checkout'

const CartPage = ({ cart, removeFromCart }) => {
    const [localCart, setLocalCart] = useState(cart)
    const [showInvoice, setShowInvoice] = useState(false)

    useEffect(() => {
        setLocalCart(cart)
    }, [cart])

    const calculateTotal = () => {
        return localCart.reduce((acc, product) => {
            return acc + (product.price * product.quantity)
        }, 0)
    }

    const handleCheckout = () => {
        setShowInvoice(true)
    }

    const handleRemoveSingleItem = (productId) => {
        const updatedCart = localCart.map(product => {
            if (product.id === productId) {
                return { ...product, quantity: product.quantity - 1 }
            }
            return product
        })

        const filteredCart = updatedCart.filter(product => product.quantity > 0)

        setLocalCart(filteredCart)
    }
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    })

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    })

    const handleInputChange = (event, setStateFunction) => {
        const { name, value } = event.target
        setStateFunction(prevState => ({ ...prevState, [name]: value }))
    }
    return (
        <div className="cart-page">
            <Checkout
                localCart={localCart}
                handleRemoveSingleItem={handleRemoveSingleItem}
                shippingInfo={shippingInfo}
                setShippingInfo={setShippingInfo}
                paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                handleInputChange={handleInputChange}
                handleCheckout={handleCheckout}
            />

            {showInvoice && <Brief localCart={localCart} calculateTotal={calculateTotal} />}
        </div>
    )
}


export default CartPage