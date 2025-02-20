import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const queryDB = async (query, values) => {
    try {
        return await pool.query(query, values);
    } catch (error) {
        console.error("Error en la consulta SQL:", error);
        throw new Error("Error en la base de datos");
    }
};

export { queryDB };