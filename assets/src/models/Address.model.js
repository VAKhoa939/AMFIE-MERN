const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    room_id: {
        type: String,
        required: true,
        unique: true,
        description: "Mã phòng duy nhất"
    },
    name: {
        type: String,
        required: true,
        description: "Tên phòng"
    },
    building: {
        type: String,
        required: true,
        description: "Tên tòa nhà"
    },
    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        description: "Danh sách ID của tài sản trong phòng"
    }],
    responsible_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        description: "ID người phụ trách phòng"
    }
});

const Room = mongoose.model('Room', roomsSchema);

module.exports = Room;
