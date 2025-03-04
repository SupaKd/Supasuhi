import "dotenv/config";                     
import cors from "cors";                    
import express from "express";              
import cookieParser from "cookie-parser";   
import path from "path";   
                 

import router from "./router/index.routes.js";

const PORT = process.env.PORT || 9000;             
const HOST = process.env.DOMAIN || "localhost";    
const base_url = "/api/v1";                        

const app = express();

app.use(
	cors({
		origin: ["http://localhost:5173"], // Origines autorisées
		credentials: true,                                          // Autorise l'envoi de cookies dans les requêtes
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],     // Méthodes HTTP autorisées
		allowedHeaders: ["Content-Type", "Accept"], // En-têtes HTTP autorisés
	})
);


app.use(cookieParser());
app.use(express.json());
app.use(
	"/img",                                                                 
	express.static(path.join(process.cwd(), "public", "uploads", "images")) 
);

app.get("/", (req, res) => {
	res.json({ msg: "API is running" }); 
});

app.use(base_url, router);

app.use((err, req, res, next) => {
    
	if (err.code === "ER_DUP_ENTRY") {
		res.status(409).json({
			message: `Donnée déjà existante.`,
		});
		return;
	}
	res.status(500).json({
		msg: "Une erreur s'est produite. Veuillez réessayer plus tard.",
	});
	return;
});

app.listen(PORT, () => console.log(`running at http://${HOST}:${PORT}`));
