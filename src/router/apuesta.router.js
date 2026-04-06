import { Router } from "express";
import express from "express";
import apuestaController from "../controller/apuesta.controller.js";

const router = Router();

router.use(express.json());

router.get("/get", apuestaController.getApuesta);
router.get("/get/usuario/:usuarioId", apuestaController.getApuestaPorUsuario);
router.post("/post", apuestaController.postApuesta);
router.put("/update/:id/estado", apuestaController.actualizarEstadoApuesta);

export default router;