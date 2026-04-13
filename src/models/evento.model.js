import { connectionTournament } from "../services/mongo.service.js"

export const getEventoModel = async() =>{
    const connection = await connectionTournament();
    const result = await connection.collection("evento").find({}).toArray();
    return result;
}

export const postEventoModelUnico = async(json) =>{
    console.log(JSON.stringify(json))
    const connection = await connectionTournament();
    const tournament = connection.collection("evento")
    const result = await tournament.insertOne(json)
    return result;
}

export const postEventoModelMultiple = async (json) =>{
    const connection = await connectionTournament();
    const tournament = connection.collection("evento")
    const result = await tournament.insertMany(json)
    return result;
}
export const SearchEventoModel = async (evento) => {
    const connection = await connectionTournament();
    const result = await connection.collection("evento").find({deporte: evento}).toArray();
    return result;
}


//eventos donde la cuota local sea mayor a 2.0
export const eventoCuota = async() => {
    const connection = await connectionTournament();
    const result = await connection.collection("evento").find({cuota_local: {$gt: 2.0}}).toArray();
    return result;
}

export const modificarCuota = async (id, nuevaCuota) => {
    const connection = await connectionTournament();
    const result = await connection.collection("evento").updateOne(
        { _id: new ObjectId(id) },
        { $set: { cuota_visitante: nuevaCuota } }
    );
    return result;
}

export const deleteEventoModel = async () => {
    const connection = await connectionTournament();
    
    
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); 
    
    
    const result = await connection.collection("evento").deleteMany({
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
    deleteEventoModel
}