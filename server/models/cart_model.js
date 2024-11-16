const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'LapStore', required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    collection: 'carts',
    timestamps: true,
  }
);

const CartModel = mongoose.model('Cart', cartSchema);
module.exports = { CartModel };
