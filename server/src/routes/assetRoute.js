const assetController = require("../Controller/assetController");
const middlewareController = require("../middleware/middleware");

const router = require("express").Router();

router.get("/", middlewareController.verifyToken, assetController.getAllAssets);
router.get("/:id", middlewareController.verifyToken, assetController.getAssetById);
router.post("/", middlewareController.verifyToken, assetController.createAsset);
router.put("/:id", middlewareController.verifyToken, assetController.updateAsset);
router.delete("/:id", middlewareController.verifyToken, assetController.deleteAsset);
router.get("/user/:responsible_user", middlewareController.verifyToken, assetController.getAllAssetsByUser);
router.post("/:id/history", middlewareController.verifyToken, assetController.createHistory);

module.exports = router;