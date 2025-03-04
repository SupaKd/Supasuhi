import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import OrderDetail from "../../components/OrderDetailModal"

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { infos } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [toggleModal, setToggleModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    async function fetchOrders() {
        try {
            const res = await fetch("http://localhost:9000/api/v1/users/orders", {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error("Error fetching orders", error);
            setOrders([]);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    async function handleGetDetail(orderId) {
        try {
            const res = await fetch(`http://localhost:9000/api/v1/users/order/${orderId}`, {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setOrderDetail(data.order);
                setToggleModal(true);
            }
        } catch (error) {
            console.error("Error fetching order details", error);
        }
    }

    async function handleDeleteAccount(){
            try {
                const res = await fetch(`http://localhost:9000/api/v1/users`, {
                    method : "DELETE", 
                    credentials: "include", 
                });
                
                if (res.ok) {
                    dispatch(logout())
                    navigate("/")
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données.", error);
            }
        }
    

	if (!orders) return <p>Chargement des commandes...</p>;


    return (
        <main className="dashboard">
            {toggleModal && <OrderDetail setToggleModal={setToggleModal} order={orderDetail} />}
                <h1>Tableau de bord</h1>
            <section className="infos">
                <h3>Informations personnelles</h3>
                <p><strong>Prénom :</strong> {infos.firstname}</p>
                <p><strong>Nom :</strong> {infos.lastname}</p>
                <p><strong>Email :</strong> {infos.email}</p>
                <Link to={"/update-infos"} className="cta">Mettre à jour vos informations</Link>
                <button onClick={() => setShowModal(true)}>Supprimer votre compte</button>
            </section>
            {showModal && <DeleteAccountModal setShowModal={setShowModal} onDelete={handleDeleteAccount} />}
            <section>
                <h3>Historique des commandes</h3>
                {orders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Num.Com</th>
                                <th>Commandé le</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>{order.total_price} €</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button onClick={() => handleGetDetail(order.id)}>Voir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucune commande trouvée.</p>
                )}
            </section>
        </main>
    );
}

export default Dashboard;