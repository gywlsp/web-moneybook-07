const dbPool = require('../config/db.js');
const { getListQuery, createHistoryQuery, updateHistoryQuery } = require('../query-statements/account-history.js');
const { getHistoryResult } = require('./utils/account-history.js');

const AccountHistoryService = {
  getList(data, resCallback) {
    const { year, month, income, expenditure } = data;
    const sql = getListQuery({ year, month });
    dbPool.query(sql, (err, history) => {
      const result = getHistoryResult({ income, expenditure }, history);
      resCallback(result);
    });
  },

  createHistory(data, resCallback) {
    const { dateString, categoryId, description, paymentId, price } = data;
    const sql = createHistoryQuery()
    dbPool.query(sql, [dateString, categoryId, description, paymentId, price], (err, history) => {
      const { insertId } = history
      const selectQuery = `select * from ACCOUNT_HISTORY where id = ${insertId}`
      dbPool.query(selectQuery, (err, newHistory) => {
        resCallback(newHistory)
      })
    })
  },

  updateHistory(data, resCallback) {
    const { id, dateString, categoryId, description, paymentId, price } = data;
    const sql = updateHistoryQuery()
    dbPool.query(sql, [dateString, categoryId, description, paymentId, price, id], (err, history) => {
      const selectQuery = `select * from ACCOUNT_HISTORY where id = ${id}`
      dbPool.query(selectQuery, (err, updateHistory) => {
        resCallback(updateHistory)
      })
    })
  }
};

module.exports = AccountHistoryService;