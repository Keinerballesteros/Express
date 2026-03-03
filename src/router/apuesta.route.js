import {Router} from "express"
import { createClient } from "redis";

const router = Router();
const redis = createClient({ url: 'redis://localhost:6379'});
redis.connect();

router.get("/apuesta", (req,res) =>{
    res.send("Hola apuesta")
} )

router.get("/save", async (req,res)=> {
    const json = {
        "nombre" : "Keiner",
        "apellido" : "Ballesteros"
    }

    let a = await redis.set('info:03578',
        JSON.stringify(json), {
            EX:300
        })
    res.send(a);
})

router.get("/get", async (req,res)=>{
    const data = await redis.get('info:03578');
    const json = JSON.parse(data)
    console.log(json)
    res.send(json)
})

router.get("/update", async (req,res) =>{
    const edad = 20;
    const data = await redis.get('info:03578');
    if(!data){
        return res.json({'success':false, 'data':[], 'msg': 'Not found'}, 404)
    }
    let json = JSON.parse(data);
    json.edad = edad;
    let a = await redis.set('info:03578', 
        JSON.stringify(json),{
            EX:300
        }
    )
    res.send({"success": a === 'OK' , data: json, msg:a});
})



router.get('/hset',async  (req,res) =>{
    const response = await redis.hSet('info:192197',{
        'name' : "Keiner",
        'lastname': "Martinez",
        'age' :32
    });

    await redis.expire('info:192197', 300)
    res.send(response);
})

router.get('/delete', async(req,res) => {
    // const data = await redis.del('info:192197')
    const data = await redis.hDel('info:192197', 'age')
    const response = await redis.hGetAll('info:192197')
    res.send(response);
})


router.get('/getHash', async(req,res)=>{
    const response = await redis.hGetAll('info:192197');
    const ttl = await redis.ttl('info:192197')
    res.json({success: true, data: response, ttl})
})


export default router;