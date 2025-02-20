export function isAuthenticated(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "No autorizado. Inicie sesión para continuar." });
    }
    next();
}