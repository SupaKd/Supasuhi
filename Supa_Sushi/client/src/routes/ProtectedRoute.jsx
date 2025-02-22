// Protège les routes en verifiant si l'user est bien authentifié
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { login, logout } from "../features/authSlice";

function ProtectedRoute({ children }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isVerifying, setIsVerifying] = useState(true);
	const { isLogged } = useSelector((state) => state.auth);

	useEffect(() => {
		async function checkToken() {
			try {
				const res = await fetch("http://localhost:9000/api/v1/auth/refresh-login", {
					method: "POST",
					credentials: "include",
				});

				if (res.ok) {
					const data = await res.json();
					dispatch(login(data.user));
				} else {
					dispatch(logout());
					navigate("/auth/login");
				}
			} catch (error) {
				console.error("Echec TOKEN", error);
				dispatch(logout());
				navigate("/auth/login");
			} finally {
				setIsVerifying(false);
			}
		}

		if (isLogged) {
			setIsVerifying(false);
		} else {
			checkToken();
		}
	}, [isLogged]);

	if (isVerifying) {
		return <p>Chargement...</p>;
	}

	return children;
}

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
