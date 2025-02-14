import express from "express";
import Dispatcher from "../dispatcher/dispatcher.js";

const router = express.Router();

router.post("/toProcess", Dispatcher.toProcess);

export default router;
