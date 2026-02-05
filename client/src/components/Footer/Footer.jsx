import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">© {new Date().getFullYear()} Reflect</p>
        </footer>
    );
}

export default Footer;