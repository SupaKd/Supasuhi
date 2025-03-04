import pool from "../config/db.js";

class User {
	static async findAll() {
		const SELECT_ALL = "SELECT id, firstname, lastname, email, role, created_at FROM users";
		return await pool.query(SELECT_ALL);
	}

    static async findOne(id) {
        const SELECT_ONE = "SELECT id, firstname, lastname, email, created_at FROM users WHERE id = ?";
        const [rows] = await pool.query(SELECT_ONE, [id]); 
        return rows; // Retourne les lignes directement
    }
    

    static async update(userInfos) {
		const UPDATE_USER = "UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?";
		return await pool.execute(UPDATE_USER, [...Object.values(userInfos)]);
	}

	static async delete(id) {
		const DELETE_USER = "DELETE FROM users WHERE id = ?";
		return await pool.execute(DELETE_USER, [id]);
	}
}


export default User;
