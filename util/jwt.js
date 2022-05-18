var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const SECRET_KEY = '123';

async function sign(payload) {
    return jwt.sign(payload, SECRET_KEY);
}

async function decoded(token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = {
    sign,
    decoded,
}