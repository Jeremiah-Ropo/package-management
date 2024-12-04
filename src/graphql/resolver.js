const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Package = require('../models/package');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/variables');
const CustomError = require('../utils/customError');


const register = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
}

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError('User not found', 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError('Incorrect password', 401);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    return { token, userId: user.id };
  }

const packages = async () => await Package.find();

const package = async ({ id }) => await Package.findById(id);

const createPackage = async ({ name, description, price, expirationDate }, req) => {
    if(!req.user) return new CustomError( 'Kindly login with your credentials', 401);
    if(req.user.role !== 'admin') throw new CustomError("Forbidden: You don't have permission to perform this action.", 403)
    const package = await Package.create({ name, description, price, expirationDate });
    return package;
}
    
const updatePackage = async ({ id, name, description, price }, req) => {
    if (!req.user) return new CustomError('Kindly login with your credentials', 401);

    const package = await Package.findById(id);
    if (!package) throw new CustomError('Package not found', 404);

    package.name = name || package.name;
    package.description = description || package.description;
    package.price = price || package.price;
    return await package.save();
}

const deletePackage = async ({ id }, req) => {
    if (!req.user) throw new CustomError('Kindly login with your credentials', 401);

    const package = await Package.findById(id);
    if (!package) throw new CustomError('Package not found', 404);
    await Package.findByIdAndDelete(id);
    return 'Package deleted';
}

  
module.exports = {
  register,
  login,
  packages,
  package,
  createPackage,
  updatePackage,
  deletePackage,
};
