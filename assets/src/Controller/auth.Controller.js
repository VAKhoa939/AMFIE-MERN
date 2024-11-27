const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { name, email, password, phoneNumber, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password,
            role: role || 'user', 
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'Đăng ký thành công',
            token,
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại' });
        }
        console.log('User:', user.email);
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu sai' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

module.exports = { register, login };
