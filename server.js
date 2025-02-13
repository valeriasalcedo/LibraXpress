const express = require('express');
const cors = require('cors'); // Importar cors
const dotenv = require('dotenv');
const rutas = require('./server/routes/authRoutes');

dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET); 

const app = express();

// Habilitar CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permitir solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true 
}));

// Middleware para manejar JSON
app.use(express.json());

// Rutas principales
app.use('/', rutas);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
