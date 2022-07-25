const dbPool = require('../config/db.js');
const {
  getListQuery,
  createHistoryQuery,
  updateHistoryQuery,
  getCategoriesQuery,
  getPaymentsQuery,
  createPaymentQuery,
  deletePaymentQuery,
} = require('../query-statements/account-history.js');
const {getHistoryResult} = require('./utils/account-history.js');

const AccountHistoryService = {
  getList(data, resCallback) {
    const {year, month, income, expenditure, categoryId} = data;
    const sql = getListQuery({year, month, categoryId});
    dbPool.query(sql, (err, history) => {
      const result = getHistoryResult({income, expenditure}, history);
      resCallback(result);
    });
  },

  createHistory(data, resCallback) {
    const {dateString, categoryId, description, paymentId, price} = data;
    const sql = createHistoryQuery();
    dbPool.query(sql, [dateString, categoryId, description, paymentId, price], (err, history) => {
      const {insertId} = history;
      const selectQuery = `select * from ACCOUNT_HISTORY where id = ${insertId}`;
      dbPool.query(selectQuery, (err, newHistory) => {
        resCallback(newHistory);
      });
    });
  },

  updateHistory(data, resCallback) {
    const {id, dateString, categoryId, description, paymentId, price} = data;
    const sql = updateHistoryQuery();
    dbPool.query(sql, [dateString, categoryId, description, paymentId, price, id], (err, history) => {
      const selectQuery = `select * from ACCOUNT_HISTORY where id = ${id}`;
      dbPool.query(selectQuery, (err, updateHistory) => {
        resCallback(updateHistory);
      });
    });
  },

  getCategories(data, resCallback) {
    const {year, month} = data;
    const sql = getCategoriesQuery({year, month});
    dbPool.query(sql, (err, categories) => {
      const result = categories.reduce(
        (acc, curr) => {
          const {type, id, title, percentage, total} = curr;
          acc[type].push({
            id,
            title,
            percentage: Number(percentage),
            total: Number(total),
          });
          return acc;
        },
        {
          income: [],
          expenditure: [],
        },
      );
      resCallback(result);
    });
  },

  getPayments(resCallback) {
    const sql = getPaymentsQuery();
    dbPool.query(sql, (err, payments) => {
      resCallback(payments);
    });
  },

  createPayment(data, resCallback) {
    const {title} = data;
    const sql = createPaymentQuery();
    dbPool.query(sql, [title], (err, payment) => {
      const {insertId} = payment;
      const selectQuery = `select * from PAYMENT where id = ${insertId}`;
      dbPool.query(selectQuery, (err, newPayment) => {
        resCallback(newPayment);
      });
    });
  },

  deletePayment(data, resCallback) {
    const {id} = data;
    const updateQuery = 'update ACCOUNT_HISTORY SET paymentId=null WHERE paymentId=?';
    dbPool.query(updateQuery, [id], err => {
      const sql = deletePaymentQuery();
      dbPool.query(sql, [id], err => {
        resCallback();
      });
    });
  },
};

module.exports = AccountHistoryService;
