const { decoded } = require("./util/jwt");

async function validateToken(req, res, next) {
    try {
        const payload = await decoded(req.headers.token);
        req.tokenPayload = payload;
        next();    
    } catch (error) {
        console.log(error);
        res.status(400);
        next(Error('No valid token'))
    }
}


function errorHandle({ message }, req, res, next) {
    res.json({ message })
}

module.exports = {
    validateToken,
    errorHandle,
}
