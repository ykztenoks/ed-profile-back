const express = require('express');
const router = express.Router();
const Review = require('../../models/Review.model');


router.get('/reviews', async (req, res) => {
    res.json('you will see the reviews here');
})

router.post('/reviews', async (req, res, next) => {
    const body = req.body;
    try { 
        const review = await Review.create(body);
        console.log(review);
        res.json(review);
    } catch (error) { 
        console.log(error);
    }
})

router.put('/reviews/update/:id', async (req, res, next) => {
    const body = req.body
    console.log(body)
    const selectedReview = req.params.id
    try {
        const updatedReview = await Review.findByIdAndUpdate(selectedReview, body, {new: true});
        res.json(updatedReview)
    } catch (error) {
        console.error(error)
        
    }
})

module.exports = router;