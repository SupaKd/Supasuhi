import Joi from "joi";

const registerSchema = Joi.object({
	firstname: Joi.string()
		.min(2)
		.max(50)
		.required()
		.messages({
			"string.empty": "Le prénom est requis.",
			"string.min": "Le prénom doit contenir au moins 2 caractères.",
			"string.max": "Le prénom ne doit pas contenir plus de 50 caractères.",
		}),
	lastname: Joi.string()
		.min(2)
		.max(50)
		.required()
		.messages({
			"string.empty": "Le nom est requis.",
			"string.min": "Le nom doit contenir au moins 2 caractères.",
			"string.max": "Le nom ne doit pas contenir plus de 50 caractères.",
		}),
	email: Joi.string()
		.email()
		.required()
		.messages({
			"string.empty": "L'email est requis.",
			"string.email": "L'email doit être une adresse email valide.",
		}),
	password: Joi.string()
		.min(8)
		.required()
		.messages({
			"string.empty": "Le mot de passe est requis.",
			"string.min": "Le mot de passe doit contenir au moins 8 caractères.",
		}),
});

const loginSchema = Joi.object({
	email: Joi.string()
		.required()
		.messages({
			"string.empty": "L'email est requis.",
		}),
	password: Joi.string()
		.required()
		.messages({
			"string.empty": "Le mot de passe est requis.",
		}),
});

export { registerSchema, loginSchema };