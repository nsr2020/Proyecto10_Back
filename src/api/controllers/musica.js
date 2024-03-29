const Musica = require("../models/musica")

const getMusicas = async (req, res, next) =>{
    try {
       const musicas = await Musica.find()
       return res.status(200).json(musicas)
    } catch (error) {
        return res.status(400).json("error")
    }
}

const getMusicaById = async (req, res, next) =>{
    try {
       const {id} = req.params;
       const musica = await Musica.findById(id)
       return res.status(200).json(musica) 
    } catch (error) {
        return res.status(400).json("error")
    }
        
}  


const getMusicasByPriceAndKind = async (req, res, next) => {
    try {
        const { kind, price } = req.params;
        let query = {};
 

        if (!kind && !price) {
            return res.status(400).json("Al menos uno de los parámetros kind o price debe estar presente");
        }

        if (!isNaN(kind) && kind > 0) {
            query.price = { $lte: kind };
        } else if (kind && !["Pop", "Metal", "HipHop", "Dance", "Bandas Sonoras"].includes(kind)) {
            return res.status(400).json("El parámetro 'kind' no es válido.");
        } else {
            query.kind = kind;
        }

        if (price) {
            query.price = { $lte: price };
        }

        const musicas = await Musica.find(query);
        return res.status(200).json(musicas);
    } catch (error) {
        return res.status(400).json("Error en la solicitud");
    }
};
const postMusica = async (req, res, next) =>{
    try {
        const newMusica = new Musica(req.body)
        const musicaSaved = await newMusica.save()
        return res.status(201).json(
            {
                "mensaje" : "Se ha creado correctamente la nueva música",
                "musica" : musicaSaved          
             }
        )
    } catch (error) {
        return res.status(400).json("Error en la solicitud");
    }
}

const updateMusica = async ( req, res, next ) =>{
    try {
        const {id} = req.params;
        const newMusica = new Musica(req.body)
        newMusica._id= id

        const musicaUpdated = await Musica.findByIdAndUpdate(id, newMusica, {new:true})
        return res.status(200).json(
            {
                "mensaje:":"Se ha actualizado correctamente la música",
                "musica:": musicaUpdated
            })
    } catch (error) {
        return res.status(400).json("Error en la solicitud");
    }
}

const deleteMusica = async (req, res, next)=> {
    try {
       const {id} = req.params;
       const musicaDeleted = await Musica.findByIdAndDelete(id) 
       return res.status(200).json(
        {
            "Mensaje: ": "Se ha borrado correctamente la música",
            "Música:" : musicaDeleted
        })
    } catch (error) {
        return res.status(400).json("Error en la solicitud");
    }
}


module.exports = {getMusicas, getMusicaById, postMusica, updateMusica, deleteMusica, getMusicasByPriceAndKind}