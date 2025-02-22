import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faCartShopping, faRightToBracket, faUser, faCircleUser, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { toggleMenu } from "../features/menuSlice";
import { logout } from "../features/authSlice";
import { toggleTheme } from "../features/themeSlice";  // Assurez-vous d'importer cette action

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const { isLogged } = useSelector((state) => state.auth);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const { isDark } = useSelector((state) => state.theme);  // Récupérer l'état du mode sombre

    async function handleLogout() {
        const res = await fetch("http://localhost:9000/api/v1/auth/logout", {
            method: "POST",
        });

        if (res.ok) {
            dispatch(logout());
            navigate("/");
        }
    }

    function handleClick() {
        dispatch(toggleMenu());
    }

    function handleToggleTheme() {
        dispatch(toggleTheme());
        console.log("Mode sombre activé :", isDark);
          // Appeler l'action pour basculer le thème
    }

    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/" end>
                    <img src="android-chrome-192x192.png" alt="the logo" className="logo" />
                </NavLink>
            </div>

            <div className="header-right">
                <NavLink to="cart" end className="cart-link">
                    <FontAwesomeIcon icon={faCartShopping} />
                    {totalItems ? <span>({totalItems})</span> : null}
                </NavLink>

                <div className="burger-menu" onClick={handleClick}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>

            <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                <button className="close-menu" onClick={handleClick}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                {!isLogged ? (
                    <NavLink to="auth/login" end onClick={handleClick} className="login-link">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </NavLink>
                ) : (
                    <>
                        <NavLink to="dashboard" end onClick={handleClick}>
                            <FontAwesomeIcon icon={faUser} className="user-link" />
                        </NavLink>
                        <button onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </button>
                    </>
                )}

                {/* Ajout du bouton pour basculer le mode sombre */}
                <button onClick={handleToggleTheme} className="theme-toggle">
                    <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
                </button>
            </nav>
        </header>
    );
}

export default Header;
