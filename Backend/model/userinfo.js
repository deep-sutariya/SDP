const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserinfoSchema = new Schema({
    uemail: { type: String, required: true},
    uname: { type: String, required: true },
    uphone: { type: String, required: true },
    upass: { type: String, required: true },
    utockens: { type: String, required: false },

}, { timestamps: true });

UserinfoSchema.pre("save", async function (next) {
        this.upass = await bcrypt.hash(this.upass, 10);
});


module.exports = mongoose.model('Userinfo', UserinfoSchema);