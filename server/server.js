import express from "express";
import dotenv from "dotenv";
import sessionMiddleware from "./sessions/sessionWrapper.js";
import mainRoutes from "./routes/mainRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(sessionMiddleware);
app.use("/", mainRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
