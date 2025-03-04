import pool from "../config/db.js";
import Order from "../models/order.model.js";

// Passer une commande
const placeOrder = async (req, res, next) => {
    const userId = req.user.userId;
    const { total_price, products, pickup_time } = req.body;

    if (!products || !products.length) {
        res.status(400).json({ error: "Aucun produit dans la commande." });
        return;
    }

    if (!pickup_time) {
        res.status(400).json({ error: "L'heure de récupération est requise." });
        return;
    }

    let connection = null;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [orderResult] = await Order.insertOrder(connection, userId, total_price, pickup_time);
        const orderId = orderResult.insertId;

        for (const product of products) {
            await Order.insertOrderedProduct(connection, orderId, product);
        }

        await connection.commit();
        connection.release();

        res.status(201).json({
            message: "Commande passée avec succès.",
            orderId,
        });
        return;
    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        next(error);
    }
};

// Récupérer toutes les commandes de l'utilisateur (ou toutes les commandes si admin)
const getAllUserOrders = async (req, res, next) => {
    const user_id = req.user.userId;
    const isAdmin = req.user.role === 'admin'; // Vérifier si l'utilisateur est un admin

    try {
        const [orders] = await Order.findAllUserOrders(user_id, isAdmin);

        if (!orders) {
            res.status(400).json({ error: "Aucunes commandes pour cet utilisateur." });
            return;
        }
        res.json({ success: "Commandes récupérées", orders });
    } catch (error) {
        next(error);
    }
};

// Récupérer une commande spécifique par son ID (pour un utilisateur ou pour un admin)
const getUserOrderById = async (req, res, next) => {
    const userId = req.user.userId;
    const isAdmin = req.user.role === 'admin'; // Vérifier si l'utilisateur est un admin
    const { orderId } = req.params;

    try {
        const [orderDetails] = await Order.findUserOrderWithDetails(userId, orderId, isAdmin);

        if (!orderDetails.length) {
            res.status(404).json({ error: "Aucune commande trouvée avec ces identifiants." });
            return;
        }

        const orderInfo = {
            id: orderDetails[0].order_id,
            created_at: orderDetails[0].created_at,
            total_price: parseFloat(orderDetails[0].total_price),
            status: orderDetails[0].status,
            products: orderDetails.map((item) => ({
                id: item.product_id,
                label: item.label,
                quantity: item.quantity,
                unit_price: parseFloat(item.unit_price),
            })),
        };

        res.status(200).json({ success: "Commande récupérée", order: orderInfo });
    } catch (error) {
        next(error);
    }
};

// Mettre à jour le statut d'une commande
const updateOrderStatus = async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
        res.status(400).json({ error: "Le statut est requis." });
        return;
    }

    try {
        await Order.updateOrderStatus(orderId, status);
        res.status(200).json({ success: "Statut de la commande mis à jour." });
    } catch (error) {
        next(error);
    }
};

export { placeOrder, getAllUserOrders, getUserOrderById, updateOrderStatus };
