import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import ItemListContainer from './ItemListContainer.jsx'
import ItemDetailContainer from './ItemDetailContainer.jsx'
import NotFound from './NotFound.jsx'
import Cart from './Cart.jsx'
import { CartProvider } from '../contexts/CartContext.jsx'

function App() {
    return (
        <CartProvider>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/productos" element={<ItemListContainer />} />
                        <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
                        <Route path="/producto/:id" element={<ItemDetailContainer />} />
                        <Route path="/carrito" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </CartProvider>
    );
}

export default App;
