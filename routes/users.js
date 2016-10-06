var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

router.get('/fail',function(req,res){
    res.status(401).send();
});

router.get('/success',function(req,res){
    res.status(200).send();
});

router.post('/register',function(req,res){
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password
    var password2 = req.body.password2;

    /**Validate Information */
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password2','Password is not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.send(errors);
    }
    else{
        var newUser = new User({
            local : {
                email : email,
                name : name,
                password : password
            }
        });
        User.getUserByEmail(newUser.local.email,function(err,user){
            if(err) res.status(500).send();
            if(user){
                res.status(405).send();   
            }else{
                User.createUser(newUser,function(err,user){
                if(err){
                    res.status(500).send();
                }else{
                    res.send(user);
                    }
                });
            }
        });
    }
});

/**Autheticate Scenario */
passport.use(new LocalStrategy(
    function(username,password,done){
        User.getUserByEmail(username,function(err,user){
            if(err) throw err;
            if(!user){
                return done(null,false,{message: 'Unknown User'});
            }
            if(User.comparePassword(password,user.local.password)){
                return done(null,user);
            }else{
                return done(null,false,{message : 'Invalid Password'});
            }
        });
}));

/**Set id to  session */
passport.serializeUser(function(user,done){
    done(null,user.id);
});

/**Get id from session to get user information */
passport.deserializeUser(function(id,done){
    User.getUserById(id,function(err,user){
        done(err,user);
    });
});

/**Login function */
router.post('/login',
    passport.authenticate('local',{successRedirect :'/api/users/success',failureRedirect :'/api/users/fail',failureFlash: true}),
    function(req,res){
        res.redirect('/');
});

router.get('/find/:name',function(req,res){
    User.findUserByName(req.params.name,function(err,users){
        if(err) throw err;
        if(users){
            res.send(users);
        }else{
            res.status(404).send();
        }
    });    
});

router.get('/findone/:user_id',function(req,res){
    User.getUserById(req.params.user_id,function(err,user){
        if(err) throw err;
        res.send(user);
    });
});

// Missing API Update
module.exports = router;