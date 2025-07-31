//Un componente es una fx cuya primera letra es mayuscula y retorna un elemento jsx
import CartWidget from './CartWidget'


function Navbar(){

    return (       
        <nav className="nav-home">
            <h1>Materos</h1> 
                <ul className='nav-list'>
                   <li><a href='#'>Inicio</a></li>
                   <li><a href='#'>Nuestros mates</a></li>
                   <li><a href='#'>Yerba mate</a></li>
                   <li><a href='#'>Sobre nosotros</a></li>
                   <li><a href='#'>Contacto</a></li>
                </ul>
                <CartWidget/>
            </nav>   
    );
}

export default Navbar; 

