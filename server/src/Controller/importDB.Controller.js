const Assets = require("../models/assetModel");
const express = require("express");
const csvParser = require("csv-parser");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const importRouter = {
    importCSV: async (req, res) => {
        try {
            const filePath = req.file.path;
            const assets = [];

            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on("data", (row) => {
                    const assetData = {
                        asset_id: row.asset_id,
                        asset_code: row.asset_code,
                        asset_name: row.asset_name,
                        specifications: row.specifications,
                        year_of_use: row.year_of_use,
                        quantity: row.quantity,
                        unit_price: row.unit_price,
                        origin_price: row.origin_price,
                        real_count: row.real_count,
                        depreciation_rate: row.depreciation_rate,
                        remaining_value: row.remaining_value,
                        location: row.location,
                        asset_value: row.asset_value,
                    };
                    if (assetData.asset_id && assetData.asset_code) {
                        assets.push(assetData);
                    }
                })
                .on("end", async () => {
                    if (assets.length > 0) {
                        await Assets.insertMany(assets);  
                        fs.unlinkSync(filePath);  
                        res.status(200).json({ message: "CSV file imported successfully" });
                    } else {
                        res.status(400).json({ message: "No valid assets to import" });
                    }
                });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = importRouter;
