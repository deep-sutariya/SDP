const express = require('express');
const router = express.Router();
const UserInfo = require('../model/userinfo');
const bcrypt = require('bcryptjs');
const Restaurantinfo = require('../model/restaurantInfo');
const hashpassword = require('../middleware/hashpassword');

router.post("/signup", async (req, res) => {
    const userexist = await UserInfo.findOne({ uemail: uemail });
    if (userexist) res.status(202).send({ message: "Email already exists" });
    else {
        const user = new UserInfo({
            uemail: req.body.uemail,
            uname: req.body.uname,
            uphone: req.body.uphone,
            upass: req.body.upass,
        });

        const data = await user.save();
        res.status(200).send({data : data, message: `Hello, ${data.data.uname} You Registered Successfully`});
    }
});

router.post("/registerrestaurant", hashpassword, async (req, res) => {
    
    const restaurent = await Restaurantinfo.findOne({ remail: req.body.remail });
    if (restaurent != null) res.status(202).send({ message: "Email already exists" });
    else {
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
        res.status(200).send({data : data, message: `Hello, ${data.data.roname} Your Restaurant ${data.data.rname} Registered Successfully`});
    }
});

router.post("/userlogin", async (req, res) => {
    const { uemail, upass } = req.body;
    const user = await UserInfo.findOne({ uemail: uemail });
    if (user) {
        if (await bcrypt.compare(upass, user.upass)) {
            res.status(200).send(user);
        }
        else
            res.status(201).send({ message: "Error! : *** Invalid Password ***" });
    } else {
        res.status(202).send({ message: "Error! : *** userNotfound ***" });
    }
});


router.post("/restaurentlogin", async (req, res) => {
    const { uemail, upass } = req.body;
    const restaurent = await Restaurantinfo.findOne({ remail: uemail });
    if (restaurent) {
        if (await bcrypt.compare(upass, restaurent.rpass)) {
            res.status(200).send(restaurent);
            console.log(restaurent);
        }
        else
            res.status(201).send({ message: "Error! : *** Invalid Password ***" });
    } else {
        res.status(202).send({ message: "Error! : *** RestaurentNotfound ***" });
    }
});




// menu update

router.post("/addmenu", async (req, res) => {

    const { resid, iname, iprice, ides } = req.body;
    const restaurent = await Restaurantinfo.findById(resid);

    if (restaurent) {
        const data = restaurent.rmenu.push({ name: iname, des: ides, price: iprice });
        res.status(200).send({ data: data, message: `${iname} Added Sucssessfully !` });
    }
    else {
        res.status(202).send({ message: "Error" });
    }
});

router.post("/removemenu", async (req, res) => {
    try {
        const { resid, iid } = req.body;
        const data = await Restaurantinfo.findOneAndUpdate(
            { "_id": resid },
            { $pull: { "rmenu": { _id: iid } } }
        )
        if (data)
            res.status(200).send({ data: data, message: "deleted" });
        else
            res.status(202).send({ message: " not found or some error occured" });

    } catch (err) {
        console.log(err);
    }
});

router.post("/res", async (req, res) => {
    try {
        const data = await Restaurantinfo.find({});
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(202).send({ message: "Error ocuured" });
    }
})

router.post("/getrestaurent", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await Restaurantinfo.findById(id);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(202).send({ message: "Error ocuured" });
    }
})

module.exports = router;