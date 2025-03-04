import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { toggleMenu } from "../features/menuSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faCartShopping, faRightToBracket, faUser, faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { isLogged, infos } = useSelector((state) => state.auth);
    const { isMenuOpen } = useSelector((state) => state.menu);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    async function handleLogout() {
        const res = await fetch("http://localhost:9000/api/v1/auth/logout", {
            method: "POST",
        });

        if (res.ok) {
            dispatch(logout());
            navigate("/");
        }
    };

    function handleClick() {
        dispatch(toggleMenu());
    };

    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/" end>
                    <img src="android-chrome-192x192.png" alt="the logo" className="logo" />
                </NavLink>
            </div>

            <div className="header-right">
                <NavLink to="cart" end className="cart-link mobile-cart">
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
            {infos?.role === "admin" && (
                    <button onClick={() => navigate("/admindashboard")} className="admin-link">
                        <span className="nav-text">Admin Dashboard</span>
                    </button>
                )}
                </>
            )}
        </nav>

    {/* Section pour les écrans de tablette et de bureau */}
        <section className="desktop-nav">
                <NavLink to="cart" end className="cart-link desktop-cart">
                    <FontAwesomeIcon icon={faCartShopping} /> 
                    {totalItems ? <span>({totalItems})</span> : null} 
                </NavLink>

            {!isLogged ? (
                <NavLink to="auth/login" end className="login-link">
                    <span className="nav-text">Se connecter</span>
                </NavLink>
            ) : (
            <>
                <NavLink to="dashboard" end>
                    <span className="nav-text">Profil</span>
                </NavLink>
                <button onClick={handleLogout}>
                    <span className="nav-text">Se déconnecter</span>
                </button>
            {infos?.role === "admin" && (
                <button onClick={() => navigate("/admindashboard")} className="admin-link">
                    <span className="nav-text">Admin Dashboard</span>
                </button>
            )}
            </>
            )}
        </section>
    </header>
    );
};

export default Header;
