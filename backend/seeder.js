import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //Clear all collections.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //Insert all users.
    const createdUsers = await User.insertMany(users);
    //Get first user's id, which is an admin user.
    const adminUser = createdUsers[0]._id;
    //Insert adminUser's id into products.
    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }));
    await Product.insertMany(sampleProducts);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //Clear all collections.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data destroyed'.yellow.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
