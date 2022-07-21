const express = require('express');
const AccountHistoryController = require('../controllers/account-history.js');

const router = express.Router();

/* GET users listing. */
router.get('/', AccountHistoryController.getList);

module.exports = router;
