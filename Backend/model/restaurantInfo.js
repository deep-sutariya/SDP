const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantInfoSchema = new Schema({
    rname: { type: String, required: true },
    roname: { type: String, required: true },
    rphone: { type: String, required: true },
    raddress: { type: String, required: true },
    remail: { type: String, required: true},
    rurl: { type: String, required: true},
    rcity: { type: String, required: true},
    rtableno: { type: String, required: true},
    rtable: { type: Array, required: true },
    registeredtableinfo: {type: Array,required: true},
    rpincode: { type: String, required: true},
    rimage:{type: String, required: false},
    rpass: { type: String, required: true },
    rmenu: [
        {
            name:{ type: String, required: false},
            des:{ type: String, required: false},
            price:{ type: String, required: false},
            type:{type: String, required: false},
            image:{type:String,required: false}
        }
    ],
    rorders: { type: Array, required: true },
    rating: {type: Number,default: 0},
    totalrating: {type: Number, default: 0},
    ratingcount: {type: Number, default: 0},

}, { timestamps: true });


// RestaurantInfoSchema.pre("save", async function (next) {
//         this.rpass = await bcrypt.hash(this.rpass, 10);
// });

module.exports = mongoose.model('Restaurantinfo', RestaurantInfoSchema);