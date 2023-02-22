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

//singleUsers

exports.singleuserget = async (req, res) => {
    const { id } = req.params;
  
    try {
      const userdata = await users.findOne({ _id: id });
      res.status(200).json(userdata);
    } catch (error) {
      res.status(401).json(error);
    }
  };
//user edit
  exports.useredit = async (req, res) => {
    const { id } = req.params;
    const {userName, email, mobile, address,user_profile,} = req.body;
    const file = req.file ? req.file.filename : user_profile;
  
    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  
    try {
      const updateuser = await users.findByIdAndUpdate( { _id: id },
        { userName, email, mobile, address,profile: file,dateUpdated,},
        {
          new: true,
        }
      );
      await updateuser.save();
      res.status(200).json(updateuser);
    } catch (error) {
      res.status(401).json(error);
    }
  }

//delete user

exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
      const deletuser = await users.findByIdAndDelete({ _id: id });
      res.status(200).json(deletuser);
    } catch (error) {
      res.status(401).json(error);
    }
  };