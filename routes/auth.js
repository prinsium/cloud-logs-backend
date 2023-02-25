const express = require('express');
const router = express.Router();
const User= require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser= require("../middleware/fetchuser");

const JWT_SECRET="primus@b6m$pr";

//ROUTE 1: creating a user
router.post('/createuser', [
  body('name', 'enter a valid name containing atleast 4 charecters').isLength({ min: 4 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'should contain atleast 5 charecters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });}

      try{
        //checking if email already exist
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({success, error: "a user with this email already exist"})
      }

      //using bcrypt to secure password
      const salt= await bcrypt.genSalt(10);
      const secpass= await bcrypt.hash(req.body.password, salt);
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secpass,
       })
       
       const data ={
        user:{
          id: user.id
        }
       }
       const authtoken = jwt.sign(data, JWT_SECRET);
       
       success = true;
       res.json({success, authtoken})

      }catch(error){
        console.error(error.message);
        res.status(500).send("something wrong occured!")
      }
})

//ROUTE 2: authenticating a user
router.post('/login', [ 
  body('email', 'Enter a valid email').isEmail(), 
  body('password', 'Password can not be blank').exists(), 
], async (req, res) => {
  let success = false;

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


//ROUTE 3:
router.post('/getuser', fetchuser, async (req, res) => {

try {
  userID= req.user.id;
  const user= await User.findById(userID).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})


module.exports = router