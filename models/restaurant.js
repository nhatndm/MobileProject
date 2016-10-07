var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var RestaurantSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    res_name:{
        type : String
    },
    desciption:{
        type : String
    },
    location:{
        longitude : String,
        latitude : String
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    ratings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rating'
    }],
    photos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photo'
    }],
    services:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service'
    }],
    publicities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'publicity'
    }]
});

var Restaurant = module.exports = mongoose.model('Restaurant',RestaurantSchema);

module.exports.createRestaurant = function(newRestaurant,callback){
    newRestaurant.save(callback);
};

module.exports.findRes = function(name,callback){
    var query = { res_name : name };
    Restaurant.find(query,callback);
};

module.exports.findUserBelong = function(id,callback){
    Restaurant.findById(id).populate('user_id').exec(callback);
};


