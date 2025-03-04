import PropTypes from "prop-types";

function DeleteAccountModal({ setShowModal, onDelete }) {
    const handleConfirmDelete = () => {
        onDelete(); // Appelle la fonction de suppression
        setShowModal(false);
    };

    return (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Confirmer la suppression</h2>
                <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>

                <div className="modal-actions">
                    <button type="button" onClick={() => setShowModal(false)}>
                        Annuler
                    </button>
                    <button type="button" className="danger" onClick={handleConfirmDelete}>
                        Oui, supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

DeleteAccountModal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteAccountModal;
