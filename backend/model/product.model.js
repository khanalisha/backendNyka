const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 50 },
    picture: String,
    gender: { type: String, enum: ["male", "female"], required: true },
    category: {
      type: String,
      enum: ["makeup", "skincare", "haircare"],
      required: true,
    },
    description: String,
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
