import UserModel from '../models/user.model.js';

const create = async (req, res) => {
  const { username, email, fullname, address, gender } = req.body;

  const user = new UserModel({
    username,
    email,
    fullname,
    address,
    gender,
  });

  try {
    const createdUser = await user.save(); //insert user to db
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(`[ERROR] - `, error?.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error(`[ERROR] - `, error?.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getOne = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    res.json(user);
  } catch (error) {
    console.error(`[ERROR] - `, error?.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

const UserController = {
  create,
  getAll,
  getOne,
};

export default UserController;
