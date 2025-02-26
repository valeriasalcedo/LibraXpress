import bcrypt from "bcrypt";
import { queryDB } from "./db/db.js";


async function crearUsuario(nombre, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [nombre, email, hashedPassword];

    try {
        const result = await queryDB(query, values);
        console.log("✅ Usuario creado:", result.rows[0]);
    } catch (error) {
        console.error("🔥 Error al crear usuario:", error);
    }
}

// Crear un usuario de prueba
crearUsuario("Juan Pérez", "juan.perez@email.com", "123456");

