var myFunction = (err) => {
    if(err){
        return console.log("Errrrrrrror");
    }
    console.log("Ok");
}

var test = myFunction();
console.log('test: ', test);