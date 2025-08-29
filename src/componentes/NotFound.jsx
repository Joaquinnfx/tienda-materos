import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Página no encontrada</h2>
                <p>Lo sentimos, la página que buscas no existe.</p>
                <div className="not-found-actions">
                    <Link to="/" className="home-link">
                        Volver al inicio
                    </Link>
                    <Link to="/productos" className="products-link">
                        Ver productos
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
