const dbPool = require('../config/db.js');
const {getListQuery} = require('../query-statements/account-history.js');
const {getHistoryResult} = require('./utils/account-history.js');

const AccountHistoryService = {
  getList(data, resCallback) {
    const {year, month, income, expenditure} = data;
    const sql = getListQuery({year, month});
    dbPool.query(sql, (err, history) => {
      const result = getHistoryResult({income, expenditure}, history);
      resCallback(result);
    });
  },
};

module.exports = AccountHistoryService;
