import pg from "pg";

const { Pool } = pg;
const isTestMode = process.env.TEST_MODE === "true";

console.log("🔹 TEST_MODE:", isTestMode ? "Modo de prueba activado" : "Modo normal (PostgreSQL)");

const fakeUsers = [
    { id: 1, username: "admin", password: "1234", email: "admin@test.com" },
    { id: 2, username: "valeria", password: "contraseña123", email: "valeria@email.com" }
];

const pool = isTestMode ? null : new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const queryDB = async (query, values) => {
    if (isTestMode) {
        console.log("🔹 Modo de prueba activado. Simulando consulta:", query, values);

        if (query.startsWith("SELECT * FROM users WHERE username =")) {
            return { rows: fakeUsers.filter(user => user.username === values[0]) };
        }
        if (query.startsWith("SELECT * FROM users")) {
            return { rows: fakeUsers };
        }
        return { rows: [] };
    }
    return await pool.query(query, values);
};

export { queryDB, isTestMode };
