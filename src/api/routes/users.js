
const {  isAuth } = require("../../middlewares/isAuth");
const { getUsers, getUserById, register, login, updateUser, removeFromFavorites } = require("../controllers/users");


const usersRouter = require("express").Router();

usersRouter.get("/" ,getUsers);
usersRouter.get("/:id",getUserById);
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/remove-favs/:id", [isAuth], removeFromFavorites);
usersRouter.put("/:id",[isAuth], updateUser);

module.exports = usersRouter;