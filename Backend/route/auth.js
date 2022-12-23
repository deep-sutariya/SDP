const express = require('express');
const router = express.Router();
const UserInfo = require('../model/userinfo');

router.post("/signup", async (req, res) => {
    const user = new UserInfo({
        uemail: req.body.uemail,
        uname: req.body.uname,
        uphone: req.body.uphone,
        upass: req.body.upass,
        ucpass: req.body.ucpass
    });

    const data = await user.save();
    res.send(data);
});

router.post("/login", async (req, res) => {

    const { uemail, upass } = req.body;
    const user = await UserInfo.findOne({ uemail: uemail });
    if(user){
        if(upass === user.upass)
            res.status(200).send(user);
        else
        res.status(201).send({message : "Invalid Password"});
    }else{
        res.status(202).send({message : "userNotfound"});
    }

});

module.exports = router;