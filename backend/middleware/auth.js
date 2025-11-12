const jwt = require("jsonwebtoken");
require("dotenv").config();

function autenticarJWT(req, res, next){
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({erro: "Token não fornecido"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (erro, decoded) => {
        if(erro){
            return res.status(403).json({erro: "Token invalido"});
        }
        req.barbeariaId = decoded.id;
        next();
    });
}
module.exports = autenticarJWT;