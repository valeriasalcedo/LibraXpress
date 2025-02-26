import { queryDB } from '../db/db.js';
import bcrypt from 'bcrypt';

// Función para el login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Consulta SQL para obtener el usuario por email
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const values = [email];

        const result = await queryDB(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        // Comparar la contraseña encriptada
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Si todo está bien, devolver el usuario (sin la contraseña)
        const { password: _, ...userData } = user; // Excluir la contraseña de la respuesta
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export { login };