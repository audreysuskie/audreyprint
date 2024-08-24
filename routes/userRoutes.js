const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const viewsController = require('../controllers/viewsController');
const User = require('../models/userModel');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/resetPassword', viewsController.resetPasswordForm);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/updateAccount',
  authController.protect,
  authController.isLoggedIn,
  userController.updateUser
);

router.patch(
  '/addToSaved',
  authController.protect,
  authController.isLoggedIn,
  userController.updateSaved
);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(authController.signupUser);

//Create User Method
// router.post('/post', async (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     address: req.body.address,
//     phone: req.body.phone,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//   });

//   try {
//     const saveUser = await user.save();
//     res.status(200).json(saveUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

//Get All Users Method
router.get('/getAll', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get User by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update User by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updatedUser, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete User by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.send(`User with email -${user.email}- has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
