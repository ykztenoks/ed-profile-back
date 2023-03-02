const { Schema, model } = require("mongoose");

const UsedProductSchema = new Schema(

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

const UsedProduct = model("UsedProduct", UsedProductSchema);

module.exports = UsedProduct;

