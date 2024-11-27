// routes/user.Routes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controller/User.Controller');

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
