import { queryDB } from "../db/db.js";
import { hashPassword } from "../utils/bcryptWrapper.js";

export async function createUser(req, res) {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: "Faltan datos" });
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await queryDB("SELECT id FROM usuarios WHERE email = $1", [normalizedEmail]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: "El correo ya está registrado" });
        }

        const hashedPassword = await hashPassword(password.trim());

        const result = await queryDB(
            "INSERT INTO usuarios (nombre, email, password, creado_en) VALUES ($1, $2, $3, NOW()) RETURNING id, nombre, email",
            [nombre.trim(), normalizedEmail, hashedPassword]
        );

        res.status(201).json({ message: "Usuario creado exitosamente", user: result.rows[0] });
    } catch (error) {
        console.error(" Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
}