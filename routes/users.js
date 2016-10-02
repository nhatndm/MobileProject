var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

router.get('/',function(req,res){
    res.status(200).send();
});

router.post('/register',function(req,res){
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password
    var password2 = req.body.password2;

    /**Validate Information */
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password2','Password is not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.send(errors);
    }
    else{
        var newUser = new User({
            name : name,
            username : username,
            email : email,
            password : password
        });

        User.createUser(newUser,function(err,user){
            if(err){
                res.status(500).send();
            }else{
                res.send(user);
            }
        });
    }
});

module.exports = router;