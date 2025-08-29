import CartWidget from './CartWidget'
import { Link } from 'react-router-dom'

function Header() {

    return (
        <header className="header">
            <Link to="/" className="header-title">
                <h1>Materos</h1>
            </Link>
            <nav className="nav-home">
                <ul className='nav-list'>
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/categoria/mates"className="nav-link">Mates</Link>
                    <Link to="/categoria/yerbas"className="nav-link">Yerba mate</Link>
                    <Link to="/categoria/equipos"className="nav-link">Equipos</Link>
                    <Link to="/productos"className="nav-link">Todos los productos</Link>
                </ul>
                <CartWidget />
            </nav>
        </header>
    );
}

export default Header;

