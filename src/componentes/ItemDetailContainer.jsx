import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);

        // Simulación de llamada asíncrona
        const fetchProducto = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const productosData = [
                        { id: 1, nombre: 'Mate Camionero', precio: 25000, categoria: 'mates', imagen: '/src/assets/mate-camionero.jpg', descripcion: 'Mate Camionero con virola de alpaca', stock: 15 },
                        { id: 2, nombre: 'Mate de Madera', precio: 18000, categoria: 'mates', imagen: '/src/assets/mate-madera.jpg', descripcion: 'Mate artesanal de madera noble', stock: 8 },
                        { id: 3, nombre: 'Yerba Mate Premium', precio: 8000, categoria: 'yerbas', imagen: '/src/assets/yerba-premium.png', descripcion: 'Yerba mate de alta calidad, suave y aromática', stock: 25 },
                        { id: 4, nombre: 'Yerba Mate Orgánica', precio: 6500, categoria: 'yerbas', imagen: '/src/assets/yerba-organica.jpg', descripcion: 'Yerba mate orgánica certificada', stock: 20 },
                        { id: 5, nombre: 'Bombilla de Alpaca', precio: 12000, categoria: 'equipos', imagen: '/src/assets/bombilla-alpaca.jpg', descripcion: 'Bombilla artesanal de alpaca con filtro fino', stock: 12 },
                        { id: 6, nombre: 'Termo de Acero', precio: 52000, categoria: 'equipos', imagen: '/src/assets/termo-acero.jpg', descripcion: 'Termo de acero inoxidable de 1 litro', stock: 6 }
                    ];

                    const productoEncontrado = productosData.find(p => p.id === parseInt(id));
                    resolve(productoEncontrado);
                }, 1000);
            });
        };

        fetchProducto()
            .then(data => {
                setProducto(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar producto:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <h2>Cargando producto...</h2>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="error-container">
                <h2>Producto no encontrado</h2>
            </div>
        );
    }

    return (
        <div className="item-detail-container">
            <ItemDetail producto={producto} />
        </div>
    );
}

export default ItemDetailContainer;
