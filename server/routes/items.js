const express = require('express');
const router = express.Router();
const authmiddleware = require('../helper/authmiddleware')
const { addItems, getItems, deleteItems } = require('../controller/items');

router.post('/add-items', authmiddleware, addItems);
router.get('/get-items', getItems);
router.delete('/delete-items', deleteItems);

module.exports = router;