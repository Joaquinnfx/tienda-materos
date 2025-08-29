import { Link } from 'react-router-dom';

function Item({ producto }) {
    return (
        <div className="item">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="item-image"
            />
            <div className="item-info">
                <h3 className="item-title">{producto.nombre}</h3>
                <p className="item-price">${producto.precio}</p>
                <p className="item-description">{producto.descripcion}</p>
                <Link
                    to={`/producto/${producto.id}`}
                    className="item-detail-link"
                >
                    Ver detalle
                </Link>
            </div>
        </div>
    );
}

export default Item;
