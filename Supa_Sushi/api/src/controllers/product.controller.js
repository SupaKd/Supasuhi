import formidable from "formidable";
import path from "path";
import Product from "../models/product.model.js";
import sendResponse from "../utils/sendResponse.js";

// CREATE
const add = async (req, res, next) => {
	const form = formidable({
		uploadDir: path.join(process.cwd(), "public", "uploads", "images"), // Dossier des uploads
		keepExtensions: true, // Conserver l'extension originale
		multiples: true, // Gérer plusieurs fichiers
	});

	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error("Erreur formidable :", err);
			res.status(500).json({
				message: "Erreur lors de l'analyse du formulaire.",
			});
			return;
		}

		// Construction des données du produit
		const product = {
			label: fields.label?.[0] || fields.label,
			description: fields.description?.[0] || fields.description,
			price: parseFloat(fields.price?.[0] || fields.price),
			categoryId: parseInt(
				fields.categoryId?.[0] || fields.categoryId,
				10
			),
			stock: parseInt(fields.stock?.[0] || fields.stock, 10),
		};

		try {
			// 1. Insertion du produit
			const [response] = await Product.insert(product);
			if (!response.insertId) {
				res.status(400).json({
					message: "Échec de l'ajout du produit.",
				});
				return;
			}
			const productId = response.insertId;

			// 2. Gestion des images (si présentes)
			const images = files.image
				? Array.isArray(files.image)
					? files.image // Plusieurs fichiers
					: [files.image] // Un seul fichier
				: [];
                
			if (images.length) {
				const imageInserts = images.map((file, index) => ({
					productId,
					url: path
						.join("/uploads/images", file.newFilename)
						.replace(/\\/g, "/"),
					is_primary: index === 0 ? 1 : 0, // La première image est primaire
				}));

				for (const img of imageInserts) {
					await Product.insertImage(img); // Ajout de chaque image en base
				}
			}

			// 3. Réponse finale
			res.status(201).json({
				message:
					images.length > 0
						? "Produit et images ajoutés."
						: "Produit ajouté.",
			});
		} catch (error) {
			console.error("Erreur lors de l'ajout :", error);
			res.status(500).json({
				message: "Erreur lors de l'ajout du produit ou des images.",
			});
		}
	});
};

const getAll = async (req, res, next) => {
	try {
		const [response] = await Product.findAll();

		if (response.length) {
			sendResponse(res, "Produits récupérées.", 200, response);
			return;
		}
		sendResponse(res, "Aucuns produits récupérées.", 400);
		return;
	} catch (error) {
		next(error);
	}
};

const getBySearch = async (req, res, next) => {
	const formattedSearch = `%${req.query.q.trim() || ""}%`;
	try {
		const [response] = await Product.findBySearch(formattedSearch);

		if (response.length) {
			sendResponse(res, "Produits récupérées.", 200, response);
			return;
		}
		sendResponse(res, "Aucuns produits récupérées.", 400);
		return;
	} catch (error) {
		next(error);
	}
};

const getOne = async (req, res, next) => {
	try {
		const [response] = await Product.findOne(req.params.id);

		if (response.length) {
			sendResponse(res, "Produit récupéré.", 200, response);
			return;
		}
		sendResponse(res, "Aucun produit récupéré.", 400);
		return;
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	const { label, description, price, category_id, stock } = req.body;
	const product = {
		label,
		description,
		price,
		category_id,
		stock,
		id: parseInt(req.params.id, 10),
	};
	try {
		const [response] = await Product.update(product);
		if (response.affectedRows) {
			res.status(201).json({ message: "Produit modifié." });
			return;
		}
		res.status(400).json({
			message: "Un problème est survenue, veuillez recommencer.",
		});
		return;
	} catch (error) {
		next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const [response] = await Product.delete(req.params.id);
		if (response.affectedRows) {
			res.json({ message: "Produit supprimé." });
			return;
		}
		res.status(400).json({
			message: "Ce produit n'existe pas.",
		});
		return;
	} catch (error) {
		next(error);
	}
};

export { add, getAll, getBySearch, getOne, update, remove };
