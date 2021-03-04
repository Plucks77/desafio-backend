const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const initialToken = req.headers.authorization;
  const token = initialToken.split("Bearer ")[1];

  if (!token)
    return res
      .status(401)
      .json({ auth: false, message: "Nenhum token foi enviado." });

  jwt.verify(token, process.env.APP_KEY, function (err, decoded) {
    if (err)
      return res.status(401).json({ auth: false, message: "Token inválido." });
    next();
  });
}

module.exports = authenticateJWT;
