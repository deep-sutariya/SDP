const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const RestaurantInfoSchema = new Schema({
    rname: { type: String, required: true },
    roname: { type: String, required: true },
    rphone: { type: String, required: true },
    raddress: { type: String, required: true },
    remail: { type: String, required: true},
    rurl: { type: String, required: true},
    rcity: { type: String, required: true},
    rpass: { type: String, required: true },
    rmenu: { type: Array, required: false,"default" :[] }
}, { timestamps: true });

RestaurantInfoSchema.pre("save", async function (next) {
        this.rpass = await bcrypt.hash(this.rpass, 10);
});

module.exports = mongoose.model('Restaurantinfo', RestaurantInfoSchema);