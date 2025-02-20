import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "strict"
    }
});

export default sessionMiddleware;