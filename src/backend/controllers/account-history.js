const AccountHistoryService = require('../services/account-history.js');

const AccountHistoryController = {
  getList(req, res) {
    const {year, month, income, expenditure, categoryId} = req.query;

    if (year && month && income !== undefined && expenditure !== undefined) {
      // 메인 수입/지출 내역
      const data = {year, month, income, expenditure};
      AccountHistoryService.getList(data, history => {
        res.status(200).send(history);
      });
    }

    if (year && month && categoryId !== undefined) {
      // 통계 - 카테고리별 내역
      const data = {year, month, categoryId};
      AccountHistoryService.getList(data, history => {
        res.status(200).send(history);
      });
    }
  },

  createHistory(req, res) {
    const {dateString, categoryId, description, paymentId, price} = req.body;
    const data = {dateString, categoryId, description, paymentId, price};
    AccountHistoryService.createHistory(data, newHistory => {
      res.status(200).send(newHistory);
    });
  },

  updateHistory(req, res) {
    const {id} = req.params;
    const {dateString, categoryId, description, paymentId, price} = req.body;

    const data = {id, dateString, categoryId, description, paymentId, price};
    AccountHistoryService.updateHistory(data, updatedHistory => {
      res.status(200).send(updatedHistory);
    });
  },

  getCategories(req, res) {
    const {year, month} = req.query;

    AccountHistoryService.getCategories({year, month}, categories => {
      res.status(200).send(categories);
    });
  },

  getCategory(req, res) {
    const {id} = req.params;
    const {startYear, startMonth, endYear, endMonth} = req.query;
    const startDate = `${startYear}.${startMonth}.01`;
    const endDate = `${endYear}.${endMonth}.31`;

    AccountHistoryService.getCategory({id, startDate, endDate}, categories => {
      res.status(200).send(categories);
    });
  },

  getPayments(req, res) {
    AccountHistoryService.getPayments(payments => {
      res.status(200).send(payments);
    });
  },

  createPayment(req, res) {
    const {title} = req.body;
    AccountHistoryService.createPayment({title}, newPayment => {
      res.status(200).send(newPayment);
    });
  },

  deletePayment(req, res) {
    const {id} = req.params;
    AccountHistoryService.deletePayment({id}, () => {
      res.status(200).send({});
    });
  },
};

module.exports = AccountHistoryController;
