import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from '../contexts/CartContext';

function CartWidget() {
    const { totalItems } = useCart();

    return (
        <Link to="/carrito" className="cart-widget">
            <ShoppingCart />
            {totalItems > 0 && (
                <span className="cart-badge">
                    {totalItems}
                </span>
            )}
        </Link>
    );

}

export default CartWidget;