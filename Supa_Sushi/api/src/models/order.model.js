import pool from "../config/db.js";

class Order {
	static async insertOrder(connection, user_id, total_price, pickup_time) {
		const INSERT_ORDER =
			"INSERT INTO orders (user_id, total_price, pickup_time) VALUES(?,?,?)";
		return await connection.execute(INSERT_ORDER, [user_id, total_price, pickup_time]);
	}
	
	

	static async insertOrderedProduct(
		connection,
		order_id,
		{ id : product_id, quantity, unit_price }
	) {
		const INSERT_ORDERED_PRODUCT =
			"INSERT INTO orderproducts (order_id, product_id, quantity, unit_price) VALUES(?,?, ?,?)";
		return await connection.execute(INSERT_ORDERED_PRODUCT, [
			order_id,
			product_id,
			quantity,
			unit_price,
		]);
	}

	static async findAllUserOrders(user_id) {
		const FIND_ALL =
			"SELECT orders.id, created_at, status, total_price FROM orders WHERE user_id = ?";
		return await pool.execute(FIND_ALL, [user_id]);
	}

	static async findUserOrderById(user_id, order_id) {
		const FIND_ALL =
			"SELECT orders.id, created_at, total_price FROM orders WHERE user_id = ? AND orders.id = ?";
		return await pool.execute(FIND_ALL, [user_id, order_id]);
	}

	static async findUserOrderWithDetails(user_id, order_id) {
		const FIND_ALL = `
            SELECT o.id AS order_id, o.status, o.created_at, o.total_price, p.id AS product_id, p.label, op.quantity, op.unit_price 
            FROM orders AS o
            LEFT JOIN orderproducts AS op ON o.id = op.order_id
            LEFT JOIN products AS p ON op.product_id = p.id
            WHERE o.user_id = ? AND o.id = ?;

        `;
		return await pool.execute(FIND_ALL, [user_id, order_id]);
	}

}

export default Order;
