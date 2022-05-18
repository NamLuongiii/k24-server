const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hash(plainText) {
    return bcrypt.hash(plainText, saltRounds)
};

async function verify(plainText, hash) {
    console.log(plainText, hash);
    return bcrypt.compare(plainText, hash);
};

module.exports = {
    hash, 
    verify
}