import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: process.env.DB_HOST,       
	database: process.env.DB_NAME,   
	user: process.env.DB_USER,       
	password: process.env.DB_PASSWORD,   
	port: process.env.DB_PORT,
});

pool.getConnection()
	.then((res) => console.log(`Connected to ${res.config.database} database`))
	.catch((err) => console.log(err));

export default pool;
