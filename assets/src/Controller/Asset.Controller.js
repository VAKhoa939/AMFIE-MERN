const Asset = require('../models/Asset.model.js'); // Import mô hình Asset

/**
 * Tạo tài sản mới với ID tự động
 */
exports.createAsset = async (req, res) => {
    try {
        const { roomCode, name, year } = req.body;

        // 1. Kiểm tra các trường bắt buộc
        if (!roomCode || !name) {
            return res.status(400).json({ error: 'Room code and name are required.' });
        }

        // 2. Lấy năm từ `req.body`, mặc định là năm hiện tại nếu không có
        const assetYear = year || new Date().getFullYear();

        // 3. Đếm số lượng tài sản trong phòng có cùng năm
        const count = await Asset.countDocuments({ 
            roomCode, 
            assetId: new RegExp(`^${assetYear}_${roomCode}_`) // Lọc theo năm và mã phòng
        });

        // 4. Tạo số thứ tự tự động (thêm số 0 ở đầu để đạt 3 chữ số)
        const seq = (count + 1).toString().padStart(3, '0');

        // 5. Tạo assetId theo định dạng YEAR_ROOMCODE_SEQ
        const assetId = `${assetYear}_${roomCode}_${seq}`;

        // 6. Tạo tài sản mới với assetId đã được định dạng
        const asset = new Asset({
            assetId,
            roomCode,
            name
        });

        // 7. Lưu vào cơ sở dữ liệu
        await asset.save();

        // 8. Trả về tài sản vừa được tạo
        res.status(201).json({ message: 'Asset created successfully.', asset });
    } catch (error) {
        // 9. Bắt lỗi và trả về
        res.status(400).json({ error: error.message });
    }
};

/**
 * Lấy tất cả tài sản
 */
exports.getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json(assets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Lấy tài sản theo ID
 */
exports.getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.status(200).json(asset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Cập nhật tài sản
 */
exports.updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.status(200).json(asset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Xóa tài sản
 */
exports.deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
