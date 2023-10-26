const mongoose = require('mongoose');

const cartSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [{
    productId: {
      type: Number,
      required: true,
    },
    qunatity: {
      type: Number,
      required: true
    },
    product: {
      title: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discountedPrice: {
        type: Number,
      }
    }
  }],
  cartTotal: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
};

module.exports = mongoose.model('Cart', cartSchema);