const User = require("../api/models/users");
const { verificarLlave } = require("../utils/jwt");

const obtenerUsuarioDesdeToken = async (token) => {
    const parsedToken = token.replace("Bearer ", "");
    const { id } = verificarLlave(parsedToken);
    const user = await User.findById(id);
    return user;
};

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await obtenerUsuarioDesdeToken(token);

        // Abrir la puerta
        user.password = null;
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(400).json("No estás autorizado");
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await obtenerUsuarioDesdeToken(token);

        if (user.rol === "admin") {
            user.password = null;
            req.user = user;
            next();
        } else {
            return res.status(400).json("Esta acción sólo la pueden realizar los administradores");
        }
        
    } catch (error) {
        return res.status(400).json("No estás autorizado");
    }
};

module.exports = { isAuth, isAdmin };
