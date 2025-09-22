import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { crearOrden } from '../firebase/productosService';
import { useState } from 'react';

function Cart() {
    const {
        cart,
        totalItems,
        totalPrice,
        updateQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [buyer, setBuyer] = useState({
        nombre: '',
        email: '',
        telefono: ''
    });

    const handleCheckout = async () => {
        if (!buyer.nombre || !buyer.email || !buyer.telefono) {
            alert('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        try {
            const ordenData = {
                buyer,
                items: cart,
                total: totalPrice,
                totalItems
            };

            const id = await crearOrden(ordenData);
            setOrderId(id);
            setShowCheckout(false);
            clearCart();
        } catch (error) {
            console.error('Error al crear la orden:', error);
            alert('Error al procesar la compra. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value
        });
    };

    if (orderId) {
        return (
            <div className="order-success">
                <h2>¡Compra realizada con éxito!</h2>
                <div className="order-details">
                    <p><strong>ID de la orden:</strong> {orderId}</p>
                    <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
                    <p><strong>Productos:</strong> {totalItems}</p>
                </div>
                <button
                    onClick={() => setOrderId(null)}
                    className="new-order-btn"
                >
                    Realizar nueva compra
                </button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega algunos productos para comenzar tu compra</p>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="cart-header">
                <h2>Carrito de Compras</h2>
                <button
                    onClick={clearCart}
                    className="clear-cart-btn"
                    title="Vaciar carrito"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                            <img src={item.imagen} alt={item.nombre} />
                        </div>

                        <div className="cart-item-info">
                            <h3 className="cart-item-name">{item.nombre}</h3>
                            <p className="cart-item-category">{item.categoria}</p>
                            <p className="cart-item-price">${item.precio}</p>
                        </div>

                        <div className="cart-item-controls">
                            <div className="quantity-controls">
                                <button
                                    onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                                    className="quantity-btn"
                                    disabled={item.cantidad <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="quantity-display">{item.cantidad}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                                    className="quantity-btn"
                                    disabled={item.cantidad >= item.stock}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="cart-item-total">
                                ${(item.precio * item.cantidad).toFixed(2)}
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="remove-item-btn"
                                title="Eliminar del carrito"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Total de productos:</span>
                    <span>{totalItems}</span>
                </div>
                <div className="summary-row total">
                    <span>Total a pagar:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="cart-actions">
                    {!showCheckout ? (
                        <button
                            onClick={() => setShowCheckout(true)}
                            className="checkout-btn"
                        >
                            Proceder al Pago
                        </button>
                    ) : (
                        <div className="checkout-form">
                            <h3>Datos de Compra</h3>
                            <div className="form-group">
                                <label>Nombre completo:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={buyer.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={buyer.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono:</label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    value={buyer.telefono}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="checkout-buttons">
                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="confirm-order-btn"
                                >
                                    {loading ? 'Procesando...' : 'Confirmar Compra'}
                                </button>
                                <button
                                    onClick={() => setShowCheckout(false)}
                                    className="cancel-btn"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
