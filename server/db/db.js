import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configuración de la conexión a PostgreSQL
const { Pool } = require('pg');

// Imprimir las variables de entorno para verificar que se están cargando correctamente
console.log({
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});

// Crear el pool de conexiones
const pool = new Pool({
    user: process.env.DB_USER || 'postgres', // Valor predeterminado: 'postgres'
    password: process.env.DB_PASSWORD || '1',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'LibraXpress',
    port: process.env.DB_PORT || 5432,
  });
module.exports = pool;
// Función para ejecutar consultas SQL
const queryDB = async (query, values) => {
    try {
        const result = await pool.query(query, values);
        return result;
    } catch (error) {
        console.error('Error en la consulta SQL:', error.message);
        throw new Error('Error en la base de datos');
    }
};

export { queryDB };