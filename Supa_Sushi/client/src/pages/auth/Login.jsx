import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/authSlice"; 

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const emailRef = useRef();
	const passRef = useRef();

	const [message, setMessage] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passRef.current.value;
	
		// console.log("🟡 Tentative de connexion avec :", { email, password });
	
		if (email.length && password.length) {
			try {
				const res = await fetch("http://localhost:9000/api/v1/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include", // 🔥 Assure-toi que le cookie est bien envoyé
					body: JSON.stringify({ email, password }),
				});
	
				// console.log("🔵 Réponse du serveur :", res);
	
				const resJSON = await res.json();
				console.log("🟢 Contenu de la réponse JSON :", resJSON);
	
				if (res.ok) {
					setMessage(resJSON.msg);
					dispatch(login(resJSON.user));
	
					if (resJSON.user.role === "admin") {
						navigate("/admindashboard");
					} else {
						navigate("/");
					}
				} else {
					setMessage(resJSON.msg || "Erreur de connexion");
				}
			} catch (error) {
				// console.error("🔴 Erreur serveur :", error);
				setMessage("Erreur serveur");
			}
		} else {
			setMessage("Identifiants requis");
		}
	};
	
	

	return (
		<main id="login">
			<form onSubmit={handleSubmit} className="auth">
				<h1>Connexion</h1>
				<input
					type="text"
					ref={emailRef}
					placeholder="Entrer votre email"
				/>
				<input
					type="password"
					ref={passRef}
					placeholder="Entrer votre mot de passe"
				/>

				{message && <p>{message}</p>}

				<button type="submit">Se connecter</button>
			</form>
			<p>
				Pas de compte ?{" "}
				<Link to={"/auth/register"}>Créer un compte</Link>
			</p>
		</main>
	);
}

export default Login;
