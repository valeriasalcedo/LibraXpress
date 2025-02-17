import { queryDB, isTestMode } from "../db/db.js";

export async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Faltan datos" });
    }

    try {
        const result = await queryDB("SELECT * FROM users WHERE username = $1", [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const user = result.rows[0];

        if (password !== user.password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        req.session.user = { id: user.id, username: user.username, email: user.email };
        res.json({ message: "Inicio de sesión exitoso", user: req.session.user, testMode: isTestMode });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el inicio de sesión" });
    }
}
