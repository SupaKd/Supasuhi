import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

    const minFirstnamelength = 2;
    const minLastnamelength = 2;
    const minPasswordlength = 8;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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
        setIsFirstnameValid(e.target.value.length >= minFirstnamelength);
    }

    function handleChangeLastname(e) {
        setLastname(e.target.value);
        setIsLastnameValid(e.target.value.length >= minLastnamelength);
    }

    function handleChangeEmail(e) {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsEmailValid(isValidEmail(emailValue));
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        setIsPasswordValid(e.target.value.length >= minPasswordlength);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //console.log("🟡 Tentative d'inscription avec :", { firstname, lastname, email, password });

        try {
            if (isEmailValid && isPasswordValid && isFirstnameValid && isLastnameValid) {
                const res = await fetch("http://localhost:9000/api/v1/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ firstname, lastname, email, password }),
                });

                //console.log("🔵 Réponse du serveur :", res);

                const resJSON = await res.json();
                //console.log("🟢 Contenu de la réponse JSON :", resJSON);

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
    };

    return (
        <main id="register">
            <form onSubmit={handleSubmit} className="auth">
                <h1>Créer un compte</h1>

				{!isFirstnameValid && firstname.length > 0 && <p className="error-msg">Le prénom doit contenir au moins {minFirstnamelength} caractères.</p>}
                <input
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={handleChangeFirstname}
                    placeholder="Entrer votre prénom"
                    required
                    className={!isFirstnameValid && firstname.length > 0 ? "invalid" : "valid"}
                />

                {!isLastnameValid && lastname.length > 0 && <p className="error-msg">Le nom doit contenir au moins {minLastnamelength} caractères.</p>}
                <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={handleChangeLastname}
                    placeholder="Entrer votre nom"
                    required
                    className={!isLastnameValid && lastname.length > 0 ? "invalid" : "valid"}
                />

                {!isEmailValid && email.length > 0 && <p className="error-msg">Adresse e-mail invalide</p>}
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Entrer votre email"
                    required
                    className={!isEmailValid && email.length > 0 ? "invalid" : "valid"}
                />

                {!isPasswordValid && password.length > 0 && <p className="error-msg">Le mot de passe doit contenir au moins {minPasswordlength} caractères.</p>}
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Entrer votre mot de passe"
                    required
                    className={!isPasswordValid && password.length > 0 ? "invalid" : "valid"}
                />

                <button type="submit">Créer le compte</button>
            </form>

            <p>
                Vous avez déjà un compte ?{" "}
                <Link to={"/auth/login"}>Connectez-vous</Link>
            </p>

            {/* Validation dynamique */}
            <aside className="validation">
                <p>Validation des champs :</p>
                    <ul>
                        <li className={isEmailValid ? "success" : "alert"}>
                            Email : {isEmailValid ? "Valide" : "Invalide"}
                        </li>
                        <li className={isPasswordValid ? "success" : "alert"}>
                            Mot de passe : {isPasswordValid ? "Valide" : `Doit avoir au moins ${minPasswordlength} caractères`}
                        </li>
                    </ul>
            </aside>
        </main>
    );
};

export default Register;
