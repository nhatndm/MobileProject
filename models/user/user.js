var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    user_id :{
        type:mongoose.Schema.Type.ObjectId,
    },
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
        type: mongoose.Schema.Type.ObjectId,
        ref: 'food'
    }],
    res_favorite:[{
        type: mongoose.Schema.Type.ObjectId,
        ref: 'restaurant'
    }],
    avatar:{
        type: mongoose.Schema.Type.ObjectId,
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