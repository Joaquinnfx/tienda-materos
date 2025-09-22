import { db } from './config.js';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';

// Obtener todos los productos
export const getProductos = async () => {
    try {
        const productosSnapshot = await getDocs(collection(db, 'productos'));
        const productos = [];

        productosSnapshot.forEach((doc) => {
            productos.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Si no hay productos en Firebase, lanzar error para usar fallback
        if (productos.length === 0) {
            throw new Error('No hay productos en Firebase');
        }

        return productos;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

// Obtener productos por categoría
export const getProductosByCategoria = async (categoriaId) => {
    try {
        const productos = await getProductos();
        const productosFiltrados = productos.filter(producto => producto.categoria === categoriaId);

        // Si no hay productos en Firebase, devolver array vacío para que use fallback
        if (productos.length === 0) {
            throw new Error('No hay productos en Firebase');
        }

        return productosFiltrados;
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        throw error;
    }
};

// Obtener un producto por ID
export const getProductoById = async (productoId) => {
    try {
        const docRef = doc(db, 'productos', productoId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            // Si no existe el producto, lanzar error para usar fallback
            throw new Error('Producto no encontrado en Firebase');
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        throw error;
    }
};

// Crear una orden en Firestore
export const crearOrden = async (ordenData) => {
    try {
        const docRef = await addDoc(collection(db, 'ordenes'), {
            ...ordenData,
            fecha: new Date(),
            estado: 'pendiente'
        });

        return docRef.id;
    } catch (error) {
        console.error('Error al crear orden:', error);
        throw error;
    }
};
