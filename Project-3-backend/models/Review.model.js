const { Schema, model } = require("mongoose");
const Product = require('../models/Product.model');
const User = require('../models/User.model');


const reviewSchema = new Schema( 
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: Product,
            required: true,
        },
        rating: { 
            type: String,
            required: true,
            enum: ["⭐️", "⭐️⭐️", "⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️⭐️"],
        },
        review: {
            type: String,
            maxLength: 400,
        },
        addedBy: {
            type: Schema.Types.ObjectId,
            ref: User
        }
    },
    {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
    }
);

const Review = model("Review", reviewSchema);

module.exports = Review;