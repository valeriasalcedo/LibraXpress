export async function setSession(req, res) {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).json({ message: "Clave y valor requeridos" });
    }
    req.session[key] = value;
    res.json({ message: `Sesión establecida para ${key}` });
}

export async function getSession(req, res) {
    const { key } = req.body;
    if (!req.session[key]) {
        return res.status(404).json({ message: "No se encontró la sesión" });
    }
    res.json({ key, value: req.session[key] });
}

export async function destroySession(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Error al destruir la sesión" });
        }
        res.json({ message: "Sesión eliminada correctamente" });
    });
}

