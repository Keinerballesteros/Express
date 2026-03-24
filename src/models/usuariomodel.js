
import { connectionTournament } from "../services/mongo.service.js"

export const getUsuarioModel = async() =>{
    const connection = await connectionTournament();
    const result = await connection.collection("usuario").find({}).toArray();
    return result
}

export const postUsuarioModelUnico = async(json) =>{
    const db = await connection();
    const tournament = db.collection("tournament")
    const result = tournament.insertOne(json)
    return result;
}

export const postUsuarioModelMultiple = () =>{

}

export default{
    getUsuarioModel,
    postUsuarioModelUnico,
    postUsuarioModelMultiple
}