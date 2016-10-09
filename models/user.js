var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
    local :{
        email :String,
        password : String,
        name : String
    },
    facebook :{
        id : String,
        name : String
    },   
    google :{
        id : String,
        email : String,
        name : String
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
        type: String,
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
        bcrypt.hash(newUser.local.password,salt,function(err,hash){
            newUser.local.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.createUserOther = function(newUser,callback){    
    newUser.save(callback);
};

module.exports.getUserByEmail = function(email,callback){
    var query = {'local.email' : email};
    User.findOne(query,callback);
};

module.exports.getUserByFacebookId = function(id,callback){
    var query = {'facebook.id' : id };
    User.findOne(query,callback);
};

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

module.exports.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash);
};

module.exports.findUserByName = function(name,callback){
    var query = {'local.name' : name};
    User.find(query,callback);
};

module.exports.updateUser = function(user,callback){
    user.save(callback);
};
