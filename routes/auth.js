const express = require('express');
const router = express.Router();
const User= require('../models/User');
const { body, validationResult } = require('express-validator');


router.post('/createuser', [
  body('name', 'enter a valid name containing atleast 4 charecters').isLength({ min: 4 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'should contain atleast 5 charecters').isLength({ min: 5 }),
], async (req, res) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });}

      try{
        //checking if email already exist
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error: "a user with this email already exist"})
      }
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
       })
       
       res.json(user)
      }catch(error){
        console.error(error.message);
        res.status(500).send("something wrong occured!")
      }
})

module.exports = router