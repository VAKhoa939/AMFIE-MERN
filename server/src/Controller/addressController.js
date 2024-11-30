const Room = require("../models/roomModel"); 

const roomController = {
    createAddress: async (req, res) => {
        try {
            const room = new Room({
                name: req.body.name,
                building: req.body.building,
                responsible_user: req.body.responsible_user,
            });
            await room.save();
            res.status(201).json(room);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllAddresses: async (req, res) => {
        try {
            const rooms = await Room.find();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAddressById: async (req, res) => {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ error: 'Room not found' });
            }
            res.status(200).json(room);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateAddress: async (req, res) => {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ error: 'Room not found' });
            }
            await room.updateOne({ $set: req.body });
            res.status(200).json({ message: 'Room updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteAddress: async (req, res) => {
        try {
            const room = await Room.findByIdAndDelete(req.params.id);
            if (!room) {
                return res.status(404).json({ error: 'Room not found' });
            }
            res.status(200).json({ message: 'Room deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = roomController;
