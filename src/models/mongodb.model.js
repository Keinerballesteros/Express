
import {connectionTournament} from "../services/mongo.service.js"


export const schemeMongo = async () =>{
    const db = await connectionTournament();

    
    await db.createCollection("persona", {
         validator : {
            $jsonSchema: {
                bsonType: "object",
                required: ["documento","nombre"],
                properties: {
                    nombre: {
                        bsonType: 'string',
                        description: 'El nombre debe ser un string'
                    },
                    documento: {
                        bsonType: 'string',
                        description: 'El documento debe ser un string'
                    },
                    correo: {
                        bsonType: 'string',
                        pattern: '^.+@.+$',
                        description: 'Debe ser un correo válido'
                    },
                    edad: {
                        bsonType: 'int',
                        minimum: 18,
                        maximum:100,
                        description: 'La edad debe ser válida Rango (18-100)'
                    },
                    activo: {
                        bsonType: 'bool',
                        description: 'Debe ser un valor True o False'
                    }
                }
            }
         }
    })

    console.log("Collection create successfull")
}