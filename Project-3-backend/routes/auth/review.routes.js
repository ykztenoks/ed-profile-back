const express = require('express');
const router = express.Router();
const Review = require('../../models/Review.model');

// // get reviews page
// router.get('/reviews', async (req, res) => {
//     res.json('you will see the reviews here');
// })

// get all reviews
router.get('/reviews', async (req, res, next) => {
    try {
    const allReviews = await Review.find()
    res.status(200).json(allReviews)
    console.log(allReviews)
    res.json(error.status)
  } catch (error) {
  }
})

// get all for one particular product
router.get('/reviews/find/:product', async (req, res, next) => {
    try {
        const allReviews = await Review.find({ product: req.params.product})
        res.status(200).json(allReviews)
        console.log(allReviews)
    } catch (error) {
        res.json(error.status)
    }
})

// create a new review
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

// update one review by id
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

// delete one review by id
router.delete('/reviews/delete/:id', async (req, res, next) => {
    try {
        const deletedReview = await Review.findOneAndDelete({ _id: req.params.id });
        res.status(200).json("Review has been deleted.")
        // res.status(400).json({ msg: `No review with the following id: ${req.params.id}` })
    } catch (error) {
        console.log(error); 
    }
})

// get all for 1 particular user


module.exports = router;