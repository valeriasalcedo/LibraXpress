import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

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

// Prueba la conexión a la base de datos
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos:', res.rows[0]);
    }
});

// Exporta el pool y la función queryDB
export default pool;
export { queryDB };