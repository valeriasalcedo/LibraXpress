import * as AuthController from "../controllers/authController.js";
import * as UserController from "../controllers/userController.js";
import * as SessionController from "../controllers/sessionController.js";

class Dispatcher {
    static async toProcess(req, res) {
        try {
            const { module, action } = req.body;

            // Validar que los campos existen
            if (!module || !action) {
                return res.status(400).json({ message: "Módulo y acción requeridos" });
            }

            const modules = {
                auth: AuthController,
                user: UserController,
                session: SessionController
            };

            // Verificar que el módulo existe
            if (!modules[module]) {
                return res.status(404).json({ message: `Módulo '${module}' no encontrado` });
            }

            const targetModule = modules[module];

            // Verificar que la acción existe y es una función
            if (!(action in targetModule) || typeof targetModule[action] !== "function") {
                return res.status(404).json({ message: `Acción '${action}' no encontrada en módulo '${module}'` });
            }

            // Ejecutar la acción correspondiente
            await targetModule[action](req, res);

        } catch (error) {
            console.error(" Error en Dispatcher:", error);
            res.status(500).json({ message: "Error interno en el Dispatcher" });
        }
    }
}

export default Dispatcher;
