const bcrypt = require('bcryptjs');
const userhashpassword = async (req, res, next) => {
    try{
        console.log(req.body.rpass);
        req.body.upass = await bcrypt.hash(req.body.upass, 10);
        next();
    }catch(err){
        console.log(err);
        res.status(404).send({message : "error"});
    }
}


module.exports = userhashpassword;