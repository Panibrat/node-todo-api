const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

//let message = 'My name is Sasha';
let message = 'a';
let hashedMessage = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hashed: ${hashedMessage}`);

var data = {
    id: 4571248,
    name : "Alexander"
};

var token = jwt.sign(data, 'zzz123abc');
var decoded = jwt.verify(token, 'zzz123abc');

console.log(token);
console.log(decoded);