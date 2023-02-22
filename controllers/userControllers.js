const moment = require("moment/moment");
const users = require("../models/userSchema");

const BASE_URL = process.env.BASE_URL

// post userData

exports.userpost = async (req, res) => {
    const file = req.file.filename;
    const { userName, email, mobile, address } = req.body;

    if ( !userName || !email || !mobile ||  !address ||!file) {
        res.status(401).json("All Inputs is required");
     }
     try {
        const preUser = await users.findOne({ email: email });
    
        if (preUser) {
          res.status(401).json("This user already exist in our databse");
        } else {
          const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
          const userData = new users({ userName, email, mobile, address, profile: file, datecreated});
    
          await userData.save();
          res.status(200).json(userData);
        }
      } catch (error) {
        res.status(401).json(error);
        console.log("catch block error");
      }    
}

// usersget

exports.userget = async (req, res) => {
    try{
        const userData = await users.find();
        
        res.status(200).json({
            userData,
          });
    }catch(error){
        res.status(401).json(error);
    }
}
