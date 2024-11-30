const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 20,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 50,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: '',
        //validate: [isVietnamesePhoneNumber, 'Số điện thoại không hợp lệ'],
        description: "Số điện thoại người dùng"
    },
    admin:{
        type: Boolean,
        default: false,
    },
    position: {
        type: String,
        description: "Chức vụ của người dùng"
    },
    userid: {
        type: String,
        ref: 'User',
        description: "ID người dùng"
    },
    isActive: {
        type: Boolean,
        default: true,
        description: "Trạng thái hoạt động của người dùng"
    }
}, 
    {timestamps: true}
);

function generateUserId() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `FIE${randomNum}`;
}

userSchema.pre('save', function(next) {
    if (!this.userid) {
        this.userid = generateUserId();
    }
    next();
});

module.exports = mongoose.model("User", userSchema);