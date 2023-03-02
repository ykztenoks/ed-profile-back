const express = require('express');
const router = express.Router();
const User = require('../../models/User.model');


router.get('/signUp', async (req, res) => {
    res.json('sign up route');
})

router.post('/signUp', async (req, res, next) => {
    const body = req.body;
    try { 
        const user = await User.create(body);
        console.log(user);
        res.json(user);
    } catch (error) { 
        console.log(error);
    }
})

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

router.delete('/:username/delete', async (req, res, next) => {
    try {
        const userDelete = await User.findOneAndDelete({ userName: req.params.username });
        res.status(400).json({ msg: `No member with the username of ${req.params.username}` })

    } catch (error) {
        console.log(error); 
    }
})
module.exports = router;