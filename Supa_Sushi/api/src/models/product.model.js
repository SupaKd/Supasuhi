import pool from "../config/db.js";

class Product {
	static async insert({ label, description, price, categoryId, stock }) {
		const INSERT_PRODUCT =
			"INSERT INTO products (label, description, price, category_id, stock) VALUES (?,?,?,?,?)";
		return await pool.execute(INSERT_PRODUCT, [
			label,
			description,
			price,
			categoryId,
			stock,
		]);
	}

	static async insertImage({ productId, url, is_primary }) {
		const INSERT_IMAGE =
			"INSERT INTO images (product_id, url, is_primary) VALUES (?,?,?)";
		return await pool.execute(INSERT_IMAGE, [productId, url, is_primary]);
	}

	static async findAll() {
		const SELECT_ALL =
			"SELECT products.id, products.label, products.description,  products.price,  products.stock, products.category_id, products.created_at, JSON_ARRAYAGG(images.url) AS image_urls FROM products LEFT JOIN images ON products.id = images.product_id GROUP BY  products.id, products.label, products.description, products.price, products.stock,  products.category_id, products.created_at";
		return await pool.query(SELECT_ALL);
	}

	static async findBySearch(search) {
		console.log(search);
		const SELECT_ALL =
			"SELECT products.id, products.label, products.description, products.price, products.stock, products.category_id, products.created_at,JSON_ARRAYAGG(images.url) AS image_urls FROM products LEFT JOIN images ON products.id = images.product_id WHERE products.label LIKE ? GROUP BY products.id, products.label, products.description, products.price, products.stock, products.category_id, products.created_at";
		return await pool.execute(SELECT_ALL, [search]);
	}

	static async findOne(id) {
		const SELECT_ALL =
			"SELECT products.id, products.label, products.description,  products.price,  products.stock, products.category_id, products.created_at,JSON_ARRAYAGG(images.url) AS image_urls FROM products LEFT JOIN images ON products.id = images.product_id GROUP BY  products.id,   products.label,    products.description,  products.price,  products.stock,  products.category_id, products.created_at HAVING products.id = ?";
		return await pool.execute(SELECT_ALL, [id]);
	}

	static async update(product) {
        console.log(product)
		const UPDATE_PRODUCT =
			"UPDATE products SET label = ?, description = ?, price = ?, category_id = ?, stock = ? WHERE id = ?";
		return await pool.execute(UPDATE_PRODUCT, [ ...Object.values(product)
		]);
	}

	static async delete(id) {
		const DELETE_CATEGORY = "DELETE FROM products WHERE id = ?";
		return await pool.query(DELETE_CATEGORY, [id]);
	}
}
export default Product;
