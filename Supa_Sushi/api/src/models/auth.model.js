import pool from "../config/db.js";

class Auth {
	static async findUserForAuth(email) {
		const SELECT_USER =
			"SELECT id, firstname, lastname, email, password, role FROM users WHERE email = ?";
		return await pool.execute(SELECT_USER, [email]);
	}

	static async createUser({ firstname, lastname, email, password }) {
		const INSERT_USER =
			"INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
		try {
			const result = await pool.execute(INSERT_USER, [firstname, lastname, email, password]);
			return result;
		} catch (error) {
			throw error;
		}
	}
	
}

export default Auth;