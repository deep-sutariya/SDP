const express = require('express');
const router = express.Router();
const UserInfo = require('../model/userinfo');
const bcrypt = require('bcryptjs');
const Restaurantinfo = require('../model/restaurantInfo');
const { RestaurantMenu } = require('@material-ui/icons');

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

    const { uemail, upass } = req.body;
    const user = await UserInfo.findOne({ uemail: uemail });
    if(user){
        if(bcrypt.compare(upass, user.upass))
            res.status(200).send(user);
        else
        res.status(201).send({message : "Invalid Password"});
    }else{
        res.status(202).send({message : "userNotfound"});
    }

});

module.exports = router;