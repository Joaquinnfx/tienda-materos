import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Cargar carrito desde localStorage al inicializar
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error('Error al cargar el carrito desde localStorage:', error);
            }
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Calcular totales cuando cambie el carrito
    useEffect(() => {
        const items = cart.reduce((total, item) => total + item.cantidad, 0);
        const price = cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        setTotalItems(items);
        setTotalPrice(price);
    }, [cart]);

    // Agregar producto al carrito
    const addToCart = (producto, cantidad) => {
        const existingItem = cart.find(item => item.id === producto.id);

        if (existingItem) {
            // Si el producto ya existe, actualizar la cantidad
            const updatedCart = cart.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + cantidad }
                    : item
            );
            setCart(updatedCart);
        } else {
            // Si es un producto nuevo, agregarlo al carrito
            const newItem = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                categoria: producto.categoria,
                cantidad: cantidad,
                stock: producto.stock
            };
            setCart([...cart, newItem]);
        }
    };

    // Remover producto del carrito
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    // Actualizar cantidad de un producto en el carrito
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const updatedCart = cart.map(item =>
            item.id === productId
                ? { ...item, cantidad: newQuantity }
                : item
        );
        setCart(updatedCart);
    };

    // Limpiar todo el carrito
    const clearCart = () => {
        setCart([]);
    };

    // Verificar si un producto está en el carrito
    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    // Obtener cantidad de un producto específico en el carrito
    const getItemQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.cantidad : 0;
    };

    const value = {
        cart,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
