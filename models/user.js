var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
    username: {
        type : String,
    },
    password:{
        type : String,
    },      
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    role:{
        type:String,
    },
    foods_favorite:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food'
    }],
    res_favorite:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    }],
    avatar:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photo'
    },
    gender:{
        type: String,
    },
    birthday:{
        type: Date,
    },
    last_login:{
        type : Date,
    },
    address:{
        type:String,
    },
    phone:{
        type:Number,
    },
    about:{
        type:String,
    },
    other:{
        type:String,
    }
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUserName = function(username,callback){
    var query = {username : username};
    User.findOne(query,callback);
};

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

module.exports.comparePassword = function(password,hash,callback){
    bcrypt.compare(password,hash,function(err,isMatch){
        if(err) throw err;
        callback(null,isMatch);
    });
};