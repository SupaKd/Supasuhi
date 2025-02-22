import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { addToCart, removeFromCart, clearCart, decrementQuantity } from "../../features/cartSlice.js";

function Cart() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const cart = useSelector((state) => state.cart);
	const { isLogged } = useSelector((state) => state.auth);

	const [successMessage, setSuccessMessage] = useState("");
	const [pickupTime, setPickupTime] = useState("");
	const [availableTimes, setAvailableTimes] = useState([]);

	const total_price = cart.reduce(
		(total, product) => total + product.unit_price * product.quantity, 0);

	useEffect(() => {
		const now = new Date();
		now.setMinutes(now.getMinutes() + 10); // Ajouter 10 min à l'heure actuelle
		
		// Arrondir les minutes au multiple de 10 supérieur
		const roundedMinutes = Math.ceil(now.getMinutes() / 10) * 10;
		now.setMinutes(roundedMinutes);

		const times = [];
		for (let i = 0; i < 8; i++) { // Générer 8 créneaux (1h20)
			const hour = now.getHours().toString().padStart(2, "0");
			const minutes = now.getMinutes().toString().padStart(2, "0");
			const timeString = `${hour}:${minutes}`;
			times.push(timeString);
			now.setMinutes(now.getMinutes() + 10); 
		}
		setAvailableTimes(times);
		setPickupTime(times[0]); // Sélectionner par défaut le premier horaire
	}, []);

	function handleClearCart() {
		dispatch(clearCart());
	}

	async function handlePlaceOrder() {
		try {
			if (!isLogged) {
				console.log("Utilisateur non connecté, redirection vers la connexion...");
				navigate("/auth/login");
				return;
			}

			if (!pickupTime) {
				alert("Veuillez sélectionner une heure de récupération.");
				return;
			}

			const order = {
				total_price,
				products: cart,
				pickup_time: pickupTime, 
			};

			console.log("Commande envoyée:", order);

			const response = await fetch("http://localhost:9000/api/v1/users/order", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(order),
			});

			if (response.ok) {
				setSuccessMessage("🎉 Votre commande a été passée avec succès ! Redirection en cours...");
				setTimeout(() => {
					handleClearCart();
					navigate("/");
				}, 2000);
			} else {
				console.error("Erreur lors de la commande", response.statusText);
			}
		} catch (error) {
			console.error("Erreur lors du passage de commande:", error);
		}
	};
	//console.log(cart);

	return (
		<main className="cart">
			{cart.length ? (
				<>
				
				
					<article className="cart-items">
						{cart.map((product) => (
							<article className="cart-item" key={product.id}>
							<img 
								src={product.image_url || "/not-found.png"} // Si l'image est manquante, afficher une image par défaut
								alt={product.label} 
								className="product-image" // Classe CSS pour styliser l'image si nécessaire
							/>
							<ul className="product-details">
								<li>Produit: {product.label} </li>
								<li>Quantité: {product.quantity}</li>
								<li>Prix: {product.unit_price * product.quantity}€</li>
							</ul>
						
							<button className="decrement" onClick={() => dispatch(decrementQuantity(product.id))}>
								-
							</button>
							<span>{product.quantity}</span>
							<button className="increment" onClick={() => dispatch(addToCart(product))}>
								+
							</button>
							<button className="remove" onClick={() => dispatch(removeFromCart(product.id))}>
								<FontAwesomeIcon icon={faXmark} />
							</button>
						</article>
						))}							
					</article>
							<button className="clear" onClick={handleClearCart}>
								Supprimer le panier <FontAwesomeIcon icon={faTrash} />
							</button>
							<p className="total-amount">
								Montant de la commande : {total_price}€
							</p>
							
			
					<label htmlFor="pickup-time">Choisissez l'heure de récupération :</label>
						<select
								id="pickup-time"
								value={pickupTime}
								onChange={(e) => setPickupTime(e.target.value)}
						>
				{availableTimes.map((time) => (
						<option key={time} value={time}>
								{time}
						</option>
						))}
						</select>

						<button className="valid" onClick={handlePlaceOrder} >
								Passer la commande
						</button>
					
				{successMessage && <p className="success-message">{successMessage}</p>}
			</>
			) : (
				<p>Votre panier est vide</p>
			)}
		</main>
	);
}

export default Cart;
