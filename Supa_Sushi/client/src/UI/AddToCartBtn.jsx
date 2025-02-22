// UI pour afficher dynamiquement le nombre de produit dans le panier
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addToCart } from "../features/cartSlice";

function AddToCartBtn({ product }) {
	const dispatch = useDispatch();

	function handleProductToAdd() {
        // on créé un objet à envoyer dans le slice cart pour mettre à jour notre panier dans le store (dispatch)
		const tmp = {
			id: product.id,
			label: product.label,
			unit_price: parseFloat(product.price),
			image_url: product.image_urls ? product.image_urls[0] : null, 
		};
		dispatch(addToCart(tmp));
	}

	return <button onClick={handleProductToAdd}>Ajouter au panier</button>;
}

AddToCartBtn.propTypes = {
	product: PropTypes.object.isRequired,
};

export default AddToCartBtn;
