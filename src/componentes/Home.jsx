import { Link } from 'react-router-dom';

function Home() {
    const categorias = [
        { id: 'mates', nombre: 'Mates', descripcion: 'Mates tradicionales y artesanales' },
        { id: 'yerbas', nombre: 'Yerbas', descripcion: 'Yerba mate de la mejor calidad' },
        { id: 'equipos', nombre: 'Equipos Materos', descripcion: 'Bombillas, termos y accesorios' }
    ];

    return (
        <div className="home">
            <section className="hero-section">
                <h1>Bienvenidos a Materos</h1>
                <p>Tu tienda especializada en todo lo relacionado con el mate</p>
            </section>

            <section className="categories-section">
                <h2>Nuestras Categorías</h2>
                <div className="categories-grid">
                    {categorias.map(categoria => (
                        <div key={categoria.id} className="category-card">
                            <h3>{categoria.nombre}</h3>
                            <p>{categoria.descripcion}</p>
                            <Link
                                to={`/categoria/${categoria.id}`}
                                className="category-link-btn"
                            >
                                Ver productos
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="featured-section">
                <h2>Productos Destacados</h2>
                <p>Descubre nuestros productos más populares</p>
                <Link to="/productos" className="view-all-btn">
                    Ver todos los productos
                </Link>
            </section>
        </div>
    );
}

export default Home;
