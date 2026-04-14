import { connectionTournament } from "../services/mongo.service.js"
import { EVENTO_COLLECTION } from "../constants/evento.const.js";
import { ObjectId } from "mongodb";

export const getCollection = async (req,res) => {
    const connection = await connectionTournament();
    const result = await connection.collection(EVENTO_COLLECTION)
    return result
}



export const getEventoModel = async() =>{
    getCollection().find({}).toArray();
    return result;
}

export const postEventoModelUnico = async(json) =>{
    console.log(JSON.stringify(json))
    const result = await getCollection().insertOne(json)
    return result;
}

export const postEventoModelMultiple = async (json) =>{
    const result = await getCollection().insertMany(json)
    return result;
}
export const SearchEventoModel = async (evento) => {
    getCollection().find({deporte: evento}).toArray();
    return result;
}


//eventos donde la cuota local sea mayor a 2.0
export const eventoCuota = async() => {
    getCollection().find({cuota_local: {$gt: 2.0}}).toArray();
    return result;
}

export const modificarCuota = async (id, nuevaCuota) => {
    getCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: { cuota_visitante: nuevaCuota } }
    );
    return result;
}

export const deleteEvento = async(id) => {
    const id_mongo =  new ObjectId(id)
    const result = await getCollection().deleteOne({
          _id: id_mongo
    })
    return result;
}

export const deleteEventoModel = async () => {
    
    
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); 
    
    
    const result = await getCollection().deleteMany({
        fecha: { $lt: fechaActual }  
    });
    
    return {
        msn: "Eventos finalizados eliminados",
        eliminados: result.deletedCount,
        result
    };
}

export default {
    getEventoModel,
    postEventoModelUnico,
    postEventoModelMultiple,
    SearchEventoModel,
    eventoCuota,
    modificarCuota,
    deleteEvento,
    deleteEventoModel
}