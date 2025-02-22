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

	static async delete(id, email, password) {
        // Récupérer l'utilisateur avec son email et son mot de passe hashé
        const GET_USER = "SELECT password FROM users WHERE id = ? AND email = ?";
        const [rows] = await pool.execute(GET_USER, [id, email]);

        if (rows.length === 0) {
            throw new Error("Utilisateur introuvable ou email incorrect.");
        }

        const user = rows[0];

        // Vérifier si le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect.");
        }

        // Si tout est OK, supprimer l'utilisateur
        const DELETE_USER = "DELETE FROM users WHERE id = ?";
        return await pool.execute(DELETE_USER, [id]);
    }
}


export default User;
