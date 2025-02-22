import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const minFirstnamelength = 2;
const minLastnamelength = 2;
const minEmaillength = 2;
const minPasswordlength = 8;

function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [isFirstnameValid, setIsFirstnameValid] = useState(false);
    const [isLastnameValid, setIsLastnameValid] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [message, setMessage] = useState("");

	const navigate = useNavigate();


    function handleChangeFirstname(e) {
		setFirstname(e.target.value);
		if (e.target.value.length < minFirstnamelength) {
			setIsFirstnameValid(false);
		} else {
			setIsFirstnameValid(true);
		}
	}

    function handleChangeLastname(e) {
		setLastname(e.target.value);
		if (e.target.value.length < minLastnamelength) {
			setIsLastnameValid(false);
		} else {
			setIsLastnameValid(true);
		}
	}

	function handleChangeEmail(e) {
		setEmail(e.target.value);
		if (e.target.value.length < minEmaillength) {
			setIsEmailValid(false);
		} else {
			setIsEmailValid(true);
		}
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
		if (e.target.value.length < minPasswordlength) {
			setIsPasswordValid(false);
		} else {
			setIsPasswordValid(true);
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		// console.log("🟡 Tentative d'inscription avec :", { firstname, lastname, email, password });
	
		try {
			if (isEmailValid && isPasswordValid && isFirstnameValid && isLastnameValid) {
				const res = await fetch("http://localhost:9000/api/v1/auth/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ firstname, lastname, email, password }),
				});
	
				// console.log("🔵 Réponse du serveur :", res);
	
				const resJSON = await res.json();
				// console.log("🟢 Contenu de la réponse JSON :", resJSON);
	
				if (res.ok) {
					setMessage(resJSON.msg);
					navigate("/auth/login");
					return;
				}
				setMessage(resJSON.errors);
			} else {
				setMessage("Erreur : Certains champs sont invalides !");
			}
		} catch (error) {
			setMessage("Erreur lors de l'inscription");
		}
	}
	

    return (
        <main id="register">
            <form onSubmit={handleSubmit} className="auth">
                <h1>Créer un compte</h1>
                <input
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={handleChangeFirstname}
                    placeholder="Entrer votre prénom"
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={handleChangeLastname}
                    placeholder="Entrer votre nom"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Entrer votre email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Entrer votre mot de passe"
                    required
                />

                    <button type="submit">Créer le compte</button>
            </form>
            <p>
                Vous avez déjà un compte ?{" "}
                <Link to={"/auth/login"}>Connectez-vous</Link>
            </p>
        </main>
    );
}

export default Register;
