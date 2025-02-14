import { queryDB } from "../db/db.js";

export async function createUser(req, res) {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ message: "Faltan datos" });
    }

    try {
        const result = await queryDB(
            "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
            [username, email]
        );
        res.status(201).json({ message: "Usuario creado", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creando usuario" });
    }
}

export async function getUsers(req, res) {
    try {
        const result = await queryDB("SELECT * FROM users");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo usuarios" });
    }
}
