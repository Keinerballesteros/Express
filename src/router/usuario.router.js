import {Router} from "express"
import express from "express"
import usuarioController from "../controller/usuario.controller.js"

const router = Router()

router.use(express.json())
router.get("/get",usuarioController.getUsuario)
router.post("/post",usuarioController.postUsuario)
router.post("/postMultiple", usuarioController.postUsuarioMultiple)
router.delete("/",usuarioController.deleteUsuario)
router.put("/updateSaldo/:id", usuarioController.updateSaldo)
router.get("/search/:saldo", usuarioController.searchUsuario)
router.get("/usuarioPaisCorreo", usuarioController.usuarioPaisCorreo)
router.delete("/delete/:id", usuarioController.deleteUsuario)
router.get("/totalApostado/id", usuarioController.totalApostado)
export default router;



