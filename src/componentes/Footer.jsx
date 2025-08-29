
function Footer(){

    return(
        <footer className="footer">
            <div className="footer-social">
                <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="Youtube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <div className="footer-content">
                <p> &copy; Materos 2025 - Todos los derechos reservados </p>
            </div>
        </footer>
    )
}

export default Footer;