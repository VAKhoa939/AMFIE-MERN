const importRouter = require("../Controller/importDB.Controller");
const multer = require("multer"); 
const upload = multer({ dest: 'uploads/' });

const router = require("express").Router();


router.post("/import", upload.single("file"), importRouter.importCSV);

module.exports = router;