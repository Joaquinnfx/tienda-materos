import { db } from './config.js';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

// Datos de productos para subir a Firebase
const productosData = [
    {
        id: 1,
        nombre: 'Mate Camionero',
        precio: 25000,
        categoria: 'mates',
        imagen: '/src/assets/mate-camionero.jpg',
        descripcion: 'Mate Camionero con virola de alpaca',
        stock: 10
    },
    {
        id: 2,
        nombre: 'Mate de Madera',
        precio: 18000,
        categoria: 'mates',
        imagen: '/src/assets/mate-madera.jpg',
        descripcion: 'Mate artesanal de madera noble',
        stock: 8
    },
    {
        id: 3,
        nombre: 'Yerba Mate Premium',
        precio: 8000,
        categoria: 'yerbas',
        imagen: '/src/assets/yerba-premium.png',
        descripcion: 'Yerba mate de alta calidad, suave y aromática',
        stock: 25
    },
    {
        id: 4,
        nombre: 'Yerba Mate Orgánica',
        precio: 6500,
        categoria: 'yerbas',
        imagen: '/src/assets/yerba-organica.jpg',
        descripcion: 'Yerba mate orgánica certificada',
        stock: 20
    },
    {
        id: 5,
        nombre: 'Bombilla de Alpaca',
        precio: 12000,
        categoria: 'equipos',
        imagen: '/src/assets/bombilla-alpaca.jpg',
        descripcion: 'Bombilla artesanal de alpaca con filtro fino',
        stock: 12
    },
    {
        id: 6,
        nombre: 'Termo de Acero',
        precio: 52000,
        categoria: 'equipos',
        imagen: '/src/assets/termo-acero.jpg',
        descripcion: 'Termo de acero inoxidable de 1 litro',
        stock: 6
    }
];

const categoriasData = [
    {
        id: 'mates',
        nombre: 'Mates',
        descripcion: 'Mates tradicionales y artesanales'
    },
    {
        id: 'yerbas',
        nombre: 'Yerbas',
        descripcion: 'Yerba mate de la mejor calidad'
    },
    {
        id: 'equipos',
        nombre: 'Equipos Materos',
        descripcion: 'Bombillas, termos y accesorios'
    }
];

// Función para subir productos a Firebase
export const uploadProductos = async () => {
    try {
        

        for (const producto of productosData) {
            await setDoc(doc(db, 'productos', producto.id.toString()), producto);
            
        }

        
        return true;
    } catch (error) {
        console.error('❌ Error al subir productos:', error);
        return false;
    }
};

// Función para subir categorías a Firebase
export const uploadCategorias = async () => {
    try {
       
        for (const categoria of categoriasData) {
            await setDoc(doc(db, 'categorias', categoria.id), categoria);
            
        }

        return true;
    } catch (error) {
        console.error('❌ Error al subir categorías:', error);
        return false;
    }
};

// Función para subir todo
export const uploadAllData = async () => {
    try {
        
        const categoriasSuccess = await uploadCategorias();
        const productosSuccess = await uploadProductos();

        if (categoriasSuccess && productosSuccess) {
           
            return true;
        } else {
            
            return false;
        }
    } catch (error) {
        console.error('❌ Error general:', error);
        return false;
    }
};
