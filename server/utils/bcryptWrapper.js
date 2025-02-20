import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Genera un hash seguro de una contraseña.
 * @param {string} password - La contraseña en texto plano.
 * @returns {Promise<string>} - La contraseña encriptada.
 */
export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error("Error en hashPassword:", error);
        throw new Error("Error al encriptar la contraseña.");
    }
}

/**
 * Compara una contraseña en texto plano con un hash almacenado.
 * @param {string} password - La contraseña ingresada por el usuario.
 * @param {string} hashedPassword - La contraseña encriptada almacenada en la BD.
 * @returns {Promise<boolean>} - Devuelve `true` si la contraseña coincide, `false` en caso contrario.
 */
export async function comparePassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error en comparePassword:", error);
        throw new Error("Error al verificar la contraseña.");
    }
}
