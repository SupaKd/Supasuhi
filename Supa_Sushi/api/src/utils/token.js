import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_TOKEN;

export default ({ id,firstname, lastname, email, role }) => {
	const PAYLOAD = {
		userId: id,      
		firstname,       
		lastname,        
		email,           
		role,            
	};
	const OPTIONS = {
		expiresIn: "1d", 
	};

	return jwt.sign(PAYLOAD, SECRET, OPTIONS);
};
