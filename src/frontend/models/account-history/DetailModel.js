/* eslint-disable class-methods-use-this */
import Observer from '../index.js';
import Router from '../../Router.js';
import GlobalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';

export default class AccountHistoryDetailModel extends Observer {
  constructor() {
    super();
    GlobalStore.subscribe('globalState', () => {
      if (Router.get('pathname') !== '/') return;
      this.setData.apply(this);
    });
    GlobalStore.subscribe('detailState', this.mutateHistory.bind(this));
    this.data = {
      history: {totalDetailCnt: 0, totalIncome: 0, totalExpenditure: 0, dates: []},
      categories: {income: [], expenditure: []},
      payments: [],
    };
    this.setData();
  }

  getData() {
    return this.data;
  }

  fetchHistory() {
    const {year, month} = GlobalStore.get('globalState');
    const {income, expenditure} = GlobalStore.get('detailState');
    return AccountHistoryAPI.getList({year, month: padZero(month), income, expenditure});
  }

  fetchCategories() {
    return AccountHistoryAPI.getCategories();
  }

  fetchPayments() {
    return AccountHistoryAPI.getPayments();
  }

  setData() {
    Promise.all([this.fetchHistory(), this.fetchCategories(), this.fetchPayments()]).then(values => {
      const [history, categories, payments] = values;
      this.data = {history, categories, payments};
      this.notify();
    });
  }

  async mutateHistory() {
    const history = await this.fetchHistory();
    this.data = {...this.data, history};
    this.notify();
  }

  mutatePayment() {
    Promise.all([this.fetchHistory(), this.fetchPayments()]).then(values => {
      const [history, payments] = values;
      this.data = {...this.data, history, payments};
      this.notify();
    });
  }
}
