const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: String },
  date: { type: String },
  time: { type: String },

  item: [
    {
      service: { type: String },
      quantity: { type: Number },
      image: { type: String },
      width: { type: Number },
      height: { type: Number },
      price: { type: Number },
      description: { type: String },
      printwear: [
        {
          itemNumber: { type: String },
          brandName: { type: String },
          itemName: { type: String },
          size: { type: String },
          color: { type: String },
          peices: { type: Number },
          price: { type: Number },
        },
      ],
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
