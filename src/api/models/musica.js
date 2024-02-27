const mongoose = require("mongoose")

const musicaSchema = new mongoose.Schema(
    {
        image:{type:String, required: true, trim:true},
        singer:{type:String, required:true, trim:true},
        album:{type:String, required:true, trim:true},
        price:{type:Number, required:true, trim:true},
        kind: {type: String, required:true, enum:["Pop","Metal","HipHop","Dance", "Bandas Sonoras"]}
    },
    {
        timestamps:true,
        collection:"musicas"
    })

    const Musica = mongoose.model("musicas", musicaSchema, "musicas")
    module.exports = Musica;