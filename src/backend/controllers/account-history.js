const AccountHistoryService = require('../services/account-history.js');

const AccountHistoryController = {
  getList(req, res) {
    const {year, month, income, expenditure} = req.query;

    if (year && month && income !== undefined && expenditure !== undefined) {
      // 메인 수입/지출 내역
      const data = {year, month, income, expenditure};
      AccountHistoryService.getList(data, history => {
        res.status(200).send(history);
      });
    }

    // @TODO: 통계 - 카테고리별 내역
  },
};

module.exports = AccountHistoryController;
