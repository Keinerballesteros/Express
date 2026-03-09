import {Router} from "express"
import { MongoClient, ObjectId } from "mongodb";

const router = Router();
// driver :// usuario:contraseña @ ip:port / nombre base de datos
const client = new MongoClient("mongodb://localhost:27017")

const connection = async() => {
    try{
        await client.connect();
        return client.db("test")
    }catch(e){
        console.log("===================ERROR================")
        console.log(e);
    }
}

router.get("/post", async(req,res) =>{
    const db = await connection();
    const tournament = db.collection("tournament")
    const result = tournament.insertOne({
        "nombre" : "Keiner",
        "apellido" : "Ballesteros"
    })

    res.json(result)
} )

router.get("/getmongo/:id", async (req,res)=> {
    const { id } = req.params;
    const db = await connection();
    const tournament = db.collection("tournament")
    console.log(id);
    const objectId = new ObjectId(id)
    const result = await tournament.findOne({
        nombre : "Keiner"
    })
    res.json(result)
})

export default router;