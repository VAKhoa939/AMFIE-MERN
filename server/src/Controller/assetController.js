const Assets = require('../models/assetModel');

const assetController = {
    getAllAssets: async (req, res) => {
        try {
            const assets = await Assets.find();
            res.status(200).json(assets);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAssetById: async (req, res) => {
        try {
            const asset = await Assets.findById(req.params.id);
            res.status(200).json(asset);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createAsset: async (req, res) => {
        try {
            const asset = await Assets.create({
                asset_code: req.body.asset_code,
                asset_name: req.body.asset_name,
                specifications: req.body.specifications,
                year_of_use: req.body.year_of_use,
                quantity: req.body.quantity,
                unit_price: req.body.unit_price,
                origin_price: req.body.origin_price,
                real_count: req.body.real_count,
                depreciation_rate: req.body.depreciation_rate,
                remaining_value: req.body.remaining_value,
                location: req.body.location,
                responsible_user: req.body.responsible_user,
                suggested_disposal: req.body.suggested_disposal,
                note: req.body.note
            });
            res.status(200).json(asset);
        } catch (err) {
            res.status(500).json(err);
        }
    },    
    updateAsset: async (req, res) => {
        try {
            const asset = await Assets.findById(req.params.id);
            if (asset.asset_id=== req.body.asset_id) {
                await asset.updateOne({ $set: req.body });
                res.status(200).json("Asset has been updated");
            } else {
                res.status(403).json("You can update only your asset");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAsset: async (req, res) => {
        try {
            const asset = await Assets.findById(req.params.id);
            if (asset.assetName === req.body.assetName) {
                await asset.deleteOne();
                res.status(200).json("Asset has been deleted");
            } else {
                res.status(403).json("You can delete only your asset");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllAssetsByUser: async (req, res) => {
        try {
            const assets = await Assets.find({ responsible_user: req.params.responsible_user });
            res.status(200).json(assets);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createHistory: async (req, res) => {
        try {
            const asset = await new HistoryItemSchema({
                date: req.body.date,
                real_count: req.body.real_count,
                Difference: req.body.Difference,
            });
            res.status(200).json("History has been updated");
        } catch (err) {
            res.status(500).json(err);
        }
    },
   
}

module.exports = assetController;