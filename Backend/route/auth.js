const express = require("express");
const router = express.Router();
const UserInfo = require("../model/userinfo");
const bcrypt = require("bcryptjs");
const Restaurantinfo = require("../model/restaurantInfo");
const hashpassword = require("../middleware/hashpassword");
const userhashpassword = require("../middleware/userhashpassword");
const pdf_generator = require("../service/pdf_generator");

require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post("/py",async (req,res) => {
  const spawner = require('child_process').spawn;
  const data_to_pass_in = 'send this to the py file';

  console.log('Data sent to the python Script ',data_to_pass_in);

  const python_process =  spawner('python',['route/ML/sdp.py',data_to_pass_in]);
  let data1;
  python_process.stdout.on('data', data => {
    console.log(data.toString())
    if(data.toString()) data1 = JSON.parse(data.toString());

    console.log(req.body);
    let flag=0;

    let ans = new Array();

    data1.map((item,index)=>{
      if(item.food1.toLowerCase().trim() === req.body.food.toLowerCase().trim()){
        console.log(item.food2);
        flag=1;
        ans.push({"name":item.food2})
        // res.status(200).send({data: item.food2});
      }
      if(item.food2.toLowerCase().trim() === req.body.food.toLowerCase().trim()){
        console.log(item.food1);
        flag=1;
        ans.push({"name":item.food1})
        // res.status(200).send({data: item.food1});
      }
    })

    console.log(ans);
    if(ans[0]) res.send(ans);
    if(flag === 0){
      res.send({message:"Currently i didn't find best pair. I'm still improving..!"});
    }
    
  });

  python_process.stdout.on('close', data => {
    console.log("close");
    if(!data1)
      res.send({message: "process Ended"});
  })
})

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
    const restaurantInfo = new Restaurantinfo({
      rname: req.body.rname,
      roname: req.body.roname,
      rphone: req.body.rphone,
      raddress: req.body.raddress,
      remail: req.body.remail,
      rurl: req.body.rurl,
      rcity: req.body.rcity,
      rpincode: req.body.rpincode,
      rimage:req.body.rimage,
      rpass: req.body.rpass,
      rmenu: req.body.rmenu,
      rating: 0
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
      
      var token = jwt.sign({email: restaurent.remail, pass: upass}, `${process.env.TOCKEN_PRIVATE_KEY}`);

      res.status(200).send({
        data: restaurent,
        cookie: token,
        type: "restaurent",
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
  // console.log(req.body);
  const { resid, iname, iprice, ides, itype,iimage } = req.body;
  const restaurent = await Restaurantinfo.findById(resid);

  if (restaurent) {
    const data = restaurent.rmenu.push({
      name: iname,
      des: ides,
      price: iprice,
      type: itype,
      image: iimage
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
    // console.log(resid, menuIndex, newData);

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
        restaurantMenu[menuIndex].image = newData.image;
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
    var token = jwt.sign({ id: id}, `${process.env.TOCKEN_PRIVATE_KEY}`);

    const data = await Restaurantinfo.findById(id);
    // console.log(data);
    res.status(200).send( {data: data, selectedrestaurenttoken : token} );
  } catch (err) {
    console.log(err);
    res.status(202).send({ message: "Error ocuured",selectedrestaurenttoken: token });
  }
});


// Fetch Orders
router.post('/saveorder', async(req,res) => {
  const {userid,orderres,order,ordertotal} = req.body;
  const month = ["january","february","march","april","may","june","july","august","september","october","november","december"];

  const date = new Date();
  const ordertime = date.toDateString();
  const ordermonth = date.getMonth();
  const user = await UserInfo.findById(userid);
  const restaurant = await Restaurantinfo.findById(orderres);
  const orderid = "id" + Math.random().toString(16).slice(2);
  const userorderData = {
    orderid : orderid,
    resname: restaurant.rname,
    restaurantid: orderres,
    ordermenu: order,
    ordertotal: ordertotal,
    ordertime: ordertime,
    ordermonth:month[ordermonth],
    orderstatus: "1"
  }
  const resorderData = {
    orderid : orderid,
    orderuser: userid,
    username: user.uname,
    ordermenu: order,
    ordertotal: ordertotal,
    ordertime: ordertime,
    ordermonth:month[ordermonth],
    orderstatus: "1"
  }
  let uorders = user.uorders;
  uorders.unshift(userorderData);
  console.log(uorders);
  user.uorders = uorders;
  let resorders = restaurant.rorders;
  resorders.unshift(resorderData);
  restaurant.rorders = resorders;
  const updateuser = await user.save();
  const updateres = await restaurant.save();
  console.log("asdsad");

  res.status(200).send({message: `${user.uname}, Your Order Is Placed`});

})

router.post("/getuserorder",async (req,res) => {

  const { email ,month} = req.body;
  // console.log(req.body);
  const user = await UserInfo.findOne({uemail :email});
  const data = [];
  const orders = user.uorders;
  if(month === "all"){
    res.status(200).send(orders);
  }else{
    orders.forEach(element => {
      if(element.ordermonth === month){
        data.push(element);
      }
    })
    // console.log(data);
    res.status(200).send(data);
  }

});

router.post("/getrestaurantorder", async(req,res) => {
  const { email,month } = req.body;

  // console.log(req.body);
  const restaurant = await Restaurantinfo.findOne({remail :email});
  const data = [];
  const orders = restaurant.rorders;
  if(month === "all"){
    res.status(200).send(orders);
  }else{
    orders.forEach(element => {
      if(element.ordermonth === month){
        data.push(element);
      }
    })
    // console.log(data);
    res.status(200).send(data);
  }


});

router.post("/updatestatus", async(req,res) =>{
  const {email ,orderid ,status} = req.body;
  const restaurant = await Restaurantinfo.findOne({remail :email});
  let id;
  const orders = restaurant.rorders;
  orders.forEach(element => {
    if(element.orderid === orderid){
      element.orderstatus = status;
      id = element.orderuser;
    }
  });
  const user = await UserInfo.findById(id);
  const userorder = user?.uorders;
  userorder.forEach(element => {
    if(element.orderid === orderid){
      element.orderstatus = status;
    }
  });
  await Restaurantinfo.updateOne({remail : email},{$set : {rorders : orders}})
  await UserInfo.updateOne({uemail : user.uemail},{$set : {uorders : userorder}})
  res.status(200).send({orders : orders});
  

});

router.post("/updaterating",async (req,res) => {

  const {rating, resid} = req.body;
  const restaurant = await Restaurantinfo.findById(resid);
  
  let RatingCount = restaurant.ratingcount;
  let TotalRating = restaurant.totalrating;

  let newRating = (rating + TotalRating)/(RatingCount+1);
  newRating = newRating.toFixed(1);
  await Restaurantinfo.updateOne({remail: restaurant.remail},{$set : {rating: newRating,ratingcount: RatingCount+1,totalrating: TotalRating+rating}});
  res.status(200).send({message: `Rating Updated to ${newRating}!`});

})


// ChatBox



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