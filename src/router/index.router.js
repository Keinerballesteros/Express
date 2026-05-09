import { Router } from 'express';
import mongo from './mongo.router.js';
import UsuarioRouter from './usuario.router.js';
import EventoRouter from "./evento.router.js";
import ApuestaRouter from "./apuesta.router.js";
import AuthRouter from "./auth.router.js";
import { sendEmail } from '../services/email.service.js';
import { db } from '../services/firebase.service.js';

const router = Router();
// router.use(ApuestaRoute);
// router.use(mongo);
router.use( "/api//usuario", UsuarioRouter);
router.use("/api/evento", EventoRouter)
router.use("/api/apuesta", ApuestaRouter)
router.use("/auth",AuthRouter)


router.use("/email", async (req,res) =>{
    const salida = await sendEmail('123456')
    res.status(200).json({
        msn: 'enviado',
        salida
    })
})

router.use("/firebase-insert", async (req,res) =>{

    try{
        const dockRef = await db.collection("usuario").add(
            {
                name: "Nombre de Prueba",
                apellido: "Apellido de Prueba",
            }
        )

        res.send({data:dockRef, success:true})

    }catch(error){
        res.status(500).json({
            msn: 'error',
            error
        })
    }
})

export default router;
