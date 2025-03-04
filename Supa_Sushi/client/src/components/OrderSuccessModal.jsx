import PropTypes from "prop-types";

function OrderSuccessModal({ setShowModal }) {
    return (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Commande validée 🎉</h2>
                <p>Votre commande a été passée avec succès ! Vous allez être redirigé.</p>
            </div>
        </div>
    );
}

OrderSuccessModal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
};

export default OrderSuccessModal;
