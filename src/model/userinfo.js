const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserinfoSchema = new Schema({
    uemail: {type:String, required:true},
    uname: {type:String, required:true},
    upass: {type:String, required:true},
    uphone: {type:String, required:true},
}, {timestamps: true});

module.exports = mongoose.model('Userinfo', UserinfoSchema);