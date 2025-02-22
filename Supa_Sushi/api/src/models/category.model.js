import pool from "../config/db.js";

class Category {
	static async insert(label) {
		const INSERT_CATEGORY = "INSERT INTO categories (label) VALUES (?)";
		return await pool.execute(INSERT_CATEGORY, [label]);
	}

	static async findAll() {
		const SELECT_ALL = "SELECT id, label FROM categories";
		return await pool.query(SELECT_ALL);
	}

	static async findOne(id) {
		const SELECT_ONE = "SELECT id, label FROM categories WHERE id = ?";
		return await pool.execute(SELECT_ONE, [id]);
	}

	static async update(label, id) {
		const UPDATE_CATEGORY = "UPDATE categories SET label = ? WHERE id = ?";
		return await pool.execute(UPDATE_CATEGORY, [label, id]);
	}

	static async delete(id) {
		const DELETE_CATEGORY = "DELETE FROM categories WHERE id = ?";
		return await pool.execute(DELETE_CATEGORY, [id]);
	}
}

export default Category;
