
import { connectionTournament } from "../services/mongo.service.js"

export const getUsuarioModel = async() =>{
    const connection = await connectionTournament();
    const result = await connection.collection("usuario").find({}).toArray();
    return result;
}

export const postUsuarioModelUnico = async(json) =>{
    console.log(JSON.stringify(json))
    const connection = await connectionTournament();
    const tournament = connection.collection("usuario")
    const result = await tournament.insertOne(json)
    return result;
}

export const postUsuarioModelMultiple = () =>{

}

export default{
    getUsuarioModel,
    postUsuarioModelUnico,
    postUsuarioModelMultiple
}