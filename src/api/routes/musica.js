const { isAdmin } = require("../../middlewares/isAuth");
const { getMusicas, getMusicaById, postMusica, updateMusica, deleteMusica, getMusicasByPriceAndKind, } = require("../controllers/musica");

const musicaRouter = require("express").Router()


musicaRouter.get("/:id",getMusicaById)
musicaRouter.get("/buscar/:kind?/:price?", getMusicasByPriceAndKind)
musicaRouter.get("/",getMusicas)
musicaRouter.post("/",[isAdmin] ,postMusica)
musicaRouter.put("/:id", [isAdmin],updateMusica)
musicaRouter.delete("/:id",[isAdmin] ,deleteMusica)


module.exports = musicaRouter;