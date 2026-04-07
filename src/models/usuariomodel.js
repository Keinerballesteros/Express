
import { ObjectId } from "mongodb";
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

export const postUsuarioModelMultiple = async (json) =>{
    const connection = await connectionTournament();
    const tournament = connection.collection("usuario")
    const result = await tournament.insertMany(json)
    return result;
}

//Terminar la funcion de actualizar el saldo de un usuario
export const updateSaldo = async (id) => {
    const connection = await connectionTournament();
    const usuario = await connection.collection("usuario").find({_id: new ObjectId(id)});
    const apuesta = await connection.collection("apuesta").find({usuario_id: new ObjectId(id), estado :"ganada"});
}

export default{
    getUsuarioModel,
    postUsuarioModelUnico,
    postUsuarioModelMultiple,
    updateSaldo
}