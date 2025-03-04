import PropTypes from "prop-types";

function OrderDetail({ setToggleModal, order }) {
    if (!order) return null;
    console.log(order);
    return (
        <div className="modal-overlay" onClick={() => setToggleModal(false)}>
            <div
                role="dialog"
                aria-labelledby="order-details-title"
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="order-details-title">
                    Votre commande n° {order.id}
                </h2>
                
                <p>
                    <strong>Status :</strong> {order.status}
                </p>
                <table>
        <thead>
            <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {order.products.map((product) => (
                <tr key={product.id}>
                    <td>{product.label}</td>
                    <td>{product.quantity}</td>
                    <td>{product.unit_price} €</td>
                    <td>{product.quantity * product.unit_price} €</td>
                </tr>
            ))}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan="3"><strong>Total :</strong></td>
                <td><strong>{order.total_price} €</strong></td>
            </tr>
        </tfoot>
    </table>
                <button
                    aria-label="Close modal"
                    onClick={() => setToggleModal(false)}
                >
                    ✖
                </button>
            </div>
        </div>
    );
}

OrderDetail.propTypes = {
    setToggleModal: PropTypes.func.isRequired,
    order: PropTypes.shape({                
        id: PropTypes.number.isRequired,     
        total_price: PropTypes.number.isRequired, 
        status: PropTypes.string.isRequired,
        pickup_time: PropTypes.string.isRequired, 
        products: PropTypes.arrayOf(        
            PropTypes.shape({                
                id: PropTypes.number.isRequired,  
                label: PropTypes.string.isRequired, 
                quantity: PropTypes.number.isRequired, 
                unit_price: PropTypes.number.isRequired, 
            })
        ).isRequired,
    }),
};

export default OrderDetail;
