import logo from "../../assets/logo.svg";
import "./Header.css";

function Header({ isLoggedIn, onOpenLogin, onOpenRegister, onLogout }) {
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__brand">
                    <img 
                    src={logo}
                     alt="Reflect logo with three green leaves" 
                    className="header__logo"
                    />
                    <h1 className="header__title">Reflect</h1>
                </div>

<div className="header__actions">
    {!isLoggedIn ? (
        <>
        <button 
        className="header__button"
         type="button"
          onClick={onOpenLogin}
          >
            Sign in
        </button>
        <button
        className="header__button header__button_primary"
        type="button"
        onClick={onOpenRegister}
        >
            Sign up
        </button>
        </>
    ) : (
        <button
         className="header__button"
          type="button"
           onClick={onLogout}
           >
            Logout
        </button>
    )}
   </div>
  </div>
</header>
    );
}

export default Header;