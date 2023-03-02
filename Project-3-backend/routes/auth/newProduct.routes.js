const express = require('express');
const router = express.Router();
const NewProduct = require('../../models/NewProduct.model');


router.get('/newProducts', async (req, res) => {
    res.json('you will see the new products here');
})

router.post('/newProducts', async (req, res, next) => {
    const body = req.body;
    try { 
        const newProduct = await NewProduct.create(body);
        console.log(newProduct);
        res.json(newProduct);
    } catch (error) { 
        console.log(error);
    }
})

// router.put('/:username/update', async (req, res, next) => {
//     const body = req.body;
//     try {
//         const userName = req.params.username;
//         const userUpdate = await User.findOneAndUpdate({ userName: userName }, body, {new: true});
//         res.json(userUpdate);
//         console.log(userUpdate)
//     } catch (error) { 
//         console.log(error);
//     }
// })

// router.delete('/:username/delete', async (req, res, next) => {
//     try {
//         const userDelete = await User.findOneAndDelete({ userName: req.params.username });
//         res.status(400).json({ msg: `No member with the username of ${req.params.username}` })

//     } catch (error) {
//         console.log(error); 
//     }
// })
module.exports = router;