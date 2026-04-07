import { connectionTournament } from "../services/mongo.service.js";
import { ObjectId } from "mongodb";

export const getApuestaModel = async () => {
    const connection = await connectionTournament();
    const result = await connection.collection("apuesta").find({}).toArray();
    return result;
}

export const getApuestaPorUsuarioModel = async (usuarioId) => {
    const connection = await connectionTournament();
    const result = await connection.collection("apuesta").find({ "usuario_id": usuarioId }).toArray();
    return result;
}

export const getApuestaPorEventoModel = async (eventoId) => {
    const connection = await connectionTournament();
    const result = await connection.collection("apuesta").find({ "evento_id": eventoId }).toArray();
    return result;
}

export const postApuestaModel = async (apuestaData) => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection("apuesta");
    
    const posibleGanancia = apuestaData.monto_apostado * apuestaData.cuota_seleccionada;
    
    const apuestaCompleta = {
        ...apuestaData,
        posible_ganancia: posibleGanancia,
        fecha_apuesta: new Date(),
        estado: "en_curso" 
    };
    
    const result = await apuestaCollection.insertOne(apuestaCompleta);
    return result;
}

export const actualizarEstadoApuestaModel = async (apuestaId, nuevoEstado) => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection("apuesta");
    
    const result = await apuestaCollection.updateOne(
        { _id: new ObjectId(apuestaId) },
        { $set: { estado: nuevoEstado } }
    );
    return result;
}

const getEnCurso = async() => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection("apuesta");

    const result = apuestaCollection.find(
        {estado: 'en_curso'},
        {projection: {monto_apostado: 1, _id:0}}
    ).toArray();

    return result;
}

export default {
    getApuestaModel,
    getApuestaPorUsuarioModel,
    getApuestaPorEventoModel,
    postApuestaModel,
    actualizarEstadoApuestaModel,
    getEnCurso
};