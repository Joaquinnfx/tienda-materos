import { useState } from 'react';

function ItemCount({ stock, initial, onAdd }) {

    const [cantidad, setCantidad] = useState(initial); //Cambiar el estado de la cantidad

    const aumentar = () =>{
        setCantidad(cantidad + 1);
    };

    const disminuir = () =>{
        setCantidad(cantidad - 1);
    };
    
    const handleAddToCart = () => {
        onAdd(cantidad);
    };

    return (
        <div className="item-count">
            <div className="count-controls">
                <button 
                    onClick={disminuir} 
                    className="count-btn"
                    disabled={cantidad <= 1}
                >
                    -
                </button>
                <span className="count-display">{cantidad}</span>
                <button 
                    onClick={aumentar} 
                    className="count-btn"
                    disabled={cantidad >= stock}
                >
                    +
                </button>
            </div>
            <button 
                onClick={handleAddToCart} 
                className="add-to-cart-btn"
                disabled={stock === 0}
            >
                {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
        </div>
    );
}

export default ItemCount;
