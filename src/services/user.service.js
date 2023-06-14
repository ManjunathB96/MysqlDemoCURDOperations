import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user').default(sequelize, DataTypes);
const bcrypt = require('bcrypt');

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

//create new user
export const newUser = async (body) => {
  console.log(body);
  const exist = await User.findOne({ where: { email: body.email } });
  if (exist == null) {
    const hashpassword = bcrypt.hashSync(body.password, 10);
    body.password = hashpassword;
    const data = await User.create(body);
    return data;
  } else {
    throw new Error('User already exists');
  }
};

//update single user
export const updateUser = async (id, body) => {
  await User.update(body, {
    where: { id: id }
  });
  return body;
};

//delete single user
export const deleteUser = async (id) => {
  await User.destroy({ where: { id: id } });
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findByPk(id);
  return data;
};
