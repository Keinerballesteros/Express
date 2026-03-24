import { Router } from 'express';
import ApuestaRoute from './apuesta.router.js';
import mongo from './mongo.router.js';
import UsuarioRouter from './usuario.router.js'

const router = Router();
router.use(ApuestaRoute);
router.use(mongo);
router.use( "/usuario", UsuarioRouter);

export default router;
