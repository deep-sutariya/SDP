const express = require("express");
const router = express.Router();
const UserInfo = require("../model/userinfo");
const bcrypt = require("bcryptjs");
const Restaurantinfo = require("../model/restaurantInfo");
const hashpassword = require("../middleware/hashpassword");
const userhashpassword = require("../middleware/userhashpassword");
const { io } = require("socket.io-client");
const socket = io("http://localhost:5000");
var nodemailer = require("nodemailer");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userInfo } = require("os");

router.post("/py", async (req, res) => {
  const spawner = require("child_process").spawn;
  console.log(req.body.food);
  const food = req.body.food.toLowerCase();
  const python_process = spawner("python", ["route/ML/sdp.py", food]);
  let flag = false;

  python_process.stdout.on("data", (data) => {
    data = JSON.parse(data.toString());
    if (data.length > 0) {
      flag = true;
      res.send(data);
    }
  });
  python_process.stderr.on("data", (err) => {
    console.log(err.toString());
  });
  python_process.stdout.on("close", (data) => {
    console.log("close", data);
    if (!flag) {
      res.send({ message: "Currently i am updating! try again later" });
    }
  });
});

// Sign Up
router.post("/signup", userhashpassword, async (req, res) => {
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
    let n = parseInt(req.body.rtable);
    let tablearr = new Array(24);
    let tableDetail = new Array(24);
    for (let i = 0; i < 24; ++i) {
      tablearr[i] = n;
    }

    const restaurantInfo = new Restaurantinfo({
      rname: req.body.rname,
      roname: req.body.roname,
      rphone: req.body.rphone,
      raddress: req.body.raddress,
      remail: req.body.remail,
      rurl: req.body.rurl,
      rcity: req.body.rcity,
      rtableno: req.body.rtable,
      rtable: tablearr,
      // registeredtableinfo: tableDetail,
      rpincode: req.body.rpincode,
      rimage: req.body.rimage,
      rpass: req.body.rpass,
      rmenu: req.body.rmenu,
      rating: 0,
    });

    const data = await restaurantInfo.save();
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
      restaurant.rtableno = req.body.rtableno;
      restaurant.rimage = req.body.rimage;
      restaurant.rpass = req.body.rpass;
      restaurant.rmenu = req.body.rmenu;

      const data = await restaurant.save();
      // console.log(data);
      res.status(200).send({
        data: data,
        message: `Updation has been done SuccessFully !`,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(203).send({ message: "Error Accured" });
  }
});

// User Login Details
router.post("/userlogin", async (req, res) => {
  const { uemail, upass } = req.body;
  console.log(req.body);
  const user = await UserInfo.findOne({ uemail: uemail });
  if (user) {
    if (await bcrypt.compare(upass, user.upass)) {
      var token = jwt.sign(
        { email: user.uemail, pass: upass },
        `${process.env.TOCKEN_PRIVATE_KEY}`
      );

      res.status(200).send({
        data: user,
        cookie: token,
        type: "user",
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
      var token = jwt.sign(
        { email: restaurent.remail, pass: upass },
        `${process.env.TOCKEN_PRIVATE_KEY}`
      );

      res.status(200).send({
        data: restaurent,
        cookie: token,
        type: "restaurent",
        message: `Hello ${restaurent.rname}, You Logged in successfully!`,
      });
      // console.log(restaurent);
    } else
      res.status(201).send({ message: "Error! : *** Invalid Password ***" });
  } else {
    res.status(202).send({ message: "Error! : *** RestaurentNotfound ***" });
  }
});

// Add MEnu Item
router.post("/addmenu", async (req, res) => {
  // console.log(req.body);
  const { resid, iname, iprice, ides, itype, iimage } = req.body;
  const restaurent = await Restaurantinfo.findById(resid);
  console.log(req.body);
  if (restaurent) {
    const data = restaurent.rmenu.push({
      name: iname,
      des: ides,
      price: iprice,
      type: itype,
      image: iimage,
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
    const menu = await Restaurantinfo.findById(resid);
    if (data) res.status(200).send({ data: menu.rmenu, message: "deleted" });
    else res.status(202).send({ message: " not found or some error occured" });
  } catch (err) {
    console.log(err);
  }
});

// Edit Menu
router.post("/editmenu", async (req, res) => {
  try {
    let { resid, menuIndex, newData, image_url } = req.body;
    // console.log(resid, menuIndex, newData);
    console.log(newData);

    const data = await Restaurantinfo.findById(resid);
    if (data) {
      let restaurantMenu = data.rmenu;
      if (restaurantMenu) {
        menuIndex = parseInt(menuIndex);
        // console.log(restaurantMenu[menuIndex]);
        restaurantMenu[menuIndex].name = newData.name;
        restaurantMenu[menuIndex].des = newData.des;
        restaurantMenu[menuIndex].price = newData.price;
        restaurantMenu[menuIndex].type = newData.type;
        restaurantMenu[menuIndex].image = image_url;
        const updatedData = await data.save();

        res
          .status(200)
          .send({ updatedData, message: "Menu Updated Successfully!" });
      } else res.status(202).send({ message: "Menu not found" });
    } else res.status(201).send({ message: "Restaurant not found" });
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
    var token = jwt.sign({ id: id }, `${process.env.TOCKEN_PRIVATE_KEY}`);

    const data = await Restaurantinfo.findById(id);
    // console.log(data);
    res.status(200).send({ data: data, selectedrestaurenttoken: token });
  } catch (err) {
    console.log(err);
    res
      .status(202)
      .send({ message: "Error ocuured", selectedrestaurenttoken: token });
  }
});

// Fetch Orders
router.post("/saveorder", async (req, res) => {
  console.log(req.body);
  const { userid, orderres, order, ordertotal } = req.body;
  const month = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const date = new Date();
  const ordertime = date.toDateString();
  const ordermonth = date.getMonth();
  const user = await UserInfo.findById(userid);
  const restaurant = await Restaurantinfo.findById(orderres);
  const orderid = "id" + Math.random().toString(16).slice(2);
  const userorderData = {
    orderid: orderid,
    resname: restaurant.rname,
    restaurantid: orderres,
    ordermenu: order,
    ordertotal: ordertotal,
    ordertime: ordertime,
    ordermonth: month[ordermonth],
    orderstatus: "1",
  };
  const resorderData = {
    orderid: orderid,
    orderuser: userid,
    username: user.uname,
    ordermenu: order,
    ordertotal: ordertotal,
    ordertime: ordertime,
    ordermonth: month[ordermonth],
    orderstatus: "1",
  };
  let uorders = user.uorders;
  uorders.unshift(userorderData);
  console.log(uorders);
  user.uorders = uorders;
  let resorders = restaurant.rorders;
  resorders.unshift(resorderData);
  restaurant.rorders = resorders;

  const updateuser = await user.save();
  const updateres = await restaurant.save();

  res.status(200).send({ message: `${user.uname}, Your Order Is Placed` });
});

router.post("/getuserorder", async (req, res) => {
  const { email, month } = req.body;
  console.log(req.body);
  const user = await UserInfo.findOne({ uemail: email });
  const data = [];
  const orders = user?.uorders;
  if (month === "all") {
    res.status(200).send(orders);
  } else {
    orders.forEach((element) => {
      if (element.ordermonth === month) {
        data.push(element);
      }
    });
    // console.log(data);
    res.status(200).send(data);
  }
});

router.post("/getrestaurantorder", async (req, res) => {
  const { email, month } = req.body;

  // console.log(req.body);
  const restaurant = await Restaurantinfo.findOne({ remail: email });
  const data = [];
  const orders = restaurant.rorders;
  if (month === "all") {
    res.status(200).send(orders);
  } else {
    orders.forEach((element) => {
      if (element.ordermonth === month) {
        data.push(element);
      }
    });
    // console.log(data);
    res.status(200).send(data);
  }
});

router.post("/updatestatus", async (req, res) => {
  const { email, orderid, status } = req.body;
  const restaurant = await Restaurantinfo.findOne({ remail: email });
  let id;
  const orders = restaurant.rorders;
  orders.forEach((element) => {
    if (element.orderid === orderid) {
      element.orderstatus = status;
      id = element.orderuser;
    }
  });
  const user = await UserInfo.findById(id);
  const userorder = user?.uorders;
  userorder.forEach((element) => {
    if (element.orderid === orderid) {
      element.orderstatus = status;
    }
  });
  await Restaurantinfo.updateOne(
    { remail: email },
    { $set: { rorders: orders } }
  );
  await UserInfo.updateOne(
    { uemail: user.uemail },
    { $set: { uorders: userorder } }
  );

  socket.emit("statusupdated", req.body);

  res.status(200).send({ orders: orders });
});

router.post("/updaterating", async (req, res) => {
  const { rating, resid } = req.body;
  const restaurant = await Restaurantinfo.findById(resid);

  let RatingCount = restaurant.ratingcount;
  let TotalRating = restaurant.totalrating;

  let newRating = (rating + TotalRating) / (RatingCount + 1);
  newRating = newRating.toFixed(1);
  await Restaurantinfo.updateOne(
    { remail: restaurant.remail },
    {
      $set: {
        rating: newRating,
        ratingcount: RatingCount + 1,
        totalrating: TotalRating + rating,
      },
    }
  );
  res.status(200).send({ message: `Rating Updated to ${newRating}!` });
});

// BookTable

router.post("/booktable", async (req, res) => {
  const { noofpeople, time, resid, userid } = req.body;
  console.log("Backend->", { userid });

  const user = await UserInfo.findById(userid);
  const restaurant = await Restaurantinfo.findById(resid);

  const hour = time.split(":")[0];

  if (restaurant.rtable[hour] >= noofpeople) {
    restaurant.rtable[hour] -= noofpeople;

    let arr = restaurant.registeredtableinfo;
    arr.unshift({
      userid: user._id,
      username: user.uname,
      userphone: user.uphone,
      noofpeople: noofpeople,
      reservationtime: hour,
    });
    restaurant.registeredtableinfo = arr;

    let arr1 = user.registeredtableinfo;
    arr1.unshift({
      resid: restaurant._id,
      resname: restaurant.rname,
      resaddress: restaurant.raddress,
      respincode: restaurant.rpincode,
      resphone: restaurant.rphone,
      noofpeople: noofpeople,
      reservationtime: hour,
    });
    user.registeredtableinfo = arr1;

    await restaurant.save();
    await user.save();

    res
      .status(200)
      .send(`Table Booked For ${noofpeople} People. See you at ${time}.`);
  } else {
    res
      .status(202)
      .send(`Table Not Available For ${noofpeople} People at ${time}.`);
  }
});

router.post("/getreservations", async (req, res) => {
  const { id, type } = req.body;
  let data;
  console.log("-->", req.body);

  if (type == "restaurent") {
    data = await Restaurantinfo.findById(id);
  } else {
    data = await UserInfo.findById(id);
  }

  // console.log(data?.registeredtableinfo);
  res.send(data?.registeredtableinfo);
});

router.post("/forgot-password", async (req, res) => {
  const uemail = req.body.email;
  const olduser = await UserInfo.findOne({ uemail: uemail });
  if (!olduser) res.send("User Not Exists");
  const secret = `${process.env.TOCKEN_PRIVATE_KEY}` + olduser.upass;
  const token = jwt.sign({ email: olduser.uemail, id: olduser._id }, secret, {
    expiresIn: "5m",
  });
  const link = `http://localhost:5000/reset-password/${olduser._id}/${token}`;
  console.log(link);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "deepsutariya002@gmail.com",
      pass: "cdqdmfobnrlnnxao",
    },
  });

  var mailOptions = {
    from: "deepsutariya002@gmail.com",
    to: "deepsutariya001@gmail.com",
    subject: "Reset Password",
    html: `<h2>${link}</h2>`,
  };

  const info = await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.send("Password Updated");
    }
  });
});

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  const olduser = await UserInfo.findOne({ _id: id });
  if (!olduser) res.send("User Not Found");
  const secret = `${process.env.TOCKEN_PRIVATE_KEY}` + olduser.upass;

  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email });
  } catch (e) {
    res.send("Not verified");
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const olduser = await UserInfo.findOne({ _id: id });
  if (!olduser) res.send("User Not Found");
  const secret = `${process.env.TOCKEN_PRIVATE_KEY}` + olduser.upass;

  try {
    const verify = jwt.verify(token, secret);
    const hshpass = await bcrypt.hash(password, 10);
    await UserInfo.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          upass: hshpass,
        },
      }
    );
    res.send("Password Updated");
  } catch (e) {
    res.send("Something went wrong");
  }
});

module.exports = router;
