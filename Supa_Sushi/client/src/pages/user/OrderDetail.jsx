import PropTypes from "prop-types";

function OrderDetail({ setToggleModal, order }) {
    if (!order) return null;
    
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
                    <strong>Total :</strong> {order.total_price} €
                </p>
                <p>
                    <strong>Status :</strong> {order.status}
                </p>
                <ul>
                    {order.products.map((product) => (
                        <li key={product.id}>
                            {product.label} | quantité : {product.quantity} | prix
                            unitaire : {product.unit_price} €
                        </li>
                    ))}
                </ul>
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
