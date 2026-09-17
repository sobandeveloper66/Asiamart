import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { MOCK_PRODUCTS } from '../../src/data/products.js';

const DATA_DIR = path.resolve('./data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure database directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], products: MOCK_PRODUCTS, orders: [] }, null, 2));
}

// Read database from local JSON file
const readLocalDB = () => {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return { users: [], products: MOCK_PRODUCTS, orders: [] };
  }
};

// Write database to local JSON file
const writeLocalDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to local JSON DB:', error.message);
  }
};

// Check if MongoDB is connected and active
const isMongoActive = () => {
  return mongoose.connection.readyState === 1;
};

// ==========================================
// 1. User DB Operations
// ==========================================

export const findUserByEmail = async (email) => {
  if (isMongoActive()) {
    return await User.findOne({ email: email.toLowerCase().trim() });
  }
  
  const db = readLocalDB();
  const user = db.users.find(u => u.email === email.toLowerCase().trim());
  if (user) {
    // Mock Mongoose save method so calling code doesn't break
    user.save = async function() {
      const currentDb = readLocalDB();
      currentDb.users = currentDb.users.map(u => u.email === this.email ? this : u);
      writeLocalDB(currentDb);
      return this;
    };
  }
  return user;
};

export const findUserById = async (id) => {
  if (isMongoActive()) {
    return await User.findById(id).select('-password');
  }
  
  const db = readLocalDB();
  const user = db.users.find(u => u._id === id || u.id === id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export const createUser = async (userData) => {
  if (isMongoActive()) {
    const user = new User(userData);
    return await user.save();
  }
  
  const db = readLocalDB();
  const newUser = {
    _id: `user-${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString()
  };
  db.users.push(newUser);
  writeLocalDB(db);
  return newUser;
};

// ==========================================
// 2. Product DB Operations
// ==========================================

export const getProducts = async (filters = {}) => {
  if (isMongoActive()) {
    let query = {};
    if (filters.country) query.country = filters.country;
    if (filters.category) query.category = filters.category;
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = parseFloat(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = parseFloat(filters.maxPrice);
    }
    return await Product.find(query).sort({ createdAt: -1 });
  }

  const db = readLocalDB();
  let result = [...db.products];

  if (filters.country) {
    result = result.filter(p => p.country === filters.country);
  }
  if (filters.category) {
    result = result.filter(p => p.category === filters.category);
  }
  if (filters.search) {
    const term = filters.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
  }
  if (filters.minPrice) {
    result = result.filter(p => p.price >= parseFloat(filters.minPrice));
  }
  if (filters.maxPrice) {
    result = result.filter(p => p.price <= parseFloat(filters.maxPrice));
  }

  return result;
};

export const findProductById = async (id) => {
  if (isMongoActive()) {
    return await Product.findOne({ id });
  }
  
  const db = readLocalDB();
  return db.products.find(p => p.id === id) || null;
};

export const saveProduct = async (productData) => {
  if (isMongoActive()) {
    const product = new Product(productData);
    return await product.save();
  }
  
  const db = readLocalDB();
  db.products = [productData, ...db.products];
  writeLocalDB(db);
  return productData;
};

export const updateProduct = async (id, updatedData) => {
  if (isMongoActive()) {
    return await Product.findOneAndUpdate({ id }, updatedData, { new: true });
  }
  
  const db = readLocalDB();
  let productIndex = db.products.findIndex(p => p.id === id);
  if (productIndex === -1) return null;

  const current = db.products[productIndex];
  const updated = { ...current, ...updatedData };
  db.products[productIndex] = updated;
  writeLocalDB(db);
  return updated;
};

export const deleteProductById = async (id) => {
  if (isMongoActive()) {
    return await Product.findOneAndDelete({ id });
  }
  
  const db = readLocalDB();
  const product = db.products.find(p => p.id === id);
  if (!product) return null;

  db.products = db.products.filter(p => p.id !== id);
  writeLocalDB(db);
  return product;
};

export const seedProducts = async () => {
  if (isMongoActive()) {
    const count = await Product.countDocuments();
    if (count > 0) return { skipped: true };
    await Product.insertMany(MOCK_PRODUCTS);
    return { success: true };
  }

  const db = readLocalDB();
  if (db.products.length > 0) return { skipped: true };
  db.products = MOCK_PRODUCTS;
  writeLocalDB(db);
  return { success: true };
};

// ==========================================
// 3. Order DB Operations
// ==========================================

export const createOrder = async (orderData) => {
  if (isMongoActive()) {
    const order = new Order(orderData);
    return await order.save();
  }
  
  const db = readLocalDB();
  const newOrder = {
    _id: `order-${Date.now()}`,
    ...orderData,
    createdAt: new Date().toISOString()
  };
  db.orders.unshift(newOrder);
  writeLocalDB(db);
  return newOrder;
};

export const getOrders = async (filters = {}) => {
  if (isMongoActive()) {
    let query = {};
    if (filters.userId) query.userId = filters.userId;
    return await Order.find(query).sort({ createdAt: -1 });
  }
  
  const db = readLocalDB();
  let result = [...db.orders];
  if (filters.userId) {
    result = result.filter(o => o.userId === filters.userId);
  }
  return result;
};

export const updateOrderStatusById = async (id, status, stepData) => {
  if (isMongoActive()) {
    const order = await Order.findOne({ id });
    if (!order) return null;
    
    const exists = order.trackingTimeline.some(step => step.status === status);
    if (!exists) {
      order.trackingTimeline.push(stepData);
    }
    order.status = status;
    return await order.save();
  }
  
  const db = readLocalDB();
  const orderIndex = db.orders.findIndex(o => o.id === id);
  if (orderIndex === -1) return null;
  
  const order = db.orders[orderIndex];
  const exists = order.trackingTimeline.some(step => step.status === status);
  if (!exists) {
    order.trackingTimeline.push(stepData);
  }
  order.status = status;
  db.orders[orderIndex] = order;
  writeLocalDB(db);
  return order;
};

export const updateProductStock = async (productId, quantityDeducted) => {
  if (isMongoActive()) {
    const dbProduct = await Product.findOne({ id: productId });
    if (dbProduct) {
      dbProduct.stock = Math.max(0, dbProduct.stock - quantityDeducted);
      await dbProduct.save();
    }
    return;
  }
  
  const db = readLocalDB();
  const productIndex = db.products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    db.products[productIndex].stock = Math.max(0, db.products[productIndex].stock - quantityDeducted);
    writeLocalDB(db);
  }
};

export const adjustUserCoins = async (userId, coinsCredited, coinsRedeemed) => {
  if (isMongoActive()) {
    const dbUser = await User.findById(userId);
    if (dbUser) {
      dbUser.coins = Math.max(0, dbUser.coins - coinsRedeemed + coinsCredited);
      await dbUser.save();
    }
    return;
  }
  
  const db = readLocalDB();
  const userIndex = db.users.findIndex(u => u._id === userId || u.id === userId);
  if (userIndex !== -1) {
    const user = db.users[userIndex];
    user.coins = Math.max(0, user.coins - coinsRedeemed + coinsCredited);
    db.users[userIndex] = user;
    writeLocalDB(db);
  }
};

export const updateUserAddress = async (userId, addressData) => {
  if (isMongoActive()) {
    const dbUser = await User.findById(userId);
    if (dbUser) {
      dbUser.address = addressData;
      await dbUser.save();
    }
    return;
  }
  
  const db = readLocalDB();
  const userIndex = db.users.findIndex(u => u._id === userId || u.id === userId);
  if (userIndex !== -1) {
    db.users[userIndex].address = addressData;
    writeLocalDB(db);
  }
};
