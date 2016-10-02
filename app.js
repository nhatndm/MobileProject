var express = require('express');
var app = express();
var port = process.env.port || 3000;
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var LocalStratery = require('passport-local').Stratery;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressvalidator = require('express-validator');

mongoose.connect('mongodb://localhost/mobile',function(err){
    if(err) throw ('Please check your connection');
    console.log('Connect Successfully');
});

/**Body parser */
//* Its purpose to get value from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
/**Express session(Just define to user after)*/
app.use(session({
    secret: 'secret',
    saveUninitialized : true,
    resave : true
}));

/**Express validator */
//* Its purpose to validate the information of client
app.use(expressvalidator({
    errorFormatter: function(param,msg,value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

    while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
    }
    return{
        param: formParam,
        msg : msg,
        value : value
    };
 }
}));

/**Passport */
//* Its purpose to authenticate the user information
app.use(passport.initialize());
app.use(passport.session());

/**Route for model */
//* Its purpose to call api
var users = require('./routes/users');
/**URL for model */
//* Its purpose to call the right api for model
app.use('/api/users',users);

app.listen(port,function(){
    console.log("Server is running at :" + port);
})