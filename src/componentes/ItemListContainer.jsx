import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { getProductos, getProductosByCategoria } from '../firebase/productosService';

function ItemListContainer() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoriaId } = useParams();

    useEffect(() => {
        setLoading(true);

        const fetchProductos = async () => {
            try {
                let data;
                if (categoriaId) {
                    data = await getProductosByCategoria(categoriaId);
                } else {
                    data = await getProductos();
                }
                setProductos(data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
                // Fallback a datos mock si Firebase falla
                const productosData = [
                    { id: 1, nombre: 'Mate Camionero', precio: 25000, categoria: 'mates', imagen: '/src/assets/mate-camionero.jpg', descripcion: 'Mate Camionero con virola de alpaca', stock: 10 },
                    { id: 2, nombre: 'Mate de Madera', precio: 18000, categoria: 'mates', imagen: '/src/assets/mate-madera.jpg', descripcion: 'Mate artesanal de madera noble', stock: 8 },
                    { id: 3, nombre: 'Yerba Mate Premium', precio: 8000, categoria: 'yerbas', imagen: '/src/assets/yerba-premium.png', descripcion: 'Yerba mate de alta calidad, suave y aromática', stock: 25 },
                    { id: 4, nombre: 'Yerba Mate Orgánica', precio: 6500, categoria: 'yerbas', imagen: '/src/assets/yerba-organica.jpg', descripcion: 'Yerba mate orgánica certificada', stock: 20 },
                    { id: 5, nombre: 'Bombilla de Alpaca', precio: 12000, categoria: 'equipos', imagen: '/src/assets/bombilla-alpaca.jpg', descripcion: 'Bombilla artesanal de alpaca con filtro fino', stock: 12 },
                    { id: 6, nombre: 'Termo de Acero', precio: 52000, categoria: 'equipos', imagen: '/src/assets/termo-acero.jpg', descripcion: 'Termo de acero inoxidable de 1 litro', stock: 6 }
                ];

                if (categoriaId) {
                    const productosFiltrados = productosData.filter(p => p.categoria === categoriaId);
                    setProductos(productosFiltrados);
                } else {
                    setProductos(productosData);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [categoriaId]);

    if (loading) {
        return (
            <div className="loading-container">
                <h2>Cargando productos...</h2>
            </div>
        );
    }

    return (
        <div className="item-list-container">
            <h2>
                {categoriaId ?
                    `${categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1)}` :
                    'Todos nuestros productos'
                }
            </h2>
            <ItemList productos={productos} />
        </div>
    );
}

export default ItemListContainer;
