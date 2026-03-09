import { Router } from 'express';
import ApuestaRoute from './apuesta.router.js';
import mongo from './mongo.router..js';


const router = Router();
router.use(ApuestaRoute);
router.use(mongo);
export default router;
