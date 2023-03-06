const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const { isLoggedOut } = require("../../middleware/route-guard");
const { findOneAndUpdate } = require("../../models/User.model");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken')

// get sign up page

router.get("/signUp", async (req, res) => {
  res.status(200).json("sign up route");
});

// make a new member

router.post("/signUp", async (req, res, next) => {
  // Hash password
  const salt = bcrypt.genSaltSync(13);
  const body = req.body;
  const hashedPassword = bcrypt.hashSync(req.body.passwordHash, salt);

  // Create the User
  try {
    const user = await User.create({
      userName: body.userName,
      email: body.email,
      passwordHash: hashedPassword,
    });

    res.status(201).send({ message: "User created" });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

// Login

router.post("/login", async (req, res) => {
  //Check username
  const matchedUserArr = await User.find({ userName: req.body.userName });

  if (matchedUserArr.length) {
    const currentUser = matchedUserArr[0];
    //Check password
    if (bcrypt.compareSync(req.body.passwordHash, currentUser.passwordHash)) {
   

      //Generate the JWT
 
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // makes sure the token will expire after a set time
          data: { user: { userName: currentUser.userName, email: currentUser.email } },
        },
        process.env.TOKEN_SECRET
      ); // adds a secret to the .env
      res.json({ token, userName: currentUser.userName })
    } else {
      res.status(403).json({ message: "Wrong password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// get all users

router.get("/users", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
    console.log(allUsers);
    res.json(error.status);
  } catch (error) {
    console.log(error);
  }
});

// get one user by username

router.get("/users/:username", async (req, res, next) => {
  const { userName } = req.params;
  try {
    const user = await User.findOne(userName);
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

// update one user

router.put("/:username/update", async (req, res, next) => {
  const body = req.body;
  try {
    const userName = req.params.username;
    const userUpdate = await User.findOneAndUpdate(
      { userName: userName },
      body,
      { new: true }
    );
    res.json(userUpdate);
    console.log(userUpdate);
  } catch (error) {
    console.log(error);
  }
});

// delete one user
router.delete('/:username/delete', async (req, res, next) => {
    try {
        const userDelete = await User.findOneAndDelete({ userName: req.params.username });
        res.status(200).json("User has been deleted")
    } catch (error) {
        // res.status(400).json({ msg: `No member with the username of ${req.params.username}` })
        console.log(error); 
    }
})

module.exports = router;
