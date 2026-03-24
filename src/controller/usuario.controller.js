import usuariomodel from "../models/usuariomodel.js"

export const getUsuario = async(req,res) => {

    const data = await usuariomodel.getUsuarioModel();
    return res.status(200).json({"msn":"Hello getUser",data})
}

export const postUsuario = async(json) => {
    const data = await usuariomodel.postUsuarioModelUnico(json);
    return res.status(200).json({"msn":"Hello getUser",data})
}

export const deleteUsuario = (req,res) => {
    
}

export const putUsuario = (req,res) => {
    
}

export default {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}