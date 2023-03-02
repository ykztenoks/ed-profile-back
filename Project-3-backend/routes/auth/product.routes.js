const express = require('express');
const router = express.Router();
const Product = require('../../models/Product.model');


router.get('/products', async (req, res) => {
    res.json('you will see the used products here');
})

router.post('/products', async (req, res, next) => {
    const body = req.body;
    try { 
        const product = await Product.create(body);
        console.log(product);
        res.json(product);
    } catch (error) { 
        console.log(error);
    }
})

router.put('/products/update/:id', async (req, res, next) => {
    const body = req.body
    console.log(body)
    const selectedProduct = req.params.id
    try {
        const updatedProduct = await Product.findByIdAndUpdate(selectedProduct, body, {new: true});
        res.json(updatedProduct)
    } catch (error) {
        console.error(error)
        
    }
}
)

router.delete('/:username/delete', async (req, res, next) => {
    try {
        const userDelete = await User.findOneAndDelete({ userName: req.params.username });
        res.status(400).json({ msg: `No member with the username of ${req.params.username}` })

    } catch (error) {
        console.log(error); 
    }
})

module.exports = router;