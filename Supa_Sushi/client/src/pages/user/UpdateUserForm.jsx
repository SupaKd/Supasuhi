import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

function UpdateUserForm() {
	const { infos } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstname: infos.firstname || "",
		lastname: infos.lastname || "",
		email: infos.email || "",
	});

	const [message, setMessage] = useState("");

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const newFormData = {
			firstname: formData.firstname || null,
			lastname: formData.lastname || null,
			email: formData.email || null,
		};

		// Log pour vérifier les données envoyées
		console.log("Données soumises :", newFormData);

		try {
			// Envoi de la requête PATCH
			const res = await fetch("http://localhost:9000/api/v1/users", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // Assurez-vous que les cookies sont envoyés
				body: JSON.stringify(newFormData),
			});

			// Log pour vérifier la réponse de la requête PATCH
			console.log("Réponse de la requête PATCH :", res);

			if (res.ok) {
				// Si la mise à jour est réussie, on tente de rafraîchir le token
				const resRefreshToken = await fetch("http://localhost:9000/api/v1/auth/refresh-login", {
					method: "POST",
					credentials: "include", // Toujours inclure les cookies
				});

				// Log pour vérifier la réponse de la requête de refresh
				console.log("Réponse de la requête refresh-login :", resRefreshToken);

				if (resRefreshToken.ok) {
					const resJSON = await resRefreshToken.json();
					// Log pour voir les données de l'utilisateur rafraîchies
					console.log("Données de l'utilisateur après refresh :", resJSON);

					dispatch(login(resJSON.user));
				}
				navigate("/dashboard");
			} else {
				// Log l'erreur si la requête PATCH échoue
				console.error("Erreur lors de la mise à jour. Détails : ", res);
				setMessage("Échec de la mise à jour. Veuillez réessayer.");
			}
		} catch (error) {
			// Log l'erreur si le fetch échoue
			console.error("Erreur lors de la mise à jour", error);
			setMessage("Une erreur s'est produite. Veuillez réessayer.");
		}
	}

	return (
		<main className="update">
			<h1>Modifier vos informations</h1>

			{message && <p>{message}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="firstname">Prénom</label>
					<input
						type="text"
						id="firstname"
						name="firstname"
						value={formData.firstname}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="lastname">Nom</label>
					<input
						type="text"
						id="lastname"
						name="lastname"
						value={formData.lastname}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Enregistrer les modifications</button>
			</form>
		</main>
	);
}

export default UpdateUserForm;
