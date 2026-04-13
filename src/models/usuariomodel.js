
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

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const apuestasGanadas = await connection.collection("apuesta").find({usuario_id: new ObjectId(id), estado :"ganada"}).toArray();

    if (apuestasGanadas.length === 0) {
        return {
            msn: "No hay apuestas ganadas pendientes de pago",
            saldo_actual: usuario.saldo,
            ganancias_totales: 0
        };
    }

    let gananciasTotales = 0;

    for (const apuesta of apuestasGanadas) {
        gananciasTotales += apuesta.monto * apuesta.cuota;
    }

    const nuevoSaldo = usuario.saldo + gananciasTotales;

    await connection.collection("usuario").updateOne({ 
        _id: new ObjectId(id) }, { 
        $set: { saldo: nuevoSaldo }
    })


    return {
        msn: "Apuestas ganadas procesadas",
        ganancias_totales: gananciasTotales,
        saldo: nuevoSaldo
    };

}

export const searchUsuarioModel = async (saldo) => {
    const connection = await connectionTournament();
    const result = await connection.collection("usuario").find({saldo: { $gt: parseFloat(saldo)}}).toArray();
    return result;
}

export const usuarioPaisCorreo = async() => {
    const connection = await connectionTournament();
    
    const eventoBaloncesto = await connection.collection("evento").findOne(
        { deporte: "Fútbol" }, 
        { projection: { _id: 1 } }  
    );
    
    if (!eventoBaloncesto) {
        return {
            msn: "No se encontraron eventos de baloncesto",
            data: []
        };
    }
    
    const apuestas = await connection.collection("apuesta").find({
        evento_id: eventoBaloncesto._id.toString()  
    }).toArray();
    
    if (apuestas.length === 0) {
        return {
            msn: "No hay apuestas para eventos de baloncesto",
            data: []
        };
    }
    
    
    const usuariosIds = [...new Set(apuestas.map(apuesta => apuesta.usuario_id))];
    
    const usuarios = await connection.collection("usuario").find({
        _id: { $in: usuariosIds.map(id => new ObjectId(id)) }
    }, {
        projection: { 
            país: 1,      // Incluye país
            correo: 1,    // Incluye correo
            _id: 0        // Excluye el _id (opcional)
        }
    }).toArray();
    
    return {
        msn: `Usuarios que apostaron en baloncesto (evento: ${eventoBaloncesto._id})`,
        total_apostadores: usuarios.length,
        data: usuarios
    };
}

export const deleteUsuarioModel = async (id) => {
    const connection = await connectionTournament();
    const result = await connection.collection("usuario").deleteOne({_id: new ObjectId(id)});
    const apuestasEliminadas = await connection.collection("apuesta").deleteMany({usuario_id: id});
     return {
        msn: `Usuario con ID ${id} eliminado`,
        usuario_eliminado: result,
        apuestas_eliminadas: apuestasEliminadas.deletedCount,
        result
    };
}

export const totalApostado = async() => {
    const connection = await connectionTournament();
    const result = await connection.collection("apuesta").aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$monto" }
            }
        }
    ]).toArray();

    return result[0]?.total || 0;
}


export default{
    getUsuarioModel,
    postUsuarioModelUnico,
    postUsuarioModelMultiple,
    updateSaldo,
    searchUsuarioModel,
    usuarioPaisCorreo,
    deleteUsuarioModel,
    totalApostado
}