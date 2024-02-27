const musicaRouter = require("./musica");
const usersRouter = require("./users");




const mainRouter = require("express").Router();

mainRouter.use("/musicas", musicaRouter)
mainRouter.use("/users", usersRouter)

module.exports = mainRouter;