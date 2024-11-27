// routes/addressRoutes.js
const express = require('express');
const router = express.Router();
const addressController = require('../Controller/Address.Controller');

// Định tuyến API cho địa chỉ
router.post('/addresses', addressController.createAddress);   // Tạo địa chỉ mới
router.get('/addresses', addressController.getAllAddresses);   // Lấy tất cả địa chỉ
router.get('/addresses/:id', addressController.getAddressById); // Lấy địa chỉ theo id
router.put('/addresses/:id', addressController.updateAddress); // Cập nhật địa chỉ
router.delete('/addresses/:id', addressController.deleteAddress); // Xóa địa chỉ

module.exports = router;
