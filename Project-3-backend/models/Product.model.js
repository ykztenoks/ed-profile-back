const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(

  {
    id: {
        type: Number,
        unique: true
      },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number
    },
    rating: {
        type: Number
    },
    stock: {
        type: Number
    },
    brand: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Product = model("Product", ProductSchema);

module.exports = Product;

