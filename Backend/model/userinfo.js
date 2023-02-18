const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserinfoSchema = new Schema({
    uemail: { type: String, required: true},
    uname: { type: String, required: true },
    uphone: { type: String, required: true },
    upass: { type: String, required: true },
    uorders: { type: Array, required: true },
    // [
    //     {
    //         orderid : { type: String, required: false },
    //         resname : { type: String, required: false },
    //         orderres: { type: String, required: false },
    //         ordermenu: [
    //             {
    //                 itemname : { type: String, required: false },
    //                 price : { type: String, required: false },
    //                 noOfItem : { type: String, required: false }
    //             }
    //         ],
    //         ordertotal: { type: String, required: false },
    //         ordertime: { type: String, required: false },
    //         ordermonth: { type: String, required: false },
    //         orderstatus: {type: String,required: false}
    //     }
    // ],

}, { timestamps: true });

// UserinfoSchema.pre("save", async function (next) {
//         this.upass = await bcrypt.hash(this.upass, 10);
// });

module.exports = mongoose.model('Userinfo', UserinfoSchema);