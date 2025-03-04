import pool from "../config/db.js";

class Order {
    // Insérer une nouvelle commande
    static async insertOrder(connection, user_id, total_price, pickup_time) {
        const INSERT_ORDER =
            "INSERT INTO orders (user_id, total_price, pickup_time) VALUES(?,?,?)";
        return await connection.execute(INSERT_ORDER, [user_id, total_price, pickup_time]);
    }

    // Insérer un produit commandé
    static async insertOrderedProduct(connection, order_id, { id: product_id, quantity, unit_price }) {
        const INSERT_ORDERED_PRODUCT =
            "INSERT INTO orderproducts (order_id, product_id, quantity, unit_price) VALUES(?,?,?,?)";
        return await connection.execute(INSERT_ORDERED_PRODUCT, [order_id, product_id, quantity, unit_price]);
    }

    // Récupérer toutes les commandes d'un utilisateur (ou toutes les commandes si admin)
    static async findAllUserOrders(user_id, isAdmin = false) {
        let FIND_ALL;
        if (isAdmin) {
            FIND_ALL = "SELECT orders.id, created_at, status, total_price FROM orders";
        } else {
            FIND_ALL = "SELECT orders.id, created_at, status, total_price FROM orders WHERE user_id = ?";
        }
        return await pool.execute(FIND_ALL, isAdmin ? [] : [user_id]);
    }

    // Récupérer une commande spécifique par son ID (pour un utilisateur ou pour un admin)
    static async findUserOrderById(user_id, order_id, isAdmin = false) {
        let FIND_ALL;
        if (isAdmin) {
            FIND_ALL = "SELECT orders.id, created_at, total_price FROM orders WHERE orders.id = ?";
        } else {
            FIND_ALL = "SELECT orders.id, created_at, total_price FROM orders WHERE user_id = ? AND orders.id = ?";
        }
        return await pool.execute(FIND_ALL, isAdmin ? [order_id] : [user_id, order_id]);
    }

    // Récupérer les détails d'une commande avec les produits associés (pour un utilisateur ou pour un admin)
    static async findUserOrderWithDetails(user_id, order_id, isAdmin = false) {
        let FIND_ALL;
        if (isAdmin) {
            FIND_ALL = `
                SELECT o.id AS order_id, o.status, o.created_at, o.total_price, p.id AS product_id, p.label, op.quantity, op.unit_price 
                FROM orders AS o
                LEFT JOIN orderproducts AS op ON o.id = op.order_id
                LEFT JOIN products AS p ON op.product_id = p.id
                WHERE o.id = ?;
            `;
        } else {
            FIND_ALL = `
                SELECT o.id AS order_id, o.status, o.created_at, o.total_price, p.id AS product_id, p.label, op.quantity, op.unit_price 
                FROM orders AS o
                LEFT JOIN orderproducts AS op ON o.id = op.order_id
                LEFT JOIN products AS p ON op.product_id = p.id
                WHERE o.user_id = ? AND o.id = ?;
            `;
        }
        return await pool.execute(FIND_ALL, isAdmin ? [order_id] : [user_id, order_id]);
    }

    // Mettre à jour le statut d'une commande
    static async updateOrderStatus(order_id, status) {
        const UPDATE_STATUS = "UPDATE orders SET status = ? WHERE id = ?";
        return await pool.execute(UPDATE_STATUS, [status, order_id]);
    }
}

export default Order;