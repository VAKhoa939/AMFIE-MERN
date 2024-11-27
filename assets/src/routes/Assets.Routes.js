const express = require('express');
const router = express.Router();
const assetController = require('../Controller/Asset.Controller'); // Đường dẫn được điều chỉnh
const { checkAdmin, authenticate } = require('../middleware/auth.Middleware'); // Middleware cho bảo mật

/**
 * Định tuyến API cho tài sản
 */

// 1. Tạo tài sản mới (Chỉ admin có quyền)
router.post('/assets', authenticate, checkAdmin, assetController.createAsset);

// 2. Lấy tất cả tài sản (Người dùng đăng nhập đều có thể xem)
router.get('/assets', authenticate, assetController.getAllAssets);

// 3. Lấy tài sản theo ID (Người dùng đăng nhập đều có thể xem)
router.get('/assets/:id', authenticate, assetController.getAssetById);

// 4. Cập nhật tài sản (Chỉ admin có quyền)
router.put('/assets/:id', authenticate, checkAdmin, assetController.updateAsset);

// 5. Xóa tài sản (Chỉ admin có quyền)
router.delete('/assets/:id', authenticate, checkAdmin, assetController.deleteAsset);

module.exports = router;
