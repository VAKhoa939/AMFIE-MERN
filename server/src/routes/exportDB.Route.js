const express = require('express');
const { parse } = require('json2csv');  
const exportDB  = require('../Controller/exportDB.Controller'); 


const router = express.Router();


router.get('/export', exportDB.exportDB);

module.exports = router;
