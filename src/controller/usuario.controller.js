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

export const postUsuarioMultiple = async(req,res) => {
    const json = req.body;
    const result = await usuariomodel.postUsuarioModelMultiple(json);
    res.send({data: json})
}

export const deleteUsuario = (req,res) => {
    
}

export const updateSaldo = (req,res) => {
    const {id} = req.param
    const result = usuariomodel.updateSaldo(id)
     return res.status(200).json({ "msn": "Saldo de usuario actualizado ", result })
}   

export default {
    getUsuario,
    postUsuario,
    postUsuarioMultiple,
    updateSaldo,
    deleteUsuario
}