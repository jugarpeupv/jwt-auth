const jwt = require("jsonwebtoken");

// Damos de alta esa función que es un middleware que servirá para no tener este trozo de código dentro de cada ruta. Se invocará para aquellas rutas necesarias

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.SECRETTOKEN);
  // aquí estamos guardando el id de decoded en una variable del request para hacerla global, se puede llamar req.user_id/req.usuarioid como queramos
  req.userId = decoded.id;
  next();
}

module.exports = verifyToken;
