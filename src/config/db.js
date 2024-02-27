const mongoose = require("mongoose")

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Conectado a la BBDD correctamente");
    } catch (error) {
        console.log("No se ha podido conectar a la BBDD");
    }
}

module.exports = {connectDB}