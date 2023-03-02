const express = require('express');
const router = express.Router();
const UsedProduct = require('../../models/UsedProduct.model');


router.get('/usedProducts', async (req, res) => {
    res.json('you will see the used products here');
})

router.post('/usedProducts', async (req, res, next) => {
    const body = req.body;
    try { 
        const usedProduct = await UsedProduct.create(body);
        console.log(usedProduct);
        res.json(usedProduct);
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