import './CartWidget.css'
import { Link } from 'react-router-dom'

const CartWidget = ({ itemCount }) => {

  return (

    <div className="cart-widget">
      <Link to="/cart">
        <span className="material-icons">shopping_cart</span>
      </Link>
      <span className="badge">{itemCount}</span>
    </div>
  )
}

export default CartWidget