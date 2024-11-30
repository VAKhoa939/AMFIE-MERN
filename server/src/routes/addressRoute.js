// routes/addressRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require("../Controller/addressController");
const middlewareController = require("../middleware/middleware");

router.post('/', middlewareController.verifyToken, roomController.createAddress);   
router.get('/', middlewareController.verifyToken, roomController.getAllAddresses);   
router.get('/:id', middlewareController.verifyToken, roomController.getAddressById); 
router.put('/:id', middlewareController.verifyToken, roomController.updateAddress); 
router.delete('/:id', middlewareController.verifyToken, roomController.deleteAddress); 

module.exports = router;
