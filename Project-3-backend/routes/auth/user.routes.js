const express = require('express');
const router = express.Router();
const User = require('../../models/User.model');
const bcrypt = require("bcryptjs");
const { isLoggedOut } = require("../../middleware/route-guard");
const { findOneAndUpdate } = require('../../models/User.model');

// get sign up page

router.get('/signUp', async (req, res) => {
    res.status(200).json('sign up route');
})

// make a new member

router.post('/signUp', async (req, res, next) => {
    const body = req.body;
    try { 
        const user = await User.create(body);
        console.log(user);
    } catch (error) { 
       if (error.status = 11000) {
        res.json('That username is already taken. Please try another one')
       }
        
    }
})

// get all users 

router.get('/users', async (req, res, next) => {
  try {
  const allUsers = await User.find()
  res.status(200).json(allUsers)
  console.log(allUsers)
  res.json(error.status)
} catch (error) {
}
})

// get one user by username

router.get('/users/:username', async (req, res, next) => {
  const {userName} = req.params
  try {
  const user = await User.findOne(userName)
  console.log(user)
  res.json(user)
} catch (error) {
    console.log(error)
}
})

/*router.post("/signUp", isLoggedOut, async (req, res) => {
    const credentials = { ...req.body };
  
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(credentials.password, salt);
  
    delete credentials.password;
    credentials.passwordHash = passwordHash;
    credentials.avatar = undefined;
    credentials.bio = undefined;
  
    try {
      await User.create(credentials);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      //Username already used
      if (error.code === 11000) {
        res.redirect("/signUp", {
          errorMessage: "Username already exists!",
          user: undefined,
        });
      } else {
        res.redirect("/signUp", {
          errorMessage: error,
          user: undefined,
        });
      }
    }
  });*/

  // update one user

router.put('/:username/update', async (req, res, next) => {
    const body = req.body;
    try {
        const userName = req.params.username;
        const userUpdate = await User.findOneAndUpdate({ userName: userName }, body, {new: true});
        res.json(userUpdate);
        console.log(userUpdate)
    } catch (error) { 
        console.log(error);
    }
})

// delete one user
router.delete('/:username/delete', async (req, res, next) => {
    try {
        const userDelete = await User.findOneAndDelete({ userName: req.params.username });
        res.status(400).json({ msg: `No member with the username of ${req.params.username}` })

    } catch (error) {
        console.log(error); 
    }
})
module.exports = router;