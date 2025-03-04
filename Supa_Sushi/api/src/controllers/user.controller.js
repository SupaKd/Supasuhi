import Auth from "../models/auth.model.js";
import User from "../models/user.model.js";

import createToken from "../utils/token.js";

const getAll = async (req, res, next) => {
    try {
        const [users] = await User.findAll();
        res.json({ datas: users });
    } catch (error) {
        next(error);
    }
};

const getInfos = async (req, res, next) => {
    const { userId } = req.user;
    try {
        const response = await User.findOne(userId); 
        if (response.length) { 
            res.json({ message: "Utilisateur récupéré.", datas: response[0] });
            return;
        }
        res.status(400).json({
            message: "Cet utilisateur n'existe pas.",
        });
    } catch (error) {
        next(error);
    }
};


const update = async (req, res, next) => {
	const { firstname, lastname, email } = req.body;

	const userInfos = {
		firstname,
		lastname,
		email,
		id: req.user.userId,
	};
    
	try {
		const [response] = await User.update(userInfos);
		if (response.affectedRows) {
			const [[user]] = await Auth.findUserForAuth(email);
			const TOKEN = createToken(user);

			res.cookie("jwt", TOKEN, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite:
					process.env.NODE_ENV === "production" ? "none" : "lax",
				maxAge: 86400000,
			});
			res.status(201).json({ success: "Utilisateur modifié." });
			return;
		}
		res.status(404).json({
			error: "Utilisateur introuvable ou aucune modification effectuée.",
		});
		return;
	} catch (error) {
		next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const [response] = await User.delete(req.user.userId);
		if (response.affectedRows) {
			res.clearCookie("jwt", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite:
					process.env.NODE_ENV === "production" ? "none" : "lax",
			});
			res.json({ message: "Compte supprimé." });
			return;
		}
		res.status(400).json({
			message: "Cet compte n'existe pas.",
		});
		return;
	} catch (error) {
		next(error);
	}
};

export { getAll, getInfos, update, remove };
