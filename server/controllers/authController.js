import { queryDB } from "../db/db.js";
import { comparePassword } from "../utils/bcryptWrapper.js";

export async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Faltan datos" });
    }

    try {
        const result = await queryDB("SELECT id, nombre, email, password FROM usuarios WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const user = result.rows[0];
        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        req.session.user = { id: user.id, nombre: user.nombre, email: user.email };
        res.json({ message: "Inicio de sesión exitoso", user: req.session.user });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error en el inicio de sesión" });
    }
}
