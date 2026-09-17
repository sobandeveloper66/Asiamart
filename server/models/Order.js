import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String
  }
});

const TrackingStepSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  desc: {
    type: String
  }
});

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for anonymous checkout simulation
  },
  date: {
    type: String,
    required: true
  },
  items: {
    type: [OrderItemSchema],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'N/A'
  },
  paymentStatus: {
    type: String,
    required: true,
    default: 'Pending'
  },
  status: {
    type: String,
    required: true,
    enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'],
    default: 'Processing'
  },
  shippingAddress: {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }
  },
  trackingTimeline: {
    type: [TrackingStepSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', OrderSchema);
