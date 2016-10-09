var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/test',function(req,res){
    res.send(req.user);
});
router.post('/register',function(req,res){
    var userid = req.user_id;
    var res_name = req.body.name;
    var newRestaurant = new Restaurant({
        user_id : userid
    });
    Restaurant.createRestaurant(newRestaurant,function(err,restaurant){
        if(err) throw err
        res.send(restaurant);
    });
});

router.get('/finduser/:id',function(req,res){
    Restaurant.findUserBelong(req.params.id,function(err,restaurant){
        if(err) throw err
        res.send(restaurant);
        res.send(restaurant.user_id);
    });
});

router.get('/findres/:name',function(req,res){
    Restaurant.findRes(req.params.name,function(err,restaurant){
        if(err) throw err
        res.send(restaurant);
    });
});

module.exports = router;