import usuariomodel from "../models/usuariomodel.js"

export const getUsuario = async(req,res) => {

    const data = await usuariomodel.getUsuarioModel();
    return res.status(200).json({"msn":"Hello getUser",data})
}

export const postUsuario = async(req,res) => {
    const json = req.body;
    const result = await usuariomodel.postUsuarioModelUnico(json);
    res.send({data: json})
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