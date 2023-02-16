const bcrypt = require('bcryptjs');
const hashpassword = async (req, res, next) => {
    try{
        console.log(req.body.rpass);
        req.body.rpass = await bcrypt.hash(req.body.rpass, 10);
        next();
    }catch(err){
        console.log(err);
        res.status(404).send({message : "error"});
    }
}

module.exports = hashpassword;