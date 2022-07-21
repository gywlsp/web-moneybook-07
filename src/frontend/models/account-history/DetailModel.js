import Observer from '../index.js';
import globalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';

export default class AccountHistoryDetailModel extends Observer {
  constructor() {
    super();
    globalStore.subscribe('globalState', this.fetchHistory.bind(this));
    globalStore.subscribe('detailState', this.fetchHistory.bind(this));
    this.setData();
  }

  getData() {
    return this.data;
  }

  fetchHistory() {
    const {year, month} = globalStore.get('globalState');
    const {income, expenditure} = globalStore.get('detailState');
    AccountHistoryAPI.getList({year, month: padZero(month), income, expenditure}, history => {
    this.data = {...this.data, history};
    });
  }

  fetchCategories() {
    const categories = []; // fetch
    this.data = {...this.data, categories};
  }

  fetchPayments() {
    const payments = []; // fetch
    this.data = {...this.data, payments};
  }

  setData() {
    this.data = {};
    this.fetchHistory();
    this.fetchCategories();
    this.fetchPayments();
    this.notify();
  }

  mutateHistory() {
    this.fetchHistory();
    this.notify();
  }

  mutatePayments() {
    this.fetchHistory();
    this.fetchPayments();
    this.notify();
  }
}
