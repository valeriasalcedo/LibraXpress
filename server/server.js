import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mainRoutes from "./routes/mainRoutes.js";
import sessionMiddleware from "./sessions/sessionwrapper.js";
import { queryDB } from "./db/db.js"; // Importa la función queryDB

// Configura dotenv para cargar variables de entorno
dotenv.config();

// Crea la aplicación Express
const app = express();

// Configura CORS
app.use(cors({
    origin: "http://localhost:3000", // Permite solicitudes desde este origen
    credentials: true // Permite el envío de cookies y encabezados de autenticación
}));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejar sesiones
app.use(sessionMiddleware);

// Usa las rutas principales
app.use("/", mainRoutes);

// Función para probar la conexión a la base de datos
const testConnection = async () => {
    try {
        const result = await queryDB('SELECT NOW()');
        console.log('Conexión exitosa:', result.rows[0]);
    } catch (error) {
        console.error('Error en la conexión:', error);
    }
};

// Llama a la función para probar la conexión
testConnection();

// Define el puerto y arranca el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

    app.use("/", mainRoutes);

// Log para verificar las rutas registradas
console.log("Rutas registradas:");
app._router.stack.forEach((layer) => {
    if (layer.route) {
        console.log(`${layer.route.stack[0].method.toUpperCase()} ${layer.route.path}`);
    }
});
});