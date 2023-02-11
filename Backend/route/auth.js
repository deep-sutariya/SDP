const express = require("express");
const router = express.Router();
const UserInfo = require("../model/userinfo");
const bcrypt = require("bcryptjs");
const Restaurantinfo = require("../model/restaurantInfo");
const hashpassword = require("../middleware/hashpassword");
const pdf_generator = require("../service/pdf_generator");

require('dotenv').config();
const jwt = require('jsonwebtoken');

// Sign Up
router.post("/signup", async (req, res) => {
  const userexist = await UserInfo.findOne({ uemail: req.body.uemail });
  if (userexist) res.status(202).send({ message: "Email already exists" });
  else {
    const user = new UserInfo({
      uemail: req.body.uemail,
      uname: req.body.uname,
      uphone: req.body.uphone,
      upass: req.body.upass,
    });

    const data = await user.save();
    console.log(data);
    res.status(200).send({
      data: data,
      message: `Hello, ${data.uname} You Registered Successfully`,
    });
  }
});

// Register Restaurant
router.post("/registerrestaurant", hashpassword, async (req, res) => {
  const restaurent = await Restaurantinfo.findOne({ remail: req.body.remail });
  if (restaurent != null)
    res.status(202).send({ message: "Email already exists" });
  else {
    const restaurantInfo = new Restaurantinfo({
      rname: req.body.rname,
      roname: req.body.roname,
      rphone: req.body.rphone,
      raddress: req.body.raddress,
      remail: req.body.remail,
      rurl: req.body.rurl,
      rcity: req.body.rcity,
      rimage:req.body.rimage,
      rpass: req.body.rpass,
      rmenu: req.body.rmenu,
    });

    const data = await restaurantInfo.save();
    console.log(data);
    res.status(200).send({
      data: data,
      message: `Hello, ${data.roname} Your Restaurant ${data.rname} Registered Successfully`,
    });
  }
});

// Update Restaurant Details
router.post("/updaterestaurant", async (req, res) => {
  try {
    const restaurant = await Restaurantinfo.findOne({
      remail: req.body.remail,
    });
    if (restaurant === null)
      res.status(202).send({ message: "Restaurant Does not Exists" });
    else {
      restaurant.rname = req.body.rname;
      restaurant.roname = req.body.roname;
      restaurant.rphone = req.body.rphone;
      restaurant.raddress = req.body.raddress;
      restaurant.remail = req.body.remail;
      restaurant.rurl = req.body.rurl;
      restaurant.rcity = req.body.rcity;
      restaurant.rimage = req.body.rimage;
      restaurant.rpass = req.body.rpass;
      restaurant.rmenu = req.body.rmenu;

      const data = await restaurant.save();
      console.log(data);
      res.status(200).send({
        data: data,
        message: `Updation has been done SuccessFully !`,
      });
    }
  } catch (e) {
    res.status(203).send({ message: "Error Accured" });
  }
});

// User Login Details
router.post("/userlogin", async (req, res) => {
  const { uemail, upass } = req.body;
  const user = await UserInfo.findOne({ uemail: uemail });
  if (user) {
    if (await bcrypt.compare(upass, user.upass)) {

      var token = jwt.sign({ email: user.uemail, pass: upass}, `${process.env.TOCKEN_PRIVATE_KEY}`);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly:false
      });

      res.cookie("type", "user", {
        expires: new Date(Date.now() + 25892000000),
        httpOnly:false
      });

      res.status(200).send({
        data: user,
        message: `Hello ${user.uname}, You Logged in successfully!`,
      });

    } else
      res.status(201).send({ message: "Error! : *** Invalid Password ***" });
  } else {
    res.status(202).send({ message: "Error! : *** userNotfound ***" });
  }
});

// Restaurant login details
router.post("/restaurentlogin", async (req, res) => {
  const { uemail, upass } = req.body;
  const restaurent = await Restaurantinfo.findOne({ remail: uemail });
  if (restaurent) {
    if (await bcrypt.compare(upass, restaurent.rpass)) {
      
      var token = jwt.sign({email: restaurent.remail, pass: upass}, `${process.env.TOCKEN_PRIVATE_KEY}`);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly:false
      });
      res.cookie("type", "restaurent", {
        expires: new Date(Date.now() + 25892000000),
        httpOnly:false
      });

      res.status(200).send({
        data: restaurent,
        message: `Hello ${restaurent.rname}, You Logged in successfully!`,
      });
      console.log(restaurent);
      
    } else
      res.status(201).send({ message: "Error! : *** Invalid Password ***" });
  } else {
    res.status(202).send({ message: "Error! : *** RestaurentNotfound ***" });
  }
});

// Add MEnu Item
router.post("/addmenu", async (req, res) => {
  const { resid, iname, iprice, ides, itype } = req.body;
  const restaurent = await Restaurantinfo.findById(resid);

  if (restaurent) {
    const data = restaurent.rmenu.push({
      name: iname,
      des: ides,
      price: iprice,
      type: itype
    });
    const update = await restaurent.save();
    res
      .status(200)
      .send({ data: update, message: `${iname} Added Sucssessfully !` });
  } else {
    res.status(202).send({ message: "Error" });
  }
});


// Remove Menu Item
router.post("/removemenu", async (req, res) => {
  try {
    const { resid, iid } = req.body;
    const data = await Restaurantinfo.findOneAndUpdate(
      { _id: resid },
      { $pull: { rmenu: { _id: iid } } }
    );
    if (data) res.status(200).send({ data: data, message: "deleted" });
    else res.status(202).send({ message: " not found or some error occured" });
  } catch (err) {
    console.log(err);
  }
});


// Edit Menu
router.post("/editmenu", async (req, res) => {
  try {
    let { resid, menuIndex, newData } = req.body;
    console.log(resid, menuIndex, newData);

    const data = await Restaurantinfo.findById(resid);
    if (data) {
      let restaurantMenu = data.rmenu;
      if (restaurantMenu) {
        menuIndex = parseInt(menuIndex);
        console.log(restaurantMenu[menuIndex]);
        restaurantMenu[menuIndex].name = newData.name;
        restaurantMenu[menuIndex].des = newData.des;
        restaurantMenu[menuIndex].price = newData.price;
        restaurantMenu[menuIndex].type = newData.type;

        const updatedData = await data.save();

        res.status(200).send({ updatedData, message: "Menu Updated Successfully!" });
      }
      else
        res.status(202).send({ message: "Menu not found" });
    }else
      res.status(201).send({ message: "Restaurant not found" });
  } catch (e) {
    // $Set
    res.status(202).send({ message: `${e}` });
  }
});


// Find All Restaurant
router.post("/res", async (req, res) => {
  try {
    const data = await Restaurantinfo.find({});
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(202).send({ message: "Error ocuured" });
  }
});


// Get Restaurant By Id
router.post("/getrestaurent", async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Restaurantinfo.findById(id);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(202).send({ message: "Error ocuured" });
  }
});


// Fetch Orders



// GenerateBill
router.get("/generatebill", async (req, res) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment;filename=yourBill.pdf",
  });

  pdf_generator.billPdf(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    { rname: "Deep's Cafe" }
  );
});


module.exports = router;