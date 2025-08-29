import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import ItemListContainer from './ItemListContainer.jsx'
import ItemDetailContainer from './ItemDetailContainer.jsx'
import NotFound from './NotFound.jsx'

function App() {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<ItemListContainer />} />
                    <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
                    <Route path="/producto/:id" element={<ItemDetailContainer />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
