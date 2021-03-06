//Model
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://test123:test123@clusteractivity.oqe3k.mongodb.net/LoginDB?retryWrites=true';
var bcrypt = require('bcryptjs');
const roles = require('../roles');

mongoose.connect(mongoDB, {useNewUrlparser: true});

//
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));


//create 
var userSchema = mongoose.Schema({
    username: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'Student',
        enum: ["Student","admin"]
       }
});




var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}
module.exports.getUserTable = function(data){
    this.getUserTable.find(data)
}
 
