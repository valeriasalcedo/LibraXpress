import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mainRoutes from "./routes/mainRoutes.js";
import sessionMiddleware from "./sessions/sessionwrapper.js";

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json()); 

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(sessionMiddleware);
app.use("/", mainRoutes);

const testConnection = async () => {
    try {
        const result = await queryDB('SELECT NOW()');
        console.log('Conexión exitosa:', result.rows[0]);
    } catch (error) {
        console.error('Error en la conexión:', error);
    }
};
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

    
});