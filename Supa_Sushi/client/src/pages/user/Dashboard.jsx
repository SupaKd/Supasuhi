import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import DeleteAccountModal from "../../pages/user/DeleteAccountModal";

function Dashboard() {
    const { infos } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    async function handleDeleteAccount(email, password) {
        //console.log("Demande de suppression avec :", { email, password });

        try {
            const res = await fetch(`http://localhost:9000/api/v1/users`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            //console.log("Réponse de la requête de suppression:", res);

            if (res.ok) {
                console.log("Compte supprimé avec succès.");
                dispatch(logout());
                navigate("/");
            } else {
                console.error("Échec de la suppression du compte. Code:", res.status);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    }

    return (
        <main className="dashboard">
            <h2>Dashboard</h2>
            <section>
                <h3>Informations personnelles</h3>
                <p><strong>Prénom :</strong> {infos.firstname}</p>
                <p><strong>Nom :</strong> {infos.lastname}</p>
                <p><strong>Email :</strong> {infos.email}</p>
                <Link to={"/update-infos"} className="cta">
                    Mettre à jour vos informations
                </Link>
                <button onClick={() => setShowModal(true)}>Supprimer votre compte</button>
            </section>

            {showModal && <DeleteAccountModal setShowModal={setShowModal} onDelete={handleDeleteAccount} />}
        </main>
    );
}

export default Dashboard;
