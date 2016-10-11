var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/test',function(req,res){
    res.send(req.user);
});
router.post('/register',function(req,res){
    var userid = req.session.user._id;
    var res_name = req.body.name;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    var newRestaurant = new Restaurant({
        user_id : userid,
        res_name : res_name,
        location:{
            longitude : longitude,
            latitude : latitude
        }
    });
    Restaurant.findOneRes(newRestaurant.location.longitude,newRestaurant.location.latitude,function(err,restaurant){
        if(err) throw err;
        if(restaurant){
            res.json({
                success : false,
                msg : "You have created restaurant at current location",
                data : restaurant 
            });    
        }else{
            Restaurant.createRestaurant(newRestaurant,function(err,restaurant){
                if(err) throw err;
                req.session.restaurant = restaurant;
                res.json({
                    success : true,
                    msg : "Successfully Create Restaurant",
                    data : restaurant 
                });
            });
        }
    });
});

router.get('/finduser/:id',function(req,res){
    Restaurant.findUserBelong(req.params.id,function(err,restaurant){
        if(err) throw err;
        if(!restaurant){
            res.json({
                success:false,
                msg : "You dont have any restaurant, Please crete it"
            });    
        }else{
            res.json({
                success:true,
                msg : "Find done",
                data : restaurant
            });
        }
    });
});

router.get('/findres/:name',function(req,res){
    Restaurant.findRes(req.params.name,function(err,restaurant){
        if(err) throw err;
        if(!restaurant){
            res.json({
                success:false,
                msg : "No restaurant is found"
            });    
        }else{
            res.json({
                success:true,
                msg : "Find done",
                data : restaurant
            });
        }
    });
});

router.get('/findres/:longitude/:latitude',function(req,res){
    Restaurant.findResLocation(req.params.longitude,req.params.latitude,function(err,restaurant){
        if(err) throw err;
        if(!restaurant){
            res.json({
                success:false,
                msg : "No restaurant is found"
            });    
        }else{
            res.json({
                success:true,
                msg : "Find done",
                data : restaurant
            });
        }
    });
});

module.exports = router;