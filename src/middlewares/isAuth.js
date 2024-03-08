const User = require("../api/models/users");
const { verificarLlave } = require("../utils/jwt");

const obtenerUsuarioDesdeToken = async (req) => {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    const { id } = verificarLlave(parsedToken);
    const user = await User.findById(id);
    return user;
};
const openDoor = (req, user, next) => {
    user.password = null;
    req.user = user;
    next();
}

const isAuth = async (req, res, next) => {
    try {
        
        const user = await obtenerUsuarioDesdeToken(req)
        // Abrir la puerta
        openDoor(req, user, next)
        
    } catch (error) {
        return res.status(400).json("No estás autorizado");
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await obtenerUsuarioDesdeToken(req);

        if (user.rol === "admin") {
            openDoor(req, user, next)
        } else {
            return res.status(400).json("Esta acción sólo la pueden realizar los administradores");
        }
        
    } catch (error) {
        return res.status(400).json("No estás autorizado");
    }
};

module.exports = { isAuth, isAdmin };
