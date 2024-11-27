const { isVietnamesePhoneNumber } = require('../utils/validate'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        picture: {
            type: String,
            default: 'https://picsum.photos/200/300',
            description: "Ảnh đại diện của người dùng"
        },
        name: {
            type: String,
            trim: true,
            required: [true, 'Vui lòng nhập tên'],
            maxlength: [50, 'Tên không quá 50 ký tự'],
            description: "Tên người dùng"
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'Vui lòng nhập email']
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Vui lòng nhập mật khẩu'],
            minlength: [6, 'Mật khẩu ít nhất 6 chữ cái'],
            description: "Mật khẩu người dùng",
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: '',
            //validate: [isVietnamesePhoneNumber, 'Số điện thoại không hợp lệ'],
            description: "Số điện thoại người dùng"
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',  // Mặc định là user
        },  
        position: {
            type: String,
            description: "Chức vụ của người dùng"
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            description: "ID người dùng"
        },
        isActive: {
            type: Boolean,
            default: true,
            description: "Trạng thái hoạt động của người dùng"
        }
    },
    { timestamps: true } 
);

userSchema.pre('save', function(next) {
    if (!this.userid) {
        this.userid = new mongoose.Types.ObjectId();
    }
    next();
});


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.pre('remove', async function (next) {
    let user = this;
    const userId = user._id;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
