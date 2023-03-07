const { Schema, model, Types } = require("mongoose");
const {User} = require('../models/User.model');

const NewProductSchema = new Schema(

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
        enum : ["new", "used"],
        required: true,
    },
  addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
   },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const NewProduct = model("NewProduct", NewProductSchema);

module.exports = NewProduct;

