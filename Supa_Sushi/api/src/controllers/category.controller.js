import Category from "../models/category.model.js";
import sendResponse from "../utils/sendResponse.js";

// CREATE
const create = async (req, res, next) => {
	try {
		const [response] = await Category.insert(req.body.label);
		if (response.insertId) {
			res.status(201).json({ message: "Catégorie ajoutée." });
			return;
		}
		res.status(400).json({
            message: "Un problème est survenu lors de l'ajout de la catégorie. Veuillez vérifier les données envoyées.",
        });        
		return;
	} catch (error) {
		next(error);
	}
};

// READ
const getAll = async (req, res, next) => {
	try {
		const [response] = await Category.findAll();
        
        if(response.length){
            sendResponse(res, "Catégories récupérées.", 200, response);
			return;
        }
        sendResponse(res, "Aucune catégorie récupérée.", 400);
        return;
	} catch (error) {
		next(error);
	}
};

const getOne = async (req, res, next) => {
    const {id} = req.params;
	try {
		const [response] = await Category.findOne(id);
        if(response.length){
            res.json({ message: "Catégorie récupérée.", datas : response[0] });
			return;
        }
        res.status(400).json({
			message: "Cette catégorie n'existe pas.",
		});
	} catch (error) {
		next(error);
	}
};

// UPDATE
const update = async (req, res, next) => {
	try {
		const [response] = await Category.update(req.body.label, req.params.id);
		if (response.affectedRows) {
			res.status(201).json({ message: "Catégorie modifiée." });
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

// DELETE
const remove = async (req, res, next) => {
	try {
		const [response] = await Category.delete(req.params.id);
		if (response.affectedRows) {
			res.json({ message: "Catégorie supprimé." });
			return;
		}
		res.status(400).json({
			message: "Cette catégorie n'existe pas.",
		});
		return;
	} catch (error) {
		next(error);
	}
};

export { create, getAll, getOne, update, remove };
