import { Router } from 'express';
import mongo from './mongo.router.js';
import UsuarioRouter from './usuario.router.js';
import EventoRouter from "./evento.router.js";
import ApuestaRouter from "./apuesta.router.js";
import AuthRouter from "./auth.router.js";

const router = Router();
// router.use(ApuestaRoute);
// router.use(mongo);
router.use( "/api//usuario", UsuarioRouter);
router.use("/api/evento", EventoRouter)
router.use("/api/apuesta", ApuestaRouter)
router.use("/auth",AuthRouter)

export default router;
