const express = require('express');
const router = express.Router();
const UserInfo = require('../model/userinfo');
const bcrypt = require('bcryptjs');
const Restaurantinfo = require('../model/restaurantInfo');
const jwt = require('jsonwebtoken');


router.post("/signup", async (req, res) => {
    const user = new UserInfo({
        uemail: req.body.uemail,
        uname: req.body.uname,
        uphone: req.body.uphone,
        upass: req.body.upass,
    });

    const data = await user.save();
    res.send(data);
});

router.post("/registerrestaurant", async (req, res) => {
    const restaurantInfo = new Restaurantinfo({
        rname: req.body.rname,
        roname: req.body.roname,
        rphone: req.body.rphone,
        raddress: req.body.raddress,
        remail: req.body.remail,
        rurl: req.body.rurl,
        rcity: req.body.rcity,
        rpass: req.body.rpass,
        rmenu: req.body.rmenu
    });

    const data = await restaurantInfo.save();
    res.send(data);
});

router.post("/login", async (req, res) => {
    // if (req.cookies.jwt) res.status(200).send({message: "done"});
    // else {
    const { uemail, upass } = req.body;
    const user = await UserInfo.findOne({ uemail: uemail });
    if (user) {
        if (await bcrypt.compare(upass, user.upass)) {
            // user.utockens = await generateToken(this._id);
            // res.cookie("jwt", user.utockens, {
            //     expires: new Date(Date.now() + 50000),
            //     httpOnly: true
            // });
            // await user.save();
            // console.log("200");
            res.status(200).send(user);
            // res.status(201).send({ message: "Invalid Password" });
        }
        else
            res.status(201).send({ message: "Error! : *** Invalid Password ***" });
    } else {
        res.status(202).send({ message: "Error! : *** userNotfound ***" });
    }
    // }
    // console.log(req.cookies.jwt);
});

const generateToken = async (id) => {
    try {
        return jwt.sign({ id }, "mynameisdeepsutariyaimmernstackdeveloper");
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = router;