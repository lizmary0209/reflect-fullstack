import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navigation.css";

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 768) {
            setIsMenuOpen(false);
        }
    };

    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);

const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navigation" aria-label="Primary navigation">
            <div className="navigation__inner">
                <button
                className="navigation__toggle"
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="navigation-menu"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    Menu
                </button>

                <ul
                id="navigation-menu"
                className={`navigation__list ${
                    isMenuOpen ? "navigation__list_open" : ""
                }`}
                >
                <li className="navigation__item">
                    <NavLink
                     to="/" 
                     end
                    className={({ isActive }) =>
                    `navigation__link ${isActive ? "navigation__link_active" : ""}`
                    }
                    onClick={closeMenu}
                    >
                    Home
                    </NavLink>
                </li>


                <li className="navigation__item">
                    <NavLink
                     to="/profile"
                      className={({ isActive }) => 
                      `navigation__link ${isActive ? "navigation__link_active" : ""}`
                      }
                      onClick={closeMenu}
                      >
                    Profile
                    </NavLink>
                </li>
            </ul>
         </div>
        </nav>
    );
}

export default Navigation;