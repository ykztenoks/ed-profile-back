const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(

  {
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
    brand: {
        type: String
    },
    category: {
        type: String,
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

