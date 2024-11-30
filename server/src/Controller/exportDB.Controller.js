const { parse } = require('json2csv');
const Assets = require('../models/assetModel');

const exportDB = {
    exportDB: async (req, res) => {
        try {
            const assets = await Assets.find();

            if (assets.length === 0) {
                return res.status(404).json({ message: 'No assets found to export' });
            }

            const fields = ['asset_id', 'asset_name', 'asset_code', 'specifications', 'year_of_use', 'quantity', 'unit_price', 'origin_price', 'real_count','depreciation_rate','remaining_value','location','responsible_user', 'suggested_disposal', 'note', 'history' ];

            let csv;
            try {
                csv = parse(assets, { fields });
            } catch (error) {
                console.error('Error parsing to CSV:', error);
                return res.status(500).json({ message: 'Error generating CSV', error: error.message });
            }

            res.setHeader('Content-Disposition', 'attachment; filename=assets-export.csv');
            res.header('Content-Type', 'text/csv');

            return res.send(csv);
        } catch (error) {
            console.error('Error exporting data:', error);
            res.status(500).json({ message: 'Failed to export assets', error: error.message });
        }
    }
};

module.exports = exportDB;
