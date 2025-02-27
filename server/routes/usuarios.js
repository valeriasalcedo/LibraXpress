import express from 'express';
import { queryDB } from '../db/db.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js'; // Importa el middleware

const router = express.Router();

// Endpoint para obtener el usuario actual
router.get('/api/usuario-actual', isAuthenticated, async (req, res) => {
  try {
    // Asume que el ID del usuario está en la sesión o en el token
    const userId = req.session.user.id; // O req.user.id si usas autenticación por token

    const result = await queryDB('SELECT id, nombre, email, tipo_perfil FROM usuarios WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]); // Devuelve los datos del usuario
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    res.status(500).json({ message: 'Error interno en el servidor' });
  }
});

// Endpoint para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    // Selecciona todas las columnas necesarias
    const result = await queryDB('SELECT id, nombre, email, documento, tipo_perfil FROM usuarios');
    res.json(result.rows); // Devuelve los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno en el servidor' });
  }
});

// Endpoint para actualizar el tipo de perfil de un usuario
router.put('/:id', isAuthenticated, async (req, res) => { // Agrega el middleware aquí
  const { id } = req.params;
  const { tipo_perfil } = req.body;

  // Validar que el tipo de perfil esté presente
  if (!tipo_perfil) {
    return res.status(400).json({ message: 'El campo tipo_perfil es requerido' });
  }

  try {
    // Actualiza el tipo de perfil y devuelve los datos actualizados
    const result = await queryDB(
      'UPDATE usuarios SET tipo_perfil = $1 WHERE id = $2 RETURNING id, nombre, email, documento, tipo_perfil',
      [tipo_perfil, id]
    );

    // Verificar si se actualizó algún registro
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Perfil actualizado', user: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ message: 'Error interno en el servidor' });
  }
});

export default router;