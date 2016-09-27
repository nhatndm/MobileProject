var express = require('express');
var app = express();
var port = process.env.port || 3000;

app.listen(port,function(){
    console.log("Server is running at :" + port);
})