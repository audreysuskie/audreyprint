const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerID: { type: String },

  service: { type: String },

  dateReq: { type: String, default: 'ASAP' },

  mod: { type: String },

  customerInfo: {
    customerName: { type: String },
    company: { type: String },
    email: { type: String },
    phone: { type: String },
  },

  orderNumber: { type: String },

  orderDate: { type: String },

  orderFiles: { type: Array },

  orderSpecs: {
    fileID: { type: String },
    dimensions: { type: String },
    placement: { type: String },
    garmentType: { type: String },
    garmentBrand: { type: String },
    garmentItemNumber: { type: String },
    garmentColor: { type: String },
    qtyBySize: {
      sizeXS: { type: Number },
      sizeS: { type: Number },
      sizeM: { type: Number },
      sizeL: { type: Number },
      sizeXL: { type: Number },
      size2XL: { type: Number },
      size3XL: { type: Number },
    },
  },
  orderInfo: [
    {
      fileID: { type: String },
      service: { type: String },
      dimensions: { type: String },
      quantity: { type: Number },
      placement: { type: String },
      garmentType: { type: String },
      garmentBrand: { type: String },
      garmentItemNumber: { type: String },
      garmentColor: { type: String },
      qtyBySize: {
        sizeXS: { type: Number },
        sizeS: { type: Number },
        sizeM: { type: Number },
        sizeL: { type: Number },
        sizeXL: { type: Number },
        size2XL: { type: Number },
        size3XL: { type: Number },
      },
      totalQuantity: { type: Number },
    },
  ],

  status: { type: String, default: 'Order Placed' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
