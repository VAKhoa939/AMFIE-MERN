// controllers/addressController.js
const Address = require('../models/Address.model'); // Import mô hình Address

// Tạo địa chỉ mới
exports.createAddress = async (req, res) => {
    try {
        const address = new Address(req.body);
        await address.save();
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy tất cả địa chỉ
exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy địa chỉ theo id
exports.getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cập nhật địa chỉ
exports.updateAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa địa chỉ
exports.deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
