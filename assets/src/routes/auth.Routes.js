const express = require('express');
const router = express.Router();
const authController = require('../Controller/auth.Controller');
const { checkAdmin, checkUser } = require('../middleware/auth.Middleware');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/admin/dashboard', checkAdmin, (req, res) => {
    res.json({ message: 'Chào admin!' });
});

router.get('/user/profile', checkUser, (req, res) => {
    res.json({ message: `Chào ${req.user.userId}, bạn đã đăng nhập thành công!` });
});

module.exports = router;
