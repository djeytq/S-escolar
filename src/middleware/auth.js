const {verify} =require('jsonwebtoken');
const auth=require('../auth');

async function middleware(req, res, next) {
    try {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não informado!' });
    }

    const adm = verify(token, auth.secretKey);
    req.adm = {
        id: adm.id,
        cargo: adm.cargo
    };
    console.log(req.adm);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido!' });
    }
    
}

module.exports = middleware;