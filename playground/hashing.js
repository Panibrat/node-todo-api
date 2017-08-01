const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc@Panibrat@4571';

bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(`HASH: ${hash}`);
    })
});

var hashedPassword1 = '$2a$10$0OF5mNgGKp91CY12RS.WieliMXgkr.fEqlVHmuM6Xx1ZGAb8GObmq';
var hashedPassword2 = '$2a$10$WImFi/H6R2fg7PTQa1h8R.g8j6qukv/DWZOnSo8UCbPBubLVUhIJe';
var hashedPassword3 = '$2a$12$CUe9.zdrn2BND4542oYOmuIAfuEGaVdDLsKLBB7/CjV.mE6KZ3Hci';
var hashedPassword4 = '$2a$12$VbTYjOPKZOoXvxWs0vH39OZadrpDEIkXTnP7EqOQzFDb9f/6V7/wq';
var hashedPassword4 = '$2a$12$pKsg4FXgDqRc90rarFzB2eyeE5.qiN/GvxZ0SkOWBaS1os0WQ5ajm';

bcrypt.compare(password, hashedPassword1, (err, res) => {
    console.log(res);
});
bcrypt.compare(password, hashedPassword2, (err, res) => {
    console.log(res);
});
bcrypt.compare(password, hashedPassword3, (err, res) => {
    console.log(res);
});
bcrypt.compare(password, hashedPassword4, (err, res) => {
    console.log(res);
});

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