import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrderDetail from "../../../components/OrderDetailModal";

function AdminDashboard() {
    const { infos } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [sortedOrders, setSortedOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);
    const [toggleModal, setToggleModal] = useState(false);
    const [sortBy, setSortBy] = useState("recent");

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("http://localhost:9000/api/v1/admin/orders", {
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                const data = res.ok ? await res.json() : { orders: [] };
                setOrders(data.orders);
            } catch (error) {
                console.error("Error fetching orders", error);
                setOrders([]);
            }
        }
        fetchOrders();
    }, []);

    useEffect(() => {
        async function sortOrders() {
            const sorted = [...orders].sort((a, b) => {
                switch (sortBy) {
                    case "oldest": return new Date(a.created_at) - new Date(b.created_at);
                    case "totalAsc": return a.total_price - b.total_price;
                    case "totalDesc": return b.total_price - a.total_price;
                    default: return new Date(b.created_at) - new Date(a.created_at);
                }
            });
            setSortedOrders(sorted);
        }
        sortOrders();
    }, [orders, sortBy]);

    if (!orders.length) return <p>Chargement des commandes...</p>;

    return (
        <main className="dashboard">
            {toggleModal && <OrderDetail setToggleModal={setToggleModal} order={orderDetail} />}
            <h2>Admin Dashboard</h2>
            <section>
                <h3>Commandes des utilisateurs</h3>
                <label>Filtrer par : </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="recent">Plus récentes</option>
                    <option value="oldest">Plus anciennes</option>
                    <option value="totalAsc">Prix croissant</option>
                    <option value="totalDesc">Prix décroissant</option>
                </select>
                {sortedOrders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Num.Com</th>
                                <th>Commandé le</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(order.total_price)}</td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                        >
                                            <option value="en attente">En attente</option>
                                            <option value="Prête">Prête</option>
                                            <option value="Annulé">Annulé</option>
                                        </select>
                                    </td>
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

export default AdminDashboard;
