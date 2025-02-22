import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, deleteUser, setProducts, deleteProduct } from "../../../features/adminSlice";

function AdminDashboard() {
    const dispatch = useDispatch();
    const { users, products, loading, error } = useSelector((state) => state.admin);

    const [showUsers, setShowUsers] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
  
    async function fetchUsers() {
        dispatch(setLoading(true));
        try {
            const response = await fetch("http://localhost:9000/api/v1/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();

            if (!data.datas || data.datas.length === 0) {
                dispatch(setError("Aucun utilisateur disponible."));
            } else {
                dispatch(setUsers(data.datas));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function fetchProducts() {
        dispatch(setLoading(true));
        try {
            const response = await fetch("http://localhost:9000/api/v1/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();

            if (!data.datas || data.datas.length === 0) {
                dispatch(setError("Aucun produit disponible."));
            } else {
                dispatch(setProducts(data.datas));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleDeleteUser(userId) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            dispatch(setLoading(true));
            try {
                await fetch(`http://localhost:9000/api/v1/admin/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                dispatch(deleteUser(userId));
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        }
    }

    async function handleDeleteProduct(productId) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            try {
                await fetch(`http://localhost:9000/api/v1/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                dispatch(deleteProduct(productId));
            } catch (err) {
                dispatch(setError("Erreur lors de la suppression du produit"));
            }
        }
    }


    return (
        <main className="dashboard">
            <h1>Dashboard Administrateur</h1>
            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={() => { setShowUsers(!showUsers); if (!showUsers) fetchUsers(); }}>
                {showUsers ? "Masquer la liste des utilisateurs" : "Afficher la liste des utilisateurs"}
            </button>
            <button onClick={() => { setShowProducts(!showProducts); if (!showProducts) fetchProducts(); }}>
                {showProducts ? "Masquer la liste des produits" : "Afficher la liste des produits"}
            </button>

            {showProducts && (
                <>
                    <h2>Liste des produits</h2>
                    
                    {products.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Description</th>
                                    <th>Prix</th>
                                    <th>Stock</th>
                                    <th>Catégorie</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.label}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price} €</td>
                                        <td>{product.stock}</td>
                                        <td>{product.category_id}</td>
                                        <td>
                                            <button onClick={() => handleDeleteProduct(product.id)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Aucun produit trouvé.</p>
                    )}
                </>
            )}

            {showUsers && (
                <>
                    <h2>Liste des utilisateurs</h2>
                    {users.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Rôle</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Aucun utilisateur trouvé.</p>
                    )}
                </>
            )}
        </main>
    );
}

export default AdminDashboard;
