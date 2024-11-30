const User = require("../models/userModel");

const userController = {
    getAllUsers: async ( req, res ) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getUserById: async ( req, res ) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateUser: async ( req, res ) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            const { password,...others } = user._doc;
            res.status(200).json(others);
        }catch(err){
            res.status(500).json(err);
        }
    },
    isActive: async ( req, res ) => {
        try {
            const user = await User.findById(req.params.id);
            user.isActive =!user.isActive;
            res.status(200).json("Account has been updated");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteUser: async ( req, res ) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        }catch (err) {
            res.status(500).json(err);
    }},
    resetPassword: async ( req, res ) => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.body.email },
                { password: req.body.password },
                { new: true }
            );
            res.status(200).json("Password has been updated");
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = userController;