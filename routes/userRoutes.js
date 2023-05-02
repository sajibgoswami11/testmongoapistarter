const express = require("express");
const router = express.Router();
const User = require('../models/userSchema');
// Middleware function to log incoming requests
const logRequests = (req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
}


router.post('/addusers', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password:req.body.password
    });
    console.log(user);
    try {
      const result = await user.save();
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  router.put('/useredit/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  router.get('/getusers', async (req, res) => {
    try {
     
      const users = await User.find();
      res.send(users);

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });


  module.exports = {
    router,
    logRequests
  };