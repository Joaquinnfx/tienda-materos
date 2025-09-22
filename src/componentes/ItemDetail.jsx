import { Link } from 'react-router-dom';
import { useState } from 'react';
import ItemCount from './ItemCount';
import { useCart } from '../contexts/CartContext';

function ItemDetail({ producto }) {
    const { addToCart, getItemQuantity } = useCart();
    const [showItemCount, setShowItemCount] = useState(true);

    const onAdd = (cantidad) => {
        addToCart(producto, cantidad);
        setShowItemCount(false); // Ocultar ItemCount después de agregar
        
    };

    return (
        <div className="item-detail">
            <div className="item-detail-image">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="detail-image"
                />
            </div>
            <div className="item-detail-info">
                <h1 className="detail-title">{producto.nombre}</h1>
                <p className="detail-price">${producto.precio}</p>
                <p className="detail-description">{producto.descripcion}</p>
                <p className="detail-stock">Stock disponible: {producto.stock - getItemQuantity(producto.id)} unidades</p>

                <div className="detail-actions">
                    {showItemCount ? (
                        <ItemCount
                            stock={producto.stock - getItemQuantity(producto.id)}
                            initial={1}
                            onAdd={onAdd}
                        />
                    ) : (
                        <div className="added-to-cart">
                            <p className="success-message">
                                ✅ Producto agregado al carrito
                            </p>
                            <p className="in-cart-message">
                                Ya tienes {getItemQuantity(producto.id)} unidades en el carrito
                            </p>
                            <button
                                onClick={() => setShowItemCount(true)}
                                className="add-more-btn"
                            >
                                Agregar más
                            </button>
                        </div>
                    )}
                </div>

                <div className="detail-navigation">
                    <Link to="/" className="back-link">
                        ← Volver al catálogo
                    </Link>
                    <Link to={`/categoria/${producto.categoria}`} className="category-link">
                        Ver más {producto.categoria}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
