import { useState } from "react";
import PropTypes from "prop-types";

function DeleteAccountModal({ setShowModal, onDelete }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        console.log("Suppression demandée avec :", { email, password });

        // Appeler la fonction de suppression fournie en prop
        onDelete(email, password);
    };

    return (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Confirmer la suppression</h2>
                <p>Veuillez entrer votre email et mot de passe pour confirmer la suppression de votre compte.</p>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label>
                        Email :
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Mot de passe :
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <div className="modal-actions">
                        <button type="button" onClick={() => setShowModal(false)}>
                            Annuler
                        </button>
                        <button type="submit" disabled={!email || !password}>
                            Supprimer mon compte
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

DeleteAccountModal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteAccountModal;
