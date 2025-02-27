// middlewares/authMiddleware.js
export function isAuthenticated(req, res, next) {
    // Verificar si el usuario está autenticado
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: "No autorizado. Inicie sesión para continuar." });
    }
  
    // Verificar si el usuario es un administrador
    const userRole = req.session.user.tipo_perfil; // Asume que el rol del usuario está en la sesión
    if (userRole !== 'admin') {
      return res.status(403).json({ message: "Solo los administradores pueden realizar esta acción." });
    }
  
    // Si el usuario está autenticado y es un administrador, continuar
    next();
  }