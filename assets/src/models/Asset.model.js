const mongoose = require('mongoose');

// Schema cho từng phần tử trong `history`
const historyItemSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        description: "Ngày kiểm kê"
    },
    real_count: {
        type: Number,
        min: 0,
        required: true,
        description: "Số lượng kiểm kê thực tế"
    },
    difference: {
        type: Number,
        min: 0,
        required: true,
        description: "Chênh lệch với sổ sách"
    }
});

// Schema cho `assets`
const assetsSchema = new mongoose.Schema({
    asset_id: {
        type: String,
        required: true,
        unique: true,
        description: "Mã tài sản duy nhất"
    },
    asset_code: {
        type: String,
        required: true,
        description: "số hiệu tài sản"},
    name: {
        type: String,
        required: true,
        description: "Tên tài sản"
    },
    specifications: {
        type: String,
        description: "Mô tả quy cách, đặc điểm của tài sản"
    },
    year_of_use: {
        type: Number,
        required: true, // Đảm bảo năm sử dụng được cung cấp
        description: "Năm bắt đầu sử dụng tài sản"
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
        description: "Số lượng"
    },
    unit_price: {
        type: Number,
        min: 0,
        required: true,
        description: "Đơn giá của từng tài sản"
    },
    origin_price: {
        type: Number,
        min: 0,
        required: true,
        description: "Nguyên giá tổng cho tất cả tài sản cùng loại"
    },
    real_count: {
        type: Number,
        min: 0,
        description: "Số lượng thực tế"
    },
    depreciation_rate: {
        type: Number,
        min: 0,
        max: 100,
        description: "Tỷ lệ hao mòn (%)"
    },
    remaining_value: {
        type: Number,
        min: 0,
        description: "Nguyên giá còn lại sau khấu hao"
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        description: "Vị trí tài sản (phòng, tòa nhà)"
    },
    responsible_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        description: "Người phụ trách tài sản"
    },
    suggested_disposal: {
        type: String,
        description: "Thông tin về thanh lý"
    },
    note: {
        type: String,
        description: "Ghi chú thêm"
    },
    history: {
        type: [historyItemSchema],
        description: "Lịch sử kiểm kê và thay đổi"
    }
});

// Middleware tự động tạo `asset_id` nếu không được cung cấp
assetsSchema.pre('save', function (next) {
    if (!this.asset_id) {
        const year = this.year_of_use || new Date().getFullYear(); // Sử dụng năm hiện tại nếu không có `year_of_use`
        const randomDigits = Math.floor(Math.random() * 90 + 10); // Tạo 2 chữ số ngẫu nhiên
        this.asset_id = `${year}-${randomDigits}`;
    }
    next();
});

// Thêm chỉ mục cho các trường quan trọng để tối ưu hóa truy vấn
assetsSchema.index({ asset_id: 1 });
assetsSchema.index({ name: 1 });

// Tạo model từ schema
const Asset = mongoose.model('Asset', assetsSchema);

module.exports = Asset;
