import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';

function ItemDetail({ producto }) {
    const onAdd = (cantidad) => {
        console.log(`Se agregaron ${cantidad} unidades de ${producto.nombre} al carrito`);
        // Aca se implementará la lógica del carrito
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
                <p className="detail-stock">Stock disponible: {producto.stock} unidades</p>
                
                <div className="detail-actions">
                    <ItemCount 
                        stock={producto.stock} 
                        initial={1} 
                        onAdd={onAdd}
                    />
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
