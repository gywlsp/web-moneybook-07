const express = require('express');
const AccountHistoryController = require('../controllers/account-history.js');

const router = express.Router();

router.get('/', AccountHistoryController.getList);
router.post('/', AccountHistoryController.createHistory)
router.put('/:id', AccountHistoryController.updateHistory)
router.get('/categories', AccountHistoryController.getCategories)
router.get('/payments', AccountHistoryController.getPayments)

module.exports = router;
