const mongoose = require('mongoose');
const { MONGO_URI } = require('./variables');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
  }
}

module.exports = connectDB;