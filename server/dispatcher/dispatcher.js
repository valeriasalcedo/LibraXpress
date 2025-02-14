import * as AuthController from "../controllers/authController.js";
import * as UserController from "../controllers/userController.js";
import * as SessionController from "../controllers/sessionController.js";

class Dispatcher {
    static async toProcess(req, res) {
        try {
            const { module, action } = req.body;

            if (!module || !action) {
                return res.status(400).json({ message: "Módulo y acción requeridos" });
            }

            const modules = {
                auth: AuthController,
                user: UserController,
                session: SessionController
            };

            if (!modules[module]) {
                return res.status(404).json({ message: `Módulo '${module}' no encontrado` });
            }

            const targetModule = modules[module];
            if (typeof targetModule[action] !== "function") {
                return res.status(404).json({ message: `Acción '${action}' no encontrada en módulo '${module}'` });
            }

            await targetModule[action](req, res);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno en el Dispatcher" });
        }
    }
}

export default Dispatcher;
