require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./src/config/db")
const mainRouter = require("./src/api/routes/mainRouter")



const app = express()



connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/v1/", mainRouter)

app.use("*", (req, res, next) =>{
    return res.status(404).json("Route not found")
})

app.listen(8000, () => {
    console.log("Servidor corriendo en: http://localhost:8000");
})