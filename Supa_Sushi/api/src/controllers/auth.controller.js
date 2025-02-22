import { hash, genSalt, compare } from "bcrypt";

import createToken from "../utils/token.js";
import Auth from "../models/auth.model.js";

const register = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const hashedPassword = await hash(password, await genSalt());

        const response = await Auth.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        
        res.status(201).json({
            msg: "Utilisateur créé.",
            data: response,
        });
    } catch (error) {
        next(error);
    }
};


const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const [[user]] = await Auth.findUserForAuth(email);
        if (user && (await compare(password, user.password))) {
            const TOKEN = createToken(user);

            res.cookie("jwt", TOKEN, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 86400000,
            });

            // console.log("Token envoyé :", TOKEN);
            // console.log("Cookies envoyés :", res.getHeaders()["set-cookie"]); // 🟢 DEBUG

            res.json({
                msg: "Utilisateur connecté",
                user: { email: user.email, firstname: user.firstname, lastname: user.lastname, role:user.role }
            });
            return;
        }

        res.status(400).json({ msg: "Identifiants invalides." });
        return;
    } catch (error) {
        next(error);
    }
};



const logout = (req, res, next) => {
	res.clearCookie("jwt", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	});
	res.json({ msg: "Utilisateur bien déconnecté." });
};

const refreshLogin = async (req, res, next) => {
	res.json({ success: "Autorisé à se reconnecter.", user: { email: req.user.email, firstname: req.user.firstname, lastname: req.user.lastname } });
}

export { register, login, logout, refreshLogin };