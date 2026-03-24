import {Router} from "express"
import express from "express"
import usuarioController from "../controller/usuario.controller.js"

const router = Router()

router.use(express.json())
router.get("/get",usuarioController.getUsuario)
router.post("/post",usuarioController.postUsuario)
router.delete("/",usuarioController.deleteUsuario)
router.put("/", usuarioController.putUsuario)


export default router;



